/// <reference types="cypress" />

describe('endgame', () => {
    let callCount = 0;
    let asteroidHasBeenGenerated = false;
    beforeEach(() => {
        cy.visit('http://localhost:8000/projects/asteroids.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/projects/asteroids.html', {
            onBeforeLoad (win) {
                cy.stub(win.console, 'log', (x) => {
                    if(x.includes('Fin de la partida')) {
                        callCount++;
                    }
                    if(x.includes('Se ha generado un asteroide')) {
                        asteroidHasBeenGenerated = true;
                    }
                }).as("consoleLog").log(false);
              },
        })
    })

    it('issue21 game finishes', () => {
        // This test is pretty dumb, but the simpler the better
        // Just sit there until a random asteroid hits the spaceship with a 5 minutes timeout
        const MAX_RETRIES = 30;
        let retries = 0;
        cy.wait(2000).then(() => {
            expect(callCount).to.be.eq(0);
            expect(asteroidHasBeenGenerated).to.be.true; // If this log hasn't taken place, just don't keep going for 5 minutes

            const waitTenSecondsAndCheck = () => {
                cy.wait(10000).then(() => {
                    cy.log('I have waited 10 seconds and the game has not finished. I will wait another 10...').then(() => {
                        expect(retries).to.be.lt(MAX_RETRIES);
                        if (callCount === 0) {
                            retries++;
                            waitTenSecondsAndCheck();
                        } else {
                            expect(callCount).to.be.eq(1);
                        }
                    })
                })
            }

            waitTenSecondsAndCheck();
        });
    })
})
