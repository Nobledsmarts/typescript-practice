function Logger(logStr: string){
    return function(constructor: Function){
        console.log(logStr);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string){
    return function(_ : Function){
        const hookEl = document.getElementById(hookId)!;
        if(hookId){
            (hookEl as HTMLDivElement).innerHTML = template
        }
    }
}

// @Logger('Loggin Person')
@WithTemplate('<h1> My Testing </h1>', 'app')
class Person {
    name = 'Max';

    constructor(){
        console.log('creating a persion object');
    }
}

const pers = new Person();

console.log(pers);