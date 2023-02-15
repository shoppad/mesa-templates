export default (res, json) => {
    delete json.description;
    delete json.source;
    delete json.destination;
    delete json.tags;
    delete json.video;
    delete json.version;
    delete json.debug;
    delete json.logging;
    delete json.enabled;
    delete json.storage;

    console.log(JSON.stringify({
        prompt: ` ${json.name}` + "\n\n###\n\n",
        completion: ` ${JSON.stringify(json)} ###`,
    }));
}
