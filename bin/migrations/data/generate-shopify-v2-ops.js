#!/usr/bin/env node
/**
 * Generates shopify-v2-ops.json, the self-contained operation map used by
 * bin/migrations/06-shopify-v2.js to port templates from the Shopify v1
 * (REST) connector to v2 (GraphQL).
 *
 * Sources (read from the Mesa repo, override root with MESA_REPO env var):
 *   - js/triggers/shopify/v2/src/rest-graphql-mapping.json  v1 -> v2 op map
 *   - js/triggers/shopify/v2/output/config.json             v2 action registry
 *   - js/triggers/shopify/v2/input/config.json              v2 trigger registry
 *   - js/triggers/shopify/v2/openapi.json                   request/response schemas
 *
 * Curated knowledge (manual op mappings, field rules, response renames) lives
 * in the override tables below and grows as more templates are migrated.
 *
 * Usage: node bin/migrations/data/generate-shopify-v2-ops.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const MESA_REPO = process.env.MESA_REPO || '/Users/darryl/Projects/ShopPad/pub-site/apps/mesa';
const V2_DIR = path.join(MESA_REPO, 'js/triggers/shopify/v2');
const OUT_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'shopify-v2-ops.json');

// ---------------------------------------------------------------------------
// Curated overrides
// ---------------------------------------------------------------------------

/**
 * v1 ops with no automatic mapping in rest-graphql-mapping.json that we map
 * by hand. Key: "<v1_entity>/<v1_action>", value: v2 operation_id.
 */
const MANUAL_OPS = {
    'shop/list': 'shop',
    'metafield/list': 'metafieldList',
};

/**
 * Per-op field rules describing how v1 step metadata becomes the v2
 * metadata.body. Source spec syntax:
 *   "@<key>"        copy from v1 metadata.<key>
 *   "@body.<key>"   copy from v1 metadata.body.<key>
 *   "@query:<metadataKey>:<param>"  parse value of <param> from a querystring
 *                                   stored at v1 metadata.<metadataKey>
 *   "=<literal>"    constant value
 * Any v1 metadata.body key not consumed by a rule is copied through verbatim
 * (validated against the v2 request schema). The default rule for ops not
 * listed here maps metadata.<v1_entity>_id -> body.id when the v2 request
 * schema has an `id` field.
 */
const FIELD_RULES = {
    'order/tag_add': { id: '@order_id', tags: '@body.tag' },
    'order/tag_remove': { id: '@order_id', tags: '@body.tag' },
    'customer/tag_add': { id: '@customer_id', tags: '@body.tag' },
    'customer/tag_remove': { id: '@customer_id', tags: '@body.tag' },
    'product/tag_add': { id: '@product_id', tags: '@body.tag' },
    'product/tag_remove': { id: '@product_id', tags: '@body.tag' },
    'product_variant/list': { product_id: '@product_id' },
    'metafield/list': {
        ownerId: '@query:parameters:metafield[owner_id]',
        ownerType: '@query:parameters:metafield[owner_resource]|titlecase',
    },
    'shop/list': {},
};

/**
 * Per-op response field renames applied when rewriting downstream tokens
 * ({{<step_key>.<field>}}) that reference a swapped step's output. Fields not
 * listed are validated against the v2 response schema as-is, then with an
 * automatic snake_case -> camelCase attempt.
 */
const RESPONSE_RENAMES = {
    'order/retrieve': {
        gateway: 'paymentGatewayNames',
        financial_status: 'displayFinancialStatus',
        fulfillment_status: 'displayFulfillmentStatus',
        order_number: 'name',
        total_price: 'totalPriceSet',
    },
    'shop/list': {
        address1: 'shopAddress.address1',
        address2: 'shopAddress.address2',
        city: 'shopAddress.city',
        zip: 'shopAddress.zip',
        province: 'shopAddress.province',
        province_code: 'shopAddress.provinceCode',
        country: 'shopAddress.country',
        country_code: 'shopAddress.countryCodeV2',
        currency: 'currencyCode',
        country_name: 'shopAddress.country',
        phone: 'shopAddress.phone',
        domain: 'primaryDomain.host',
        shop_owner: 'shopOwnerName',
    },
};

/**
 * v1 list ops whose v2 response nests the array under a property instead of
 * returning a top-level array. Bare references ({{key}}, {% for x in key %},
 * {{key[].field}}) get the property inserted.
 */
const RESPONSE_NEST = {
    'metafield/list': 'metafields',
};

// ---------------------------------------------------------------------------
// Artifact loading
// ---------------------------------------------------------------------------

/**
 * Read and parse a JSON file.
 * @param {string} file Absolute path.
 * @returns {object} Parsed JSON.
 */
