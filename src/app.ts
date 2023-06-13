const names = ['Max', "Manuel"];

const names1: string[] = ['1', '2'];

const names2: Array<string> = ['1', '2'];

function merge<A extends object, B extends object>(objA: A, objB:B){
    return { ...objA, ...objB };
}

const merged = merge({name : 'mm', hobbies : ['mm']}, { age : 80 });

console.log(merged);