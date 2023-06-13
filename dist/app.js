"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logMsg, root) {
    return function (construct) {
        let target = new construct();
        console.log(target);
        // let m = new target();
        let app = document.getElementById(root);
        app.innerHTML = logMsg;
        console.log('app started by ' + target.name);
        // target.name
    };
}
let Person = class Person {
    constructor(n) {
        this.name = 'noble';
        // this.name = n;
    }
};
Person = __decorate([
    Logger('Testing Logger', 'app')
], Person);
let pers = new Person('noble');
console.log(pers);
//# sourceMappingURL=app.js.map