/// <reference types="cypress" />

describe('guess the number', () => {
    let parameter1;
    const url = 'http://localhost:8000/guessTheNumber.html';

    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit(url);
        cy.reload(true); // Force-reload to prevent cache errors
    })

    it('issue23 random number in console log is correct, within range and different', () => {
        let number;
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            number = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(number).to.be.gte(0);
            expect(number).to.be.lte(100);
        });
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            const newNumber = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(newNumber).to.be.gte(0);
            expect(newNumber).to.be.lte(100);
            expect(newNumber).to.not.eq(number);
        });
    })

    it('issue23 paragraph and results container are correct', () => {
        cy.get('p')
        .should('have.length', 1);
        
        cy.get('p')
        .first()
        .should('have.text', 'Pienso en un número entre 0 y 100, ¿cuál dirías que es?');

        cy.get('div[data-cy=response]')
        .find('p')
        .should('have.length', 0);
    })

    it('issue23 form is correct', () => {
        cy.get('form[data-cy=theForm]')
        .find('input')
        .should('have.length', 2);

        cy.get('form[data-cy=theForm]')
        .find('input[data-cy=guessInput]')
        .should('have.attr', 'type', 'number');

        cy.get('form[data-cy=theForm]')
        .find('input[data-cy=inputSubmit]')
        .should('have.attr', 'type', 'submit');

        cy.get('div[data-cy=response]')
        .find('p')
        .should('have.length', 0);
    })

    it('issue23 guessing the number with smaller value generates appropriate output', () => {
        let number;
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            number = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(number).to.be.gte(0);
            expect(number).to.be.lte(100);
        }).then(() => {
            cy.get('input[data-cy=guessInput]')
            .type(number-1);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number-1) +'... Pero estoy pensando en un número más grande');
        });
    })

    it('issue23 guessing the number with greater value generates appropriate output', () => {
        let number;
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            number = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(number).to.be.gte(0);
            expect(number).to.be.lte(100);
        }).then(() => {
            cy.get('input[data-cy=guessInput]')
            .type(number+1);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number+1) +'... Pero estoy pensando en un número que es menor');
        });
    })

    it('issue23 guessing the number correctly generates appropriate output', () => {
        let number;
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            number = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(number).to.be.gte(0);
            expect(number).to.be.lte(100);
        }).then(() => {
            cy.get('input[data-cy=guessInput]')
            .type(number);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', '¡Enhorabuena! Has acertado en 1 intento(s)');
        });
    })

    it('issue23 sequence of 3 attempts generates correct output', () => {
        let number;
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            number = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(number).to.be.gte(0);
            expect(number).to.be.lte(100);
        }).then(() => {
            cy.get('input[data-cy=guessInput]')
            .type(number+10);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number+10) +'... Pero estoy pensando en un número que es menor');
            // 2nd attempt
            cy.get('input[data-cy=guessInput]').clear();
            cy.get('input[data-cy=guessInput]')
            .type(number+4);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number+4) +'... Pero estoy pensando en un número que es menor');
            // 3rd attempt
            cy.get('input[data-cy=guessInput]').clear();
            cy.get('input[data-cy=guessInput]')
            .type(number);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', '¡Enhorabuena! Has acertado en 3 intento(s)');
        });
    })

    it('issue23 sequence of 4 attempts generates correct output', () => {
        let number;
        cy.visit(url, {
            onBeforeLoad (win) {
            cy.stub(win.console, 'log', (x) => {
              parameter1 = x
            }).as("consoleLog")
          },
        })
        cy.get('@consoleLog').should(() => {
            expect(parameter1).to.match(/El número secreto es:/);
            number = parseInt(parameter1.substring(parameter1.search(":")+1));
            expect(number).to.be.gte(0);
            expect(number).to.be.lte(100);
        }).then(() => {
            cy.get('input[data-cy=guessInput]')
            .type(number+20);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number+20) +'... Pero estoy pensando en un número que es menor');
            // 2nd attempt
            cy.get('input[data-cy=guessInput]').clear();
            cy.get('input[data-cy=guessInput]')
            .type(number-5);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number-5) +'... Pero estoy pensando en un número más grande');
            // 3rd attempt
            cy.get('input[data-cy=guessInput]').clear();
            cy.get('input[data-cy=guessInput]')
            .type(number+2);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', 'Crees que estoy pensando en el número ' + (number+2) +'... Pero estoy pensando en un número que es menor');
            // 4th attempt
            cy.get('input[data-cy=guessInput]').clear();
            cy.get('input[data-cy=guessInput]')
            .type(number);
            cy.get('input[data-cy=inputSubmit]')
            .click();
            cy.get('div[data-cy=response]')
            .find('p')
            .should('have.length', 1);
            cy.get('div[data-cy=response]')
            .find('p')
            .first()
            .should('have.text', '¡Enhorabuena! Has acertado en 4 intento(s)');
        });
    })
})

