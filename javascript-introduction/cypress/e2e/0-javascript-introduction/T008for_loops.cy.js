/// <reference types="cypress" />

describe('for_loops', () => {
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


    it('issue8 console log in normal loop is correct', () => {
        const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
        for (let i = 0; i<participants.length; i++) {
            cy.get('@consoleLog').should('be.calledWith', "Iteración número: " + i);
            cy.get('@consoleLog').should('be.calledWith', "En la posición " + i + " del array está " + participants[i]);
        }
    })
  
    it('issue8 console log in for...of is correct', () => {
        const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
        for (const p of participants) {
            cy.get('@consoleLog').should('be.calledWith', "Participante " + p);
        }
    })
})

