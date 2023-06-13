function Logger(logMsg: string, root: string){
    return function(construct: any){
        let target = new construct();
        console.log(target);
        // let m = new target();
        let app = document.getElementById(root)!;
        app.innerHTML = logMsg;

        console.log('app started by ' + target.name);
        // target.name
    }
}

@Logger('Testing Logger', 'app')
class Person{
    name: string = 'noble';
    constructor(n: string){
        // this.name = n;
    }
}

let pers = new Person('noble');

console.log(pers);



