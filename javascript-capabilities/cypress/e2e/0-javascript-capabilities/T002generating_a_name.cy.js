/// <reference types="cypress" />

describe('generating random name', () => {
    let parameter1;
    beforeEach(() => {
        cy.visit('http://localhost:8000/projects/nameGenerator.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/projects/nameGenerator.html', {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
    })
  
    it('issue2 console log is correct', () => {
        cy.get('@consoleLog').should('be.calledWith', "Código inicializado");
        cy.get('@consoleLog').should(() => {
            let containsChoice1 = false;
            for (const c of ['Mega', 'Turbo', 'Hiper', 'Super', 'Great', 'Big', 'Small', 'Nitro', 'Shadow', 'Random']) {
                if (parameter1.includes(c)) {
                    containsChoice1 = true;
                }
            }
            expect(containsChoice1).to.be.eq(true);
            let containsChoice2 = false;
            for (const c of ['Dog', 'Cat', 'Lizard', 'Croco', 'Coconut', 'Apple', 'Demon', 'Car', 'Tree', 'Light', 'JavaScript']) {
                if (parameter1.includes(c)) {
                    containsChoice2 = true;
                }
            }
            expect(containsChoice2).to.be.eq(true);
            const number = parseInt(parameter1.substring(parameter1.length - 5));
            expect(number).to.be.gte(10518);
            expect(number).to.be.lte(10518 + 64);
        });
    })
  })
