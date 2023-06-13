type Admin1 = {
    name: string;
    privileges: string[];
}

type Employee1 = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee1 = Admin1 & Employee1;

const e11: ElevatedEmployee1 = {
    name : 'nob',
    privileges: ['mmmm'],
    startDate : new Date()
}

type Combinable1 = string | number;
type Numeric1 = number | boolean;

type Universal1 = Combinable1 & Numeric1;