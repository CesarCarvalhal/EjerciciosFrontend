/// <reference types="cypress" />

describe('taxis class', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/taxis.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/taxis.html', {
            onBeforeLoad(win) {
            // Stub your functions here
            cy.stub(win.console, 'log').as('consoleLog')
          },
        })
    })

    it('issue18 console log is correct after insertion', () => {
        const r1 = "" + Math.trunc(Math.random() * 500); // as string
        const r2 = "" + Math.trunc(Math.random() * 500); // as string
        const r3 = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r1);

        cy.get("input[data-cy=input2]")
        .type(r2);

        cy.get("input[data-cy=input3]")
        .type(r3);

        cy.get("input[data-cy=input4]")
        .click();

        cy.get('@consoleLog').should('be.calledWith', "Añadidos datos de taxista:");
        cy.get('@consoleLog').should('be.calledWith', r1);
        cy.get('@consoleLog').should('be.calledWith', r2);
        cy.get('@consoleLog').should('be.calledWith', r3);
    })
})

