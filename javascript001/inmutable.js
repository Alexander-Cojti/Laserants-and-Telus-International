const juan = {
    Nombre:"Juan",
    Apellido:"Perez",
    Edad: 23,
    direccion:{
        departamento:"Guatemala",
        municipio:"Mixco"
    }
}
// const juan2 = Object.assign({}, juan,{Apellido:"Gomez"});

const juan2 ={... juan, Apellido:"Gomez", Telefono:"123456789", direccion:{...juan.direccion, municipio:"guatemala"}};
// juan.Apellido="Gomez";
// juan2.direccion.departamento="Ciudad";

console.log("juan",juan);
console.log("juan2",juan2);


const numeros=[1,2,3];

// const numeros2= numeros;
// numeros2.push(4);

const numeros2= [0,...numeros,5];
numeros2.push(6);
const index= numeros.indexOf(2);
// const numeros3 = [
//     numeros.slice(0,index),
//     1.5,
//     numeros.slice(index)
//  ]
 const numeros3 = [
    ...numeros.slice(0,index),
    1.5,
    ...numeros.slice(index)
 ]

 const numeros4 = numeros.filter(n=>n!=2);
const numeros5 = numeros.map(x=>x==2?100:x);
// ternario
// function reemplazar2por100(x) { 
// if (X == 2) {
//     return 100;
// } else {
//     return x;
// }}


console.log("numeros",numeros);
console.log("numeros2",numeros2);
console.log("numeros2",numeros3);
console.log("numeros2",numeros4);
console.log("numeros2",numeros5);

