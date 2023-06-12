"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private name: string;
        this.employees = [];
        this.name = name;
    }
    addEmployees(employee) {
        this.employees.push(employee);
    }
    privateEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
        this.admins = admins;
    }
}
const it = new ITDepartment('1', ['Max']);
it.addEmployees('Max');
it.addEmployees('Manu');
it.privateEmployeeInformation();
//# sourceMappingURL=app.js.map