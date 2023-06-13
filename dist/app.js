"use strict";
const names = ['Max', "Manuel"];
const names1 = ['1', '2'];
const names2 = ['1', '2'];
function merge(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const merged = merge({ name: 'mm', hobbies: ['mm'] }, { age: 80 });
console.log(merged);
function countAndDescribe(element) {
    let descriptionText = "Got no value";
    if (element.length === 1) {
        descriptionText = "Got 1 element";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + ' elements';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(['Hi', 'there']));
function extractAndConvert(obj, key) {
    return 'Value ' + obj[key];
}
console.log(extractAndConvert({
    name: 'nob'
}, 'name'));
//# sourceMappingURL=app.js.map