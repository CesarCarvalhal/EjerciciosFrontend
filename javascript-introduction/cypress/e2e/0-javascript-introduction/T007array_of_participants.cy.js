/// <reference types="cypress" />

describe('array_of_participants', () => {
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


    it('issue7 console log is correct', () => {
        const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
        const name = participants[1];
        cy.get('@consoleLog').should('be.calledWith', name);
    })
  
})

