"use strict";
const e1 = {
    name: 'nob',
    privileges: ['mmmm'],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log('Name ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('startDate ' + emp.startDate);
    }
}
function moveAnimal(animal) {
    console.log('Moving with speed: ' + animal);
}
//# sourceMappingURL=app%20copy.js.map