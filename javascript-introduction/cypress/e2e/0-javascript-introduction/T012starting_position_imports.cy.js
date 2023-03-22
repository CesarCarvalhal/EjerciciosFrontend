/// <reference types="cypress" />

describe('vehicles', () => {

    it('issue12 console log is correct', () => {
        cy.visit('http://localhost:8000/deathrace.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/deathrace.html', {
            onBeforeLoad(win) {
            // Stub your functions here
            cy.stub(win.console, 'log').as('consoleLog')
          },
        })

        const times = [823, 830, 827, 909, 620, 756, 1083];
        times.sort((a, b) => a - b);
        cy.get('@consoleLog').should('be.calledWith', times);
        cy.get('@consoleLog').should('be.calledWith', "Ordenados mediante una función importada");
    })

    it('issue12 external js has been created', () => {
        cy.request('http://localhost:8000/sort.js')
    })
})

