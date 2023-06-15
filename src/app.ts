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

class ProjectInput{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    @required
    enteredTitle: string = "";
    @required
    @minLength(20)
    enteredDescription: string = ""
    @required
    enteredPeople: any = "";

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

            console.log(title, desc, people);

            // this.clearInputs();
        }

        // console.log(this.titleInputElement.value);
    }
    
    private configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInput() : [string, string, number] | undefined{
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