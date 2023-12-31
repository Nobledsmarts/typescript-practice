function Logger(logMsg: string){
    return function(construct: any){
        // let target = new construct();
        // console.log(target);
        // let m = new target()
        console.log(logMsg);
        // target
    }
}

function WithTemplate(logMsg: string, root: string){
    return function<T extends {new(...args: any[]): { name: string }}>(originalConstructor: T){
        // let target = new originalConstructor();
        // console.log(target);
        // let m = new target();
        // target.name
        return class extends originalConstructor{
            constructor(...args: any[]){
                super();
                let app = document.getElementById(root)!;
                app.innerHTML = logMsg;

                console.log('app started by ' + this.name);
            }
        }
    }
}

@Logger('Testing Logger')
@WithTemplate('<h1>Testing Logger</h1>', 'app')
class Person{
    name: string = 'noble';
    constructor(n: string){
        // this.name = n;
    }
}

let pers = new Person('noble');

console.log(pers);

function log(target: any, propertyName: string | symbol){
    console.log('property decorator');
    console.log(target, propertyName);
}

function log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('Method!');
    console.log(target);

    console.log(name);

    console.log(descriptor);

}

class Product {
    @log
    title: string;
    private _price: number;

    constructor(title: string, price: number){
        this.title = title;
        this._price = price;
    }

    set price(price: number) {
        if(price > 0){
            this._price = price;
        }
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function addThisMine(target:any, methodName: string | Symbol, descriptor: PropertyDescriptor){
    console.log(target);
    let constructor = new target.constructor();
    return { ...descriptor, value: descriptor.value.bind(constructor) }
}

function addThis(_:any, _2: string | Symbol, descriptor: PropertyDescriptor){
    console.log(descriptor);
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn

        }
    }
    return adjDescriptor;
}
class Printer {
    public message:string = 'Hello world'
    @addThis
    showMessage():void{
        console.log(this.message);
    }
}
const p = new Printer();
const button = document.querySelector('button')!;

(button as HTMLButtonElement).addEventListener('click', p.showMessage);


interface ValidatorConfig{
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};

// registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName] : ['required']
// }


function Required(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...(registeredValidators[target.constructor.name] ?
             registeredValidators[target.constructor.name] : {}),
        [propName] : [
        ...(registeredValidators[target.constructor.name] ?
            registeredValidators[target.constructor.name][propName] ?
            registeredValidators[target.constructor.name][propName] : []
            : []),
         'required'
        ]
    }
}

function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...(registeredValidators[target.constructor.name] 
            ? registeredValidators[target.constructor.name] : {}),
        [propName] : [
        ...(registeredValidators[target.constructor.name] ?
            registeredValidators[target.constructor.name][propName] ?
            registeredValidators[target.constructor.name][propName] : []
            : []),
         'positive'
        ]
    }
}
function _validate(obj: any){
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig){
        return true;
    }
    let isValid = true;
    for(const prop in objValidatorConfig){
        for(const validator in objValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    isValid = isValid && !!obj[prop]
                case 'positive':
                    isValid = isValid && obj[prop] > 0
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @Required
    @PositiveNumber
    price: number;

    constructor(t: string, p: number){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form');

courseForm?.addEventListener('submit', e => {
    e.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);

    console.log(registeredValidators);

    if(!_validate(createdCourse)){
        alert('invalid input');
        return;
    }
    console.log(createdCourse);
})