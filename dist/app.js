"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logMsg) {
    return function (construct) {
        // let target = new construct();
        // console.log(target);
        // let m = new target()
        console.log(logMsg);
        // target
    };
}
function WithTemplate(logMsg, root) {
    return function (originalConstructor) {
        // let target = new originalConstructor();
        // console.log(target);
        // let m = new target();
        // target.name
        return class extends originalConstructor {
            constructor(...args) {
                super();
                let app = document.getElementById(root);
                app.innerHTML = logMsg;
                console.log('app started by ' + this.name);
            }
        };
    };
}
let Person = class Person {
    constructor(n) {
        this.name = 'noble';
        // this.name = n;
    }
};
Person = __decorate([
    Logger('Testing Logger'),
    WithTemplate('<h1>Testing Logger</h1>', 'app')
], Person);
let pers = new Person('noble');
console.log(pers);
function log(target, propertyName) {
    console.log('property decorator');
    console.log(target, propertyName);
}
class Product {
    constructor() {
        this.title = "";
        this._price = 100;
    }
    set price(price) {
        if (price > 0) {
            this._price = price;
        }
    }
}
__decorate([
    log
], Product.prototype, "title", void 0);
//# sourceMappingURL=app.js.map