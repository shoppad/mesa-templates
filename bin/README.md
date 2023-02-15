# Mesa Templates scripts

To run a migration script:
```
node bin/index.js migration all 01-update-trigger-names.js
node bin/index.js migration my_template_slug 01-update-trigger-names.js
```


## To fine-tune GTP-3:
Steps: https://beta.openai.com/docs/guides/fine-tuning
```
source venv/bin/activate
export OPENAI_API_KEY="<OPENAI_API_KEY>"
node bin/index.js migration all 02-fine-tune-gpt-3.js > ~/Downloads/gpt3.jsonl
code ~/Downloads/gpt3.jsonl # cleanup the output at the top of the file
openai tools fine_tunes.prepare_data -f  ~/Downloads/gpt3.jsonl
openai api fine_tunes.create -t "/Users/jeff/Downloads/gpt3_prepared.jsonl" -m davinci
openai api completions.create -m davinci:ft-shoppad-2023-01-26-21-35-54 -p "Create a mesa.json file to Tag Shopify Orders over $100"
    
```