/// <reference types="cypress" />

describe('parity_simulation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue9 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue9]')
        .find('h1')
        .should('have.text', 'Ejercicio 9');
    })

    it('issue9 div contains 1 table with 1 thead', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('thead')
        .should('have.length', 1);
    })

    it('issue9 div contains 1 table with 1 tbody', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .should('have.length', 1);
    })

    it('issue9 thead contains 1 row', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('thead')
        .find('tr')
        .should('have.length', 1);
    })

    it('issue9 div thead contains appropriate FIRST header', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('thead')
        .find('tr')
        .find('th')
        .eq(0)
        .should('have.text', 'DISCO DE DATOS 1');
    })

    it('issue9 div thead contains appropriate SECOND header', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('thead')
        .find('tr')
        .find('th')
        .eq(1)
        .should('have.text', 'DISCO DE DATOS 2');
    })

    it('issue9 div thead contains appropriate THIRD header', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('thead')
        .find('tr')
        .find('th')
        .last()
        .should('have.text', 'DISCO DE PARIDAD');
    })

    it('issue9 div tbody contains 10 rows', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .should('have.length', 10);
    })

    it('issue9 div tbody FIRST ROW has valid first value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .first()
        .contains(/[0-1]/);
    })

    it('issue9 div tbody FIRST ROW has valid second value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .eq(1)
        .contains(/[0-1]/);
    })

    it('issue9 div tbody FIRST ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .then(($row) => {
            const firstValue = parseInt($row.first().text());
            const secondValue = parseInt($row.eq(1).text());
            expect(parseInt($row.last().text())).to.be.equals((firstValue + secondValue) % 2);
        });
    })

    it('issue9 div tbody SECOND ROW has valid first value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .first()
        .contains(/[0-1]/);
    })

    it('issue9 div tbody SECOND ROW has valid second value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .eq(1)
        .contains(/[0-1]/);
    })

    it('issue9 div tbody SECOND ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .then(($row) => {
            const firstValue = parseInt($row.first().text());
            const secondValue = parseInt($row.eq(1).text());
            expect(parseInt($row.last().text())).to.be.equals((firstValue + secondValue) % 2);
        });
    })

    it('issue9 div tbody SIXTH ROW has valid first value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(5)
        .find('td')
        .first()
        .contains(/[0-1]/);
    })

    it('issue9 div tbody SIXTH ROW has valid second value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(5)
        .find('td')
        .eq(1)
        .contains(/[0-1]/);
    })

    it('issue9 div tbody SIXTH ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(5)
        .find('td')
        .then(($row) => {
            const firstValue = parseInt($row.first().text());
            const secondValue = parseInt($row.eq(1).text());
            expect(parseInt($row.last().text())).to.be.equals((firstValue + secondValue) % 2);
        });
    })

    it('issue9 div tbody SEVENTH ROW has valid first value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(6)
        .find('td')
        .first()
        .contains(/[0-1]/);
    })

    it('issue9 div tbody SEVENTH ROW has valid second value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(6)
        .find('td')
        .eq(1)
        .contains(/[0-1]/);
    })

    it('issue9 div tbody SEVENTH ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(6)
        .find('td')
        .then(($row) => {
            const firstValue = parseInt($row.first().text());
            const secondValue = parseInt($row.eq(1).text());
            expect(parseInt($row.last().text())).to.be.equals((firstValue + secondValue) % 2);
        });
    })

    it('issue9 div tbody TENTH ROW has valid first value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .last()
        .find('td')
        .first()
        .contains(/[0-1]/);
    })

    it('issue9 div tbody TENTH ROW has valid second value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .last()
        .find('td')
        .eq(1)
        .contains(/[0-1]/);
    })

    it('issue9 div tbody TENTH ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue9]')
        .find('table')
        .find('tbody')
        .find('tr')
        .last()
        .find('td')
        .then(($row) => {
            const firstValue = parseInt($row.first().text());
            const secondValue = parseInt($row.eq(1).text());
            expect(parseInt($row.last().text())).to.be.equals((firstValue + secondValue) % 2);
        });
    })
});
