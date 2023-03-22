/// <reference types="cypress" />

describe('game loop', () => {
    let parameter1;
    let callCount = 0;
    beforeEach(() => {
        cy.visit('http://localhost:8000/projects/asteroids.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/projects/asteroids.html', {
            onBeforeLoad (win) {
                cy.stub(win.console, 'log', (x) => {
                  parameter1 = x
                  callCount++;
                }).as("consoleLog").log(false);
              },
        })
    })

    it('issue15 game loop log is generated', () => {
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.contain('Han pasado');
            expect(parameter1).to.contain('ms desde el último frame');
        });
    })
})
