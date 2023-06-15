"use strict";
//Validation
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}
const validations = {};
function setErrors(errors, props, msg) {
    return Object.assign(Object.assign({}, errors), { [props]: [
            ...(errors[props] ? errors[props] : []),
            msg
        ] });
}
function autobind(_, _2, descriptor) {
    return {
        enumerable: true,
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        },
    };
}
function minLength(n) {
    return function (target, propName) {
        validations[target.constructor.name] = Object.assign(Object.assign({}, (validations[target.constructor.name] ?
            validations[target.constructor.name] : {})), { [propName]: [...(validations[target.constructor.name] ?
                    (validations[target.constructor.name][propName] ?
                        validations[target.constructor.name][propName] :
                        []) :
                    []), `minLength:[${n}]`] });
        // console.log(propName);
    };
}
function required(target, propName) {
    validations[target.constructor.name] = Object.assign(Object.assign({}, (validations[target.constructor.name] ?
        validations[target.constructor.name] : {})), { [propName]: [...(validations[target.constructor.name] ?
                (validations[target.constructor.name][propName] ?
                    validations[target.constructor.name][propName] :
                    []) :
                []), 'required'] });
    // console.log(propName);
}
class ProjectInput {
    constructor() {
        this.enteredTitle = "";
        this.enteredDescription = "";
        this.enteredPeople = "";
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.attach();
        this.configure();
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            // this.clearInputs();
        }
        // console.log(this.titleInputElement.value);
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        this.enteredPeople = +enteredPeople;
        this.enteredDescription = enteredDescription;
        this.enteredTitle = enteredTitle;
        let [isValid, errors] = validate(this);
        console.log(errors);
        if (!isValid) {
            console.log(errors);
            alert('invalid input, please try again');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        // return ['', '', 1]
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}
__decorate([
    required
], ProjectInput.prototype, "enteredTitle", void 0);
__decorate([
    required,
    minLength(20)
], ProjectInput.prototype, "enteredDescription", void 0);
__decorate([
    required
], ProjectInput.prototype, "enteredPeople", void 0);
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const project = new ProjectInput();
//# sourceMappingURL=app.js.map