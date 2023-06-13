const names = ['Max', "Mane"];

const names1: string[] = ['1', '2'];

const names2: Array<string> = ['1', '2'];

function merge<A extends object, B extends object>(objA: A, objB:B){
    return { ...objA, ...objB };
}

const merged = merge({name : 'mm', hobbies : ['mm']}, { age : 80 });

console.log(merged);

interface Lengthy {
    length : number;
}

function countAndDescribe<T extends Lengthy>(element : T): [T, string]{
    let descriptionText = "Got no value";
    if(element.length === 1){
        descriptionText = "Got 1 element";
    } else if(element.length > 1){
        descriptionText = "Got " + element.length  + ' elements';
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(['Hi', 'there']));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value ' + obj[key];
}

console.log(extractAndConvert({
    name : 'nob'
}, 'name'));


class DataStorage<T> {
    private data:T[] = [];

    addItem(item: T){
        this.data.push
    }
    removeItem(item: T){
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems(){
        return {... this.data}
    }
}
const textStorage = new DataStorage<String>();



interface CourseGoal{
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    date: Date
) : CourseGoal {
    let courseGoal:Partial<CourseGoal>= {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}
const namess:Readonly<string[]> = ['Max', 'Anna'];

// namess.push('Manu');