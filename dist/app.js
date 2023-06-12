"use strict";
class Department {
    constructor(n) {
        this.employees = [];
        this.name = n;
    }
    addEmployees(employee) {
        this.employees.push(employee);
        ;
    }
    privateEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department('Accounting');
accounting.addEmployees('Max');
accounting.addEmployees('Manu');
accounting.privateEmployeeInformation();
//# sourceMappingURL=app.js.map