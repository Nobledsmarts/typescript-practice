"use strict";
//Project state Management
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProjects(title, description, numOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numOfPeople
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
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
//Project List class
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        // this.titleInputElement = (this.element.querySelector('#title') as HTMLInputElement);
        // this.descriptionInputElement = (this.element.querySelector('#description') as HTMLInputElement);
        // this.peopleInputElement = (this.element.querySelector('#people') as HTMLInputElement);
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
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
            projectState.addProjects(title, desc, people);
            // this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        const hasError = !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable);
        if (hasError) {
            console.log('');
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
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map