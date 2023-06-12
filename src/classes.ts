abstract class Department{
    // private name: string;
    private employees : string[] = [];

    constructor(private readonly id: string, public name: string){
        this.name = name;
    }

    addEmployees(employee: string){
        this.employees.push(employee);
    }
    privateEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
    abstract describe(this: Department) : void
}

class ITDepartment extends Department{
    constructor(id : string, public admins : string[]){
        super(id, "IT");
        this.admins = admins;
    }
    describe(this: Department): void {
        
    }
}

const it = new ITDepartment('1', ['Max']);

it.addEmployees('Max');
it.addEmployees('Manu');

it.privateEmployeeInformation();
