function filtrarImpares(lista) {
    if (!Array.isArray(lista)) {
        console.log("Isso não é um array!");
        return;
    };

    impares = [];
    for (let i of lista) {
        if (Number.isInteger(i)){
            if (i % 2 === 1) {impares.push(i)};
        }
    };

    return impares;
}

var lista = 3

console.log(filtrarImpares(lista));