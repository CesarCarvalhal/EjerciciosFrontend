/// <reference types="cypress" />

describe('a_monthly_calendar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue10 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue10]')
        .find('h1')
        .should('have.text', 'Ejercicio 10');
    })

    it('issue10 div contains correct h2', () => {
        cy.get('div[data-cy=issue10]')
        .find('h2')
        .should('have.text', 'OCTUBRE');
    })

    it('issue10 div contains correct h3', () => {
        cy.get('div[data-cy=issue10]')
        .find('h3')
        .should('have.text', '2023');
    })

    it('issue10 div contains a div for the calendar', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
    })

    it('issue10 div contains appropriate number of divs', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .should('have.length', correctNumberOfDays() + correctStartWeekDay());
    })

    it('issue10 div first sunday has correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(6)
        .should('have.css', 'background-color', 'rgb(255, 0, 0)');
    })

    it('issue10 div second sunday has correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(13)
        .should('have.css', 'background-color', 'rgb(255, 0, 0)');
    })

    it('issue10 div third sunday has correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(20)
        .should('have.css', 'background-color', 'rgb(255, 0, 0)');
    })

    it('issue10 div fourth sunday has correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(27)
        .should('have.css', 'background-color', 'rgb(255, 0, 0)');
    })

    it('issue10 div FIRST monday-saturday divs have correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .first()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    })

    it('issue10 div SECOND monday-saturday divs have correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(7)
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    })

    it('issue10 div THIRD monday-saturday divs have correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(14)
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    })

    it('issue10 div FOURTH monday-saturday divs have correct background', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(21)
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .next()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    })

    it('issue10 first empty DIVs are correct', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .then(($divs) => {
            switch (correctStartWeekDay()) {
                case 6: expect($divs.eq(5)).to.have.text(''); // intentional fallthrough
                case 5: expect($divs.eq(4)).to.have.text(''); // intentional fallthrough
                case 4: expect($divs.eq(3)).to.have.text(''); // intentional fallthrough
                case 3: expect($divs.eq(2)).to.have.text(''); // intentional fallthrough
                case 2: expect($divs.eq(1)).to.have.text(''); // intentional fallthrough
                case 1: expect($divs.eq(0)).to.have.text(''); // intentional fallthrough
            }
        });
    })

    it('issue10 first 7 days are correctly placed', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(correctStartWeekDay())
        .should('have.text', '1')
        .next()
        .should('have.text', '2')
        .next()
        .should('have.text', '3')
        .next()
        .should('have.text', '4')
        .next()
        .should('have.text', '5')
        .next()
        .should('have.text', '6')
        .next()
        .should('have.text', '7');
    })

    it('issue10 second 7 days are correctly placed', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(correctStartWeekDay()+7)
        .should('have.text', '8')
        .next()
        .should('have.text', '9')
        .next()
        .should('have.text', '10')
        .next()
        .should('have.text', '11')
        .next()
        .should('have.text', '12')
        .next()
        .should('have.text', '13')
        .next()
        .should('have.text', '14');
    })

    it('issue10 third 7 days are correctly placed', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(correctStartWeekDay()+14)
        .should('have.text', '15')
        .next()
        .should('have.text', '16')
        .next()
        .should('have.text', '17')
        .next()
        .should('have.text', '18')
        .next()
        .should('have.text', '19')
        .next()
        .should('have.text', '20')
        .next()
        .should('have.text', '21');
    })

    it('issue10 fourth 7 days are correctly placed', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .eq(correctStartWeekDay()+21)
        .should('have.text', '22')
        .next()
        .should('have.text', '23')
        .next()
        .should('have.text', '24')
        .next()
        .should('have.text', '25')
        .next()
        .should('have.text', '26')
        .next()
        .should('have.text', '27')
        .next()
        .should('have.text', '28');
    })

    it('issue10 last days of the month are correct', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .should('have.length', correctNumberOfDays()+correctStartWeekDay());
    })

    it('issue10 div parent element has correct flex-related CSS (1)', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .should('have.css', 'display', 'flex');
    })

    it('issue10 div parent element has correct flex-related CSS (2)', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .should('have.css', 'flex-wrap', 'wrap');
    })

    it('issue10 div children elements have correct flex-related CSS', () => {
        cy.get('div[data-cy=issue10]')
        .find('div.calendar-month')
        .find('div')
        .should('have.css', 'flex', '0 1 14%');
    })

    function correctStartWeekDay() {
        const month = 'OCTUBRE';
        switch (month) {
            case 'ENERO': return 6;
            case 'FEBRERO': return 2;
            case 'MARZO': return 2;
            case 'ABRIL': return 5;
            case 'MAYO': return 0;
            case 'JUNIO': return 3;
            case 'JULIO': return 5;
            case 'AGOSTO': return 1;
            case 'SEPTIEMBRE': return 4;
            case 'OCTUBRE': return 6;
            case 'NOVIEMBRE': return 2;
            case 'DICIEMBRE': return 4;
        }
    }

    function correctNumberOfDays() {
        const month = 'OCTUBRE';
        switch (month) {
            case 'ENERO': return 31;
            case 'FEBRERO': return 28;
            case 'MARZO': return 31;
            case 'ABRIL': return 30;
            case 'MAYO': return 31;
            case 'JUNIO': return 30;
            case 'JULIO': return 31;
            case 'AGOSTO': return 31;
            case 'SEPTIEMBRE': return 30;
            case 'OCTUBRE': return 31;
            case 'NOVIEMBRE': return 30;
            case 'DICIEMBRE': return 31;
        }
    }
});

