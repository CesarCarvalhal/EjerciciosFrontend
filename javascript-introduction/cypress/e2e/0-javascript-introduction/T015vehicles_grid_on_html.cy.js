/// <reference types="cypress" />

describe('vehicles on html', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/deathrace.html')
        cy.reload(true); // Force-reload to prevent cache errors
    })


    it('issue15 count of list item is correct', () => {
        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .should("have.length", 1);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 7);
    })

    it('issue15 list item 1 is correct', () => {
        assertListItem(0);
    })

    it('issue15 list item 2 is correct', () => {
        assertListItem(1);
    })

    it('issue15 list item 3 is correct', () => {
        assertListItem(2);
    })

    it('issue15 list item 4 is correct', () => {
        assertListItem(3);
    })

    it('issue15 list item 5 is correct', () => {
        assertListItem(4);
    })

    it('issue15 list item 6 is correct', () => {
        assertListItem(5);
    })

    it('issue15 list item 7 is correct', () => {
        assertListItem(6);
    })

    const assertListItem = (n) => {
        const name = runners()[n].name;
        const car = runners()[n].car;
        const time = runners()[n].time;
        
        cy.get("li[data-cy=listItem" + n + "]")
        .find("b")
        .should("have.text", name);

        
        cy.get("li[data-cy=listItem" + n + "]")
        .find("i")
        .should("have.text", car);

        
        cy.get("li[data-cy=listItem" + n + "]")
        .should("have.text", name + ": " + car + ". Clasificación: " + time + " décimas de segundo");
    }
})

const runners = () => {
    const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
    const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
    const times = [823, 830, 827, 909, 620, 756, 1083];
    const times2 = [825, 831, 826, 926, 627, 758, 1072];
    const result = []
    for (let i = 0; i < participants.length; i++) {
        result.push({
            "name": participants[i],
            "car": vehicles[i],
            "time": Math.trunc((times[i] + times2[i]) / 2)
        });
    }
    result.sort((a, b) => a.time - b.time)
    return result;
}

