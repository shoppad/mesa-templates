export default (res, json) => {
    console.log(JSON.stringify({
        prompt: ` ${json.name}` + "\n\n###\n\n",
        completion: ` ${JSON.stringify(json)} ###`,
    }));
}
