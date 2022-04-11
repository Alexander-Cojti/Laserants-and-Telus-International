// Challenge 3.2
function AreaMaximaCoordenadasRecipiente(ArrrayAlturas) {
    let puntoIzquierda = 0;
    let puntoDerecha = ArrrayAlturas.length - 1;
    let areaMaxima = 0;
    while (puntoIzquierda < puntoDerecha) {
        let base = puntoDerecha - puntoIzquierda;
        let altura;
        if (ArrrayAlturas[puntoDerecha] >= ArrrayAlturas[puntoIzquierda]) {
            altura = ArrrayAlturas[puntoIzquierda];
            puntoIzquierda++;
        } else {
            altura = ArrrayAlturas[puntoDerecha];
            puntoDerecha--;
        }
        if (altura * base > areaMaxima) {
            areaMaxima = altura * base
        }
    }
    return areaMaxima;
}
// Challenge 3.1
var isPalindrome = function (x) {
    if (x < 0) {
        return false
    }
    var s = x.toString()
    if (s.split('').reverse().join('') === s) {
        return true;
    } else {
        return false;
    }
};
