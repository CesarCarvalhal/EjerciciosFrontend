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


    it('issue9 console log is correct', () => {
        const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
        const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
        for (let i = 0; i < participants.length; i++) {
            cy.get('@consoleLog').should('be.calledWith', "El corredor " + participants[i] + " usa el coche " + vehicles[i]);
        }
    })
})


