function setValueByPath(object, path, value) {
    const pathArray = path.split(".");
    const attributeToSet = pathArray.pop();

    console.log("attributeToSet", attributeToSet);
    console.log("pathArray", pathArray);

    let objectToModify = object;

    for (let attr of pathArray) {

        if (typeof objectToModify[attr] !== "object") {
            objectToModify[attr] = {};
        }

        // if (attr === "__proto__" || attr === "constructor" || attr === "prototype") continue;

        if (!["__proto__", "constructor", "prototype"].includes(attr)) {
            objectToModify = objectToModify[attr];
        }

    }

    objectToModify[attributeToSet] = value;
    return object;
}


setValueByPath({}, "__proto__.polluted", true);

console.log("polluted:", {}.polluted);