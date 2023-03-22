/// <reference types="cypress" />

describe('vehicles', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/deathrace.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/deathrace.html', {
            onBeforeLoad(win) {
            // Stub your functions here
            cy.stub(win.console, 'log').as('consoleLog')
          },
        })
    })


    it('issue14 console log is correct', () => {
        const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
        const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
        const times = [823, 830, 827, 909, 620, 756, 1083];
        const times2 = [825, 831, 826, 926, 627, 758, 1072];
        for (let i = 0; i < participants.length; i++) {
            const element = {
                "name": participants[i],
                "car": vehicles[i],
                "meanTime": Math.trunc((times[i] + times2[i]) / 2)
            }
            cy.get('@consoleLog').should('be.calledWith', "He añadido el elemento");
            cy.get('@consoleLog').should('be.calledWith', element);
        } 
    })
})

