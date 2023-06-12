class Department{
    name: string;
    employees : string[] = [];

    constructor(n: string){
        this.name = n;
    }

    addEmployees(employee: string){
        this.employees.push(employee);;
    }
    privateEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting = new Department('Accounting');

accounting.addEmployees('Max');
accounting.addEmployees('Manu');

accounting.privateEmployeeInformation();
