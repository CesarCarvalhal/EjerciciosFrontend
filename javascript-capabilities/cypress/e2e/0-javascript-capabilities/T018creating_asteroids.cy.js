/// <reference types="cypress" />

describe('generating_asteroids_i', () => {
    let parameter1;
    let callCount = 0;
    beforeEach(() => {
        cy.visit('http://localhost:8000/projects/asteroids.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/projects/asteroids.html', {
            onBeforeLoad (win) {
                cy.stub(win.console, 'log', (x) => {
                    if(x.includes('Se ha generado un asteroide')) {
                        parameter1 = x
                        callCount++;
                    }
                }).as("consoleLog").log(false);
              },
        })
    })

    it('issue18 game loop log is generated', () => {
        cy.wait(200).then(() => {
            expect(parameter1).to.contain('Se ha generado un asteroide')
            expect(callCount).to.be.eq(1);
        });
    })
})
