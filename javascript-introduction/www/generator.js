import sortArray from "./sort.js";

// Generador de parrillas de salida
const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
console.log(participants[1]);
const numberOfParticipants = participants.length;
console.log(numberOfParticipants);

for (let i = 0; i < participants.length; i++) {
    // Contenido del bucle
    console.log("Iteración número: " + i);
    console.log("En la posición " + i + " del array está " + participants[i]);
}

for (const p of participants) {
    console.log("Participante " + p);
}

const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
console.assert(participants.length === vehicles.length, "¡Cuidado! Longitud de arrays diferente");

for (let i = 0; i < participants.length; i++) {
    console.log("El corredor " + participants[i] + " usa el coche " + vehicles[i]);
}

const runners = [
    {
        "name": "Manson",
        "car": "Peugeot 208"
    },
    {
        "name": "Fury",
        "car": "Volkswagen Golf"
    },
    {
        "name": "Storm",
        "car": "Dacia Sandero"
    },
    {
        "name": "Kelloggs",
        "car": "Renault Clio"
    },
    {
        "name": "Scarecrow",
        "car": "Tesla Model 3"
    },
    {
        "name": "Number",
        "car": "Hyundai Tucson"
    },
    {
        "name": "Bull",
        "car": "Fiat Panda"
    },
]

for (const runner of runners) {
    console.log(runner);
}
console.log("Información de la parrilla en el array de objetos");
// Nuevo bucle
for (const runner of runners) {
    console.log("Conductor: " + runner.name + "; Vehículo: " + runner.car);
}



const times = [823, 830, 827, 909, 620, 756, 1083];

sortArray(times);

console.log("Tiempos ordenados");
console.log(times);

console.log("Ordenados mediante una función importada");

function compareAB(a, b) {
    return a - b;
}

const times2 = [825, 831, 826, 926, 627, 758, 1072];
times2.sort(compareAB);
console.log(times2);

const unsortedTimes = [823, 830, 827, 909, 620, 756, 1083];
const unsortedTimes2 = [825, 831, 826, 926, 627, 758, 1072];




console.assert((runners.length === unsortedTimes.length) && (runners.length === unsortedTimes2.length), "¡Cuidado! Longitud de arrays diferente");

const completeRunnersData = [];

for (let i = 0; i < runners.length; i++) {
    const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
    const truncatedMeanTime = Math.trunc(meanTime);
    const runnerData = { ...runners[i], "meanTime": truncatedMeanTime };
    completeRunnersData.push(runnerData);
    console.log("He añadido el elemento");
    console.log(runnerData);
}



function compareMenorMayor(a, b) {
    return a.meanTime - b.meanTime;
}

completeRunnersData.sort(compareMenorMayor);
console.log(completeRunnersData);

let theList = document.createElement("ol");

for (let i = 0; i < completeRunnersData.length; i++) {
    const runner = completeRunnersData[i];
    let aListItem = document.createElement("li");
    aListItem.setAttribute("data-cy", "listItem" + i)
    aListItem.innerHTML = "<b>" + runner.name + "</b>: <i>" + runner.car + "</i>. Clasificación: " + runner.meanTime + " décimas de segundo";
    theList.append(aListItem);
}
document.getElementById("mainDiv").append(theList);
