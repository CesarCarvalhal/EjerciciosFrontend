import Taxi from "./taxi.js";
const taxiDrivers = []; // Declaramos una variable. Aquí acumularemos la información que permitiremos añadir una y otra vez, pulsando Insertar

function customOnSubmit(event) {
    event.preventDefault();
    const userInsertedName = event.target.elements.inputName.value;
    const userInsertedKms = event.target.elements.inputKms.value;
    const userInsertedTravels = event.target.elements.inputTravelCount.value;
    
    const newDriver = new Taxi(userInsertedName, userInsertedKms, userInsertedTravels);

    taxiDrivers.push(newDriver);
    console.log("Añadidos datos de taxista:");
    console.log(newDriver.name);
    console.log(newDriver.distance);
    console.log(newDriver.numTravels);

    let newLi = document.createElement("li");
    newLi.innerHTML = newDriver.name;

    taxisList.appendChild(newLi);
}

function customOnClick(event) {
    // Los button no tienen una acción "por defecto" cuando se clican
    // Por ello, no necesitamos hacer event.preventDefault();
    console.log("Clicaste en ordenar");
    const theList = document.getElementById("taxisList");
    theList.innerHTML = ""; 
    taxiDrivers.sort((taxi1, taxi2) => taxi1.moneyMade() - taxi2.moneyMade());
    for (const taxi of taxiDrivers) {
        let aListItem = document.createElement("li");
        aListItem.innerHTML = taxi.name;
        theList.append(aListItem);
    }


}
document.getElementById("sortButton").addEventListener("click", customOnClick);


// Asignamos nuestra función al evento "submit"
document.getElementById("taxiForm").addEventListener("submit", customOnSubmit);
