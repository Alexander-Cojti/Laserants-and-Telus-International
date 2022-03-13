
let prefix = "hey!";
function saludar(mensaje) {
    return prefix + mensaje;
}

console.log(saludar("Hola"));
prefix = "adios";
console.log(saludar("Hola"));

// function mensaje(texto, formateador) {

//     return function (texto2) {
//         return formateador(texto, texto2);
//     }
// }

 const mensaje= (texto, formateador) => (texto2) =>formateador(texto, texto2);


const formatoDespedida =  (prefijo, texto) => `¡${prefijo} ${texto} ... :(`;

const saludo = mensaje("hola",(prefijo, texto) => "¡" + prefijo + " " + texto + "!");
const despedida = mensaje("adios", formatoDespedida);

console.log(saludo("mundo"));
console.log(despedida("mundo"));