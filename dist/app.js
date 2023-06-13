"use strict";
const names = ['Max', "Manuel"];
const names1 = ['1', '2'];
const names2 = ['1', '2'];
function merge(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const merged = merge({ name: 'mm', hobbies: ['mm'] }, { age: 80 });
console.log(merged);
//# sourceMappingURL=app.js.map