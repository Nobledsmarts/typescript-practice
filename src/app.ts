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
    return function<T extends {new(...args: any[]) : { name : string }}>(originalConstructor: T){
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


class Product {
    @log
    title: string;
    private _price: number;

    constructor(){
        this.title = "";
        this._price = 100;
    }

    set price(price: number) {
        if(price > 0){
            this._price = price;
        }
    }
}