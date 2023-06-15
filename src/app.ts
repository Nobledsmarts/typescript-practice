enum ProjectStatus { 
    Active,
    finished
 }
class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus
    ) {

    }
}


//Project state Management

type Listener = (items: Project[]) => void;



class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
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

    addListener(listenerFn: Listener){
        this.listeners.push(listenerFn);
    }

    addProjects(title: string, description: string, numOfPeople: number){
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        )
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

//Component Base Class

abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string, 
        hostElementId: string, 
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(
            templateId,
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(
            hostElementId,
        )! as T

        const importedNode = document.importNode(this.templateElement.content, insertAtStart);

        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = `${newElementId}-projects`;
        }

        this.attach(insertAtStart);
        
    }
    private attach(insertAtBeginning: boolean){
        this.hostElement.insertAdjacentElement(insertAtBeginning? 'afterbegin' : 'beforebegin', this.element)
    }
    abstract configure(): void;
    abstract renderContent(): void;
}


//Project List class

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: any[];

    constructor(private type : 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
        
        this.configure();
        this.renderContent();
        
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl?.appendChild(listItem);
        }
    }
    configure(): void {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if(this.type === 'active'){
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.finished
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
   
}


class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = (this.element.querySelector('#title') as HTMLInputElement);
        this.descriptionInputElement = (this.element.querySelector('#description') as HTMLInputElement);
        this.peopleInputElement = (this.element.querySelector('#people') as HTMLInputElement);

        // this.attach();
        this.configure();
    }

    configure(){  
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {
        
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
