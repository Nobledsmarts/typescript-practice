"use strict";
const names = ['Max', "Mane"];
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
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push;
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return Object.assign({}, this.data);
    }
}
const textStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const namess = ['Max', 'Anna'];
// namess.push('Manu');
//# sourceMappingURL=generics.js.map