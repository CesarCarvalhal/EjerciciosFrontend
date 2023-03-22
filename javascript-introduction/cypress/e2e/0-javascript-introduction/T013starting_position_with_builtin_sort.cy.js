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


    it('issue13 console log is correct', () => {
        const t = [825, 831, 826, 926, 627, 758, 1072];
        t.sort((a, b) => a - b);
        cy.get('@consoleLog').should('be.calledWith', t);
    })
})

