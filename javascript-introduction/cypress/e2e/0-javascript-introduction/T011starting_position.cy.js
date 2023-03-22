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


    it('issue11 console log is correct', () => {
        const times = [823, 830, 827, 909, 620, 756, 1083];
        times.sort((a, b) => a - b);
        cy.get('@consoleLog').should('be.calledWith', "Tiempos ordenados");
        cy.get('@consoleLog').should('be.calledWith', times);
    })
})



