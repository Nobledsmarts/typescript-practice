interface ValidatorOptions {
    [className: string] : {
        [validatableProp: string] : string[];
    }
}
const validations: ValidatorOptions = {};

function validate(targetClass: any): [boolean, {}]{
    let isValid:boolean = true;
    let errors:object = {};
    for(let props in validations[targetClass.constructor.name]){
        for (let rules of validations[targetClass.constructor.name][props]){
            let rule = rules.split(':');
            switch(rule[0]){
                case 'required' :
                    isValid = !!(targetClass[props]);
                    errors = isValid ? 
                        errors :
                        setErrors(errors, props, props + ' is Required!');
                break;
                case 'minLength' : 
                    let params = JSON.parse(rule[1]);
                    isValid = (targetClass[props].length >= params[0]);
                    errors = isValid ? 
                        errors : 
                        setErrors(errors, props, props + ' Minimum Length must be ' + params[0] + ' characters');
                break;
                
            }
        }
    }
    // console.log([isValid, errors]);
    return [isValid, errors];
}

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