function readJson(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/**
 * Find the v2 entities array inside a connector config document.
 * @param {object} node Config JSON (or subtree during recursion).
 * @returns {Array|null} The entities array ([{key, actions: [...]}, ...]).
 */
function findEntities(node) {
    if (Array.isArray(node) && node[0] && node[0].actions) {
        return node;
    }
    if (node && typeof node === 'object') {
        for (const v of Object.values(node)) {
            const found = findEntities(v);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

/**
 * Resolve a local $ref pointer within the OpenAPI document.
 * @param {object} spec Full OpenAPI document.
 * @param {object} schema Schema node that may be a $ref.
 * @param {number} depth Recursion guard.
 * @returns {object} Dereferenced schema node.
 */
function deref(spec, schema, depth = 0) {
    if (!schema || depth > 10) {
        return schema || {};
    }
    if (schema.$ref && schema.$ref.startsWith('#/')) {
        let node = spec;
        for (const part of schema.$ref.slice(2).split('/')) {
            node = node && node[part.replace(/~1/g, '/').replace(/~0/g, '~')];
        }
        return deref(spec, node, depth + 1);
    }
    return schema;
}

/**
 * Flatten a response schema into a set of dot paths ("shopAddress.city",
 * "[].compareAtPrice", "metafields[].key") for token validation.
 * @param {object} spec Full OpenAPI document (for $ref resolution).
 * @param {object} schema Schema node.
 * @param {string} prefix Current path prefix.
 * @param {Set<string>} out Accumulator.
 * @param {number} depth Recursion guard.
 * @returns {Set<string>} The accumulated path set.
 */
function flattenPaths(spec, schema, prefix, out, depth = 0) {
    schema = deref(spec, schema);
    if (!schema || depth > 7) {
        return out;
    }
    if (schema.type === 'array' || schema.items) {
        return flattenPaths(spec, schema.items, prefix ? `${prefix}[]` : '[]', out, depth + 1);
    }
    const props = schema.properties || {};
    if (prefix) {
        out.add(prefix);
    }
    if (!schema.properties && (schema.additionalProperties || schema.type === 'object')) {
        // Loose object: record so the validator can downgrade to a warning.
        out.add(prefix ? `${prefix}.*` : '*');
    }
    for (const [name, sub] of Object.entries(props)) {
        flattenPaths(spec, sub, prefix ? `${prefix}.${name}` : name, out, depth + 1);
    }
    return out;
}

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

/**
 * Build the ops map and write shopify-v2-ops.json.
 */
function main() {
    const mapping = readJson(path.join(V2_DIR, 'src/rest-graphql-mapping.json'));
    const outputCfg = readJson(path.join(V2_DIR, 'output/config.json'));
    const inputCfg = readJson(path.join(V2_DIR, 'input/config.json'));
    const openapi = readJson(path.join(V2_DIR, 'openapi.json'));

    // v2 action registry: operation_id -> {entity, action, api_endpoint, name}
    const registry = {};
    for (const entity of findEntities(outputCfg) || []) {
        for (const action of entity.actions || []) {
            if (action.operation_id && !registry[action.operation_id]) {
                registry[action.operation_id] = {
                    entity: entity.key,
                    action: action.key,
                    api_endpoint: (action.metadata && action.metadata.api_endpoint) || '',
                    name: action.name,
                };
            }
        }
    }

    // OpenAPI: operationId -> request fields + response paths
    const schemas = {};
    for (const [, methods] of Object.entries(openapi.paths || {})) {
        for (const [, op] of Object.entries(methods)) {
            if (!op || !op.operationId) {
                continue;
            }
            const reqSchema = deref(openapi, op.requestBody && op.requestBody.content
                && op.requestBody.content['application/json']
                && op.requestBody.content['application/json'].schema);
            const resSchema = (op.responses && op.responses['200'] && op.responses['200'].content
                && op.responses['200'].content['application/json']
                && op.responses['200'].content['application/json'].schema) || null;
            schemas[op.operationId] = {
                request: {
                    fields: Object.keys((reqSchema && reqSchema.properties) || {}),
                    required: (reqSchema && reqSchema.required) || [],
                },
                response_paths: [...flattenPaths(openapi, resSchema, '', new Set())].sort(),
            };
        }
    }

    // v1 -> v2 output op entries
    const outputs = {};
    const addOutput = (v1Key, v2OpId, status) => {
        const reg = registry[v2OpId];
        const schema = schemas[v2OpId];
        if (!reg || !schema) {
            console.warn(`SKIP ${v1Key} -> ${v2OpId}: missing ${reg ? 'openapi schema' : 'registry entry'}`);
            return;
        }
        outputs[v1Key] = {
            status,
            v2: { operation_id: v2OpId, ...reg },
            request: schema.request,
            field_rules: FIELD_RULES[v1Key] || null,
            response_renames: RESPONSE_RENAMES[v1Key] || {},
            response_nest: RESPONSE_NEST[v1Key] || null,
            response_paths: schema.response_paths,
        };
    };
    for (const entry of mapping.outputs || []) {
        if (entry.status === 'mapped' && entry.v2_operation_id) {
            addOutput(`${entry.entity}/${entry.action}`, entry.v2_operation_id, 'mapped');
        }
    }
    for (const [v1Key, v2OpId] of Object.entries(MANUAL_OPS)) {
        addOutput(v1Key, v2OpId, 'manual');
    }

    // Trigger registry: "<entity>/<action>" -> operation_id
    const inputs = {};
    for (const entity of findEntities(inputCfg) || []) {
        for (const action of entity.actions || []) {
            if (action.operation_id) {
                inputs[`${entity.key}/${action.key}`] = { operation_id: action.operation_id };
            }
        }
    }

    // Self-check: every curated response rename target must exist in the
    // op's v2 response schema.
    let renameErrors = 0;
    for (const [v1Key, renames] of Object.entries(RESPONSE_RENAMES)) {
        const entry = outputs[v1Key];
        if (!entry) {
            console.warn(`RENAMES for unmapped op ${v1Key}`);
            continue;
        }
        for (const [from, to] of Object.entries(renames)) {
            if (!entry.response_paths.includes(to)) {
                console.error(`BAD RENAME ${v1Key}: ${from} -> ${to} (target not in v2 response)`);
                renameErrors++;
            }
        }
    }
    if (renameErrors) {
        process.exit(1);
    }

    const result = {
        generated_at: new Date().toISOString(),
        mesa_repo_branch: 'mesa/shopify-v2',
        outputs,
        inputs,
    };
    fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 4) + '\n');
    console.log(`Wrote ${OUT_FILE}`);
    console.log(`  outputs: ${Object.keys(outputs).length} (${Object.values(outputs).filter((o) => o.status === 'manual').length} manual)`);
    console.log(`  inputs:  ${Object.keys(inputs).length}`);
}

main();
