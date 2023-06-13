type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name : 'nob',
    privileges: ['mmmm'],
    startDate : new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp : UnknownEmployee){
    console.log('Name ' + emp.name);

    if('privileges' in emp){
        console.log('Privileges ' + emp.privileges);   
    }

    if('startDate' in emp){
        console.log('startDate ' + emp.startDate);   
    }
}

// printEmployeeInformation({ name : 'Noble', startDate : new Date() });

interface Bird {
    flyingSpeed: number
}

interface Horse {
    runningSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    console.log('Moving with speed: ' + animal);
}


