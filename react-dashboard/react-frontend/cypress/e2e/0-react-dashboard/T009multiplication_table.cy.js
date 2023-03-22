/// <reference types="cypress" />

describe('multiplication_table', () => {
  it('issue9 div contains an appropriate header', () => {
    const randomNumber = Math.random().toString().slice(2, 5);

    cy.visit("http://localhost:3000/multiplication/" + randomNumber)

    cy.get('div[data-cy=issue9body]')
    .find('h3[data-cy=pageHeader]')
    .should('have.text', 'Multiplicación de ' + randomNumber);
  })

  it('issue9 - invoices page has correct table headers ', () => {
    const randomNumber = Math.random().toString().slice(2, 5);

      cy.visit("http://localhost:3000/multiplication/" + randomNumber)
      
      cy.get('table')
      .find('thead')
      .should('have.length', 1)
      .find('tr')
      .should('have.length', 1)
      .find('th')
      .should('have.length', 3)
      .first()
      .should('have.text', 'PRIMER NÚMERO');

      cy.get('thead')
      .find('th')
      .eq(1)
      .should('have.text', 'SEGUNDO NÚMERO');

      cy.get('thead')
      .find('th')
      .eq(2)
      .should('have.text', 'VALOR');
  })

  it('issue9 div tbody contains 10 rows', () => {
    const randomNumber = Math.random().toString().slice(2, 5);

      cy.visit("http://localhost:3000/multiplication/" + randomNumber)
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .should('have.length', 10);
  })


  it('issue9 div tbody FIRST ROW has correct values', () => {
    const randomNumber = Math.random().toString().slice(2, 5);
    
      cy.visit("http://localhost:3000/multiplication/" + randomNumber)
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .first()
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(1);
        expect($td.last()).to.have.text(randomNumber);
      })
  })

  it('issue9 div tbody 2ND and 3RD rows hav correct values', () => {
    const randomNumber = Math.random().toString().slice(2, 5);
    
      cy.visit("http://localhost:3000/multiplication/" + randomNumber)
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(1)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(2);
        expect($td.last()).to.have.text(randomNumber*2);
      })
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(2)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(3);
        expect($td.last()).to.have.text(randomNumber*3);
      })
  })

  it('issue9 div tbody 5TH and 6TH rows hav correct values', () => {
    const randomNumber = Math.random().toString().slice(2, 5);
    
      cy.visit("http://localhost:3000/multiplication/" + randomNumber)
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(4)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(5);
        expect($td.last()).to.have.text(randomNumber*5);
      })
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(5)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(6);
        expect($td.last()).to.have.text(randomNumber*6);
      })
  })

  it('issue9 div tbody 8TH, 9TH and 10TH rows to have correct values', () => {
    const randomNumber = Math.random().toString().slice(2, 5);
    
      cy.visit("http://localhost:3000/multiplication/" + randomNumber)
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(7)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(8);
        expect($td.last()).to.have.text(randomNumber*8);
      })
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(8)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(9);
        expect($td.last()).to.have.text(randomNumber*9);
      })
      cy.get('div[data-cy=issue9body]')
      .find('table')
      .find('tbody')
      .find('tr')
      .eq(9)
      .find('td')
      .then(($td) => {
        expect($td.first()).to.have.text(randomNumber);
        expect($td.eq(1)).to.have.text(10);
        expect($td.last()).to.have.text(randomNumber*10);
      })
  })
});
