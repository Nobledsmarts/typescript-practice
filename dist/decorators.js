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
function log3(target, name, descriptor) {
    console.log('Method!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
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
const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);
function addThisMine(target, methodName, descriptor) {
    console.log(target);
    let constructor = new target.constructor();
    return Object.assign(Object.assign({}, descriptor), { value: descriptor.value.bind(constructor) });
}
function addThis(_, _2, descriptor) {
    console.log(descriptor);
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'Hello world';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    addThis
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['postive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator in objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener('submit', e => {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('invalid input');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=decorators.js.map