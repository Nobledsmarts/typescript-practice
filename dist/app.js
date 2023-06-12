"use strict";
class Person {
    constructor(n) {
        this.name = n;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user1;
user1 = new Person('noble');
user1.greet('hello');
//# sourceMappingURL=app.js.map