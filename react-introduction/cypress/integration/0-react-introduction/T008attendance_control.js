/// <reference types="cypress" />

describe('attendance_control', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue8 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue8]')
        .find('h1')
        .should('have.text', 'Ejercicio 8');
    })

    it('issue8 div contains 1 table with 1 thead', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('thead')
        .should('have.length', 1);
    })

    it('issue8 div contains 1 table with 1 tbody', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .should('have.length', 1);
    })

    it('issue8 thead contains 1 row', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('thead')
        .find('tr')
        .should('have.length', 1);
    })

    it('issue8 div thead contains appropriate FIRST header', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('thead')
        .find('tr')
        .find('th')
        .eq(0)
        .should('have.text', 'HORA DE ENTRADA');
    })

    it('issue8 div thead contains appropriate SECOND header', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('thead')
        .find('tr')
        .find('th')
        .eq(1)
        .should('have.text', 'HORA DE SALIDA');
    })

    it('issue8 div thead contains appropriate THIRD header', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('thead')
        .find('tr')
        .find('th')
        .last()
        .should('have.text', 'MINUTOS');
    })

    it('issue8 div tbody contains 5 rows', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .should('have.length', 5);
    })

    it('issue8 div tbody FIRST ROW has valid first value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .first()
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody FIRST ROW has valid second value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .eq(1)
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody FIRST ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .then(($row) => {
            const firstValue = $row.first().text().split(':');
            const in_hour = parseInt(firstValue[0]);
            const in_minute = parseInt(firstValue[1]);
            const secondValue = $row.eq(1).text().split(':');
            const out_hour = parseInt(secondValue[0]);
            const out_minute = parseInt(secondValue[1]);
            const output = $row.last().text();
            if (in_hour > out_hour) {
                expect(output).to.be.equals('ERROR');
            } else if ((in_hour === out_hour) && (in_minute > out_minute)) {
                expect(output).to.be.equals('ERROR');
            } else {
                const minutes = parseInt(output);
                const expected_duration = (out_hour - in_hour) * 60 + (out_minute - in_minute);
                expect(minutes).to.be.equals(expected_duration);
            }
        });
    })

    it('issue8 div tbody SECOND ROW has valid first value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .first()
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody SECOND ROW has valid second value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .eq(1)
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody SECOND ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .then(($row) => {
            const firstValue = $row.first().text().split(':');
            const in_hour = parseInt(firstValue[0]);
            const in_minute = parseInt(firstValue[1]);
            const secondValue = $row.eq(1).text().split(':');
            const out_hour = parseInt(secondValue[0]);
            const out_minute = parseInt(secondValue[1]);
            const output = $row.last().text();
            if (in_hour > out_hour) {
                expect(output).to.be.equals('ERROR');
            } else if ((in_hour === out_hour) && (in_minute > out_minute)) {
                expect(output).to.be.equals('ERROR');
            } else {
                const minutes = parseInt(output);
                const expected_duration = (out_hour - in_hour) * 60 + (out_minute - in_minute);
                expect(minutes).to.be.equals(expected_duration);
            }
        });
    })

    it('issue8 div tbody THIRD ROW has valid first value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .first()
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody THIRD ROW has valid second value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(1)
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody THIRD ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .then(($row) => {
            const firstValue = $row.first().text().split(':');
            const in_hour = parseInt(firstValue[0]);
            const in_minute = parseInt(firstValue[1]);
            const secondValue = $row.eq(1).text().split(':');
            const out_hour = parseInt(secondValue[0]);
            const out_minute = parseInt(secondValue[1]);
            const output = $row.last().text();
            if (in_hour > out_hour) {
                expect(output).to.be.equals('ERROR');
            } else if ((in_hour === out_hour) && (in_minute > out_minute)) {
                expect(output).to.be.equals('ERROR');
            } else {
                const minutes = parseInt(output);
                const expected_duration = (out_hour - in_hour) * 60 + (out_minute - in_minute);
                expect(minutes).to.be.equals(expected_duration);
            }
        });
    })

    it('issue8 div tbody FOURTH ROW has valid first value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(3)
        .find('td')
        .first()
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody FOURTH ROW has valid second value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(3)
        .find('td')
        .eq(1)
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody FOURTH ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(3)
        .find('td')
        .then(($row) => {
            const firstValue = $row.first().text().split(':');
            const in_hour = parseInt(firstValue[0]);
            const in_minute = parseInt(firstValue[1]);
            const secondValue = $row.eq(1).text().split(':');
            const out_hour = parseInt(secondValue[0]);
            const out_minute = parseInt(secondValue[1]);
            const output = $row.last().text();
            if (in_hour > out_hour) {
                expect(output).to.be.equals('ERROR');
            } else if ((in_hour === out_hour) && (in_minute > out_minute)) {
                expect(output).to.be.equals('ERROR');
            } else {
                const minutes = parseInt(output);
                const expected_duration = (out_hour - in_hour) * 60 + (out_minute - in_minute);
                expect(minutes).to.be.equals(expected_duration);
            }
        });
    })

    it('issue8 div tbody FIFTH ROW has valid first value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(4)
        .find('td')
        .first()
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody FIFTH ROW has valid second value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(4)
        .find('td')
        .eq(1)
        .then(($td) => {
            expect($td.text().split(':')).to.have.length(2)
        });
    })

    it('issue8 div tbody FIFTH ROW has correct calculated value', () => {
        cy.get('div[data-cy=issue8]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(4)
        .find('td')
        .then(($row) => {
            const firstValue = $row.first().text().split(':');
            const in_hour = parseInt(firstValue[0]);
            const in_minute = parseInt(firstValue[1]);
            const secondValue = $row.eq(1).text().split(':');
            const out_hour = parseInt(secondValue[0]);
            const out_minute = parseInt(secondValue[1]);
            const output = $row.last().text();
            if (in_hour > out_hour) {
                expect(output).to.be.equals('ERROR');
            } else if ((in_hour === out_hour) && (in_minute > out_minute)) {
                expect(output).to.be.equals('ERROR');
            } else {
                const minutes = parseInt(output);
                const expected_duration = (out_hour - in_hour) * 60 + (out_minute - in_minute);
                expect(minutes).to.be.equals(expected_duration);
            }
        });
    })
});
