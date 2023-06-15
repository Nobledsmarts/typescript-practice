//Project state Management

class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor(){

    }

    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Function){
        this.listeners.push(listenerFn);
    }

    addProjects(title: string, description: string, numOfPeople: number){
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numOfPeople
        }
        this.projects.push(newProject);
        
        for(const listenerFn of this.listeners){
            // console.log('added - fn');
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

//Validation

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if(validatableInput.required){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if(
        validatableInput.minLength != null && 
        typeof validatableInput.value === 'string'
    ) {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if(
        validatableInput.maxLength != null && 
        typeof validatableInput.value === 'string'
    ) {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if(
        validatableInput.min != null && 
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }
    if(
        validatableInput.max != null && 
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}


interface ValidatorOptions {
    [className: string] : {
        [validatableProp: string] : string[];
    }
}
const validations: ValidatorOptions = {};


function setErrors (errors:any, props:string, msg:string){
    return {
        ...errors,
        [props] : [
            ...(errors[props] ? errors[props] : []), 
            msg
        ]
    }
}

function autobind(_: any, _2: string | symbol, descriptor : PropertyDescriptor): PropertyDescriptor{
    return {
        enumerable : true,
        configurable : true,
        get() {
            return descriptor.value.bind(this);
        },
    }
}

function minLength(n:number){
    return function (target: any, propName: string){
        validations[target.constructor.name] = {
            ...(
                validations[target.constructor.name] ? 
                    validations[target.constructor.name] : {}
                ),
            [propName] : [...(
                validations[target.constructor.name] ?
                (
                    validations[target.constructor.name][propName] ?
                    validations[target.constructor.name][propName] : 
                    []
                ) :
                []
            ), `minLength:[${n}]`]
        }
        // console.log(propName);
    }
}

function required(target: any, propName: string){
    validations[target.constructor.name] = {
        ...(
            validations[target.constructor.name] ? 
                validations[target.constructor.name] : {}
            ),
        [propName] : [...(
            validations[target.constructor.name] ?
            (
                validations[target.constructor.name][propName] ?
                validations[target.constructor.name][propName] : 
                []
            ) :
            []
        ), 'required']
    }
    // console.log(propName);
}

//Project List class

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[];

    constructor(private type : 'active' | 'finished') {
        this.templateElement = (document.getElementById('project-list') as HTMLTemplateElement)!;
        this.hostElement = (document.getElementById('app') as HTMLDivElement)!;
        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;

        this.element.id = `${this.type}-projects`;

        // this.titleInputElement = (this.element.querySelector('#title') as HTMLInputElement);
        // this.descriptionInputElement = (this.element.querySelector('#description') as HTMLInputElement);
        // this.peopleInputElement = (this.element.querySelector('#people') as HTMLInputElement);

        projectState.addListener((projects:any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
        
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for(const prjItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl?.appendChild(listItem);
        }
    }

    private renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}


class ProjectInput{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = (document.getElementById('project-input') as HTMLTemplateElement)!;
        this.hostElement = (document.getElementById('app') as HTMLDivElement)!;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;

        this.element.id = 'user-input';

        this.titleInputElement = (this.element.querySelector('#title') as HTMLInputElement);
        this.descriptionInputElement = (this.element.querySelector('#description') as HTMLInputElement);
        this.peopleInputElement = (this.element.querySelector('#people') as HTMLInputElement);
        
        this.attach();
        this.configure();
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    @autobind
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            projectState.addProjects(title, desc, people);
            // this.clearInputs();
        }
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInput() : [string, string, number] | undefined{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        const hasError = !validate(titleValidatable) || 
                        !validate(descriptionValidatable) ||
                        !validate(peopleValidatable)


        if (hasError) {
            console.log('');
            alert('invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        // return ['', '', 1]
    }
    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';

    }
}

const project = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
