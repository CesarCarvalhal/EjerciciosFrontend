/// <reference types="cypress" />

describe('a_simple_not_found_start', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/' + Math.random().toString().slice(2, 8))
  })

  it('issue2 - not found page initial CSS is correct', () => {
    cy.get('div[data-cy=pageBody]')
    .find('h1[data-cy=pageHeader]')
    .should('have.css', 'text-align', 'center');

    cy.get('div[data-cy=pageBody]')
    .find('p[data-cy=simpleMessage]')
    .should('have.css', 'text-align', 'center');

    cy.get('div[data-cy=pageBody]')
    .find('a')
    .first()
    .should('have.css', 'display', 'block')
    .then(($a) => {
      // Not-very-elegant way of testing CSS computed values.
      // Cypress doesn't apparently gives us the value before being computed

      // Check for width: fit-content
      const cssWidthValue = parseInt($a.css('width').slice(0, -2));
      expect(cssWidthValue).to.be.greaterThan(30);
      expect(cssWidthValue).to.be.lessThan(200);

      // Check for margin-left: auto
      const cssMarginLeftValue = parseInt($a.css('margin-left').slice(0, -2));
      expect(cssMarginLeftValue).to.be.greaterThan(100);
      expect(cssMarginLeftValue).to.be.lessThan(800);

      // Check for margin-left: auto
      const cssMarginRightValue = parseInt($a.css('margin-right').slice(0, -2));
      expect(cssMarginRightValue).to.be.greaterThan(100);
      expect(cssMarginRightValue).to.be.lessThan(800);
    })
  })

  it('issue2 - not found page background CSS is correct', () => {
    cy.get('body')
    .first()
    .then(($body) => {
      const cssBackground = $body.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(212, 223, 212) 0%, rgb(194, 194, 247) 35%, rgb(195, 245, 255) 100%)')
    })
  })

  it('issue2 - not found page contains image with correct src and base CSS', () => {
    cy.get('img')
    .first()
    .should('have.attr', 'src', '/images/monkey-face.png')
    .should('have.css', 'display', 'block')
    .should('have.css', 'margin-top', '84px')
    .then(($img) => {
      // Check for margin-left: auto
      const cssMarginLeftValue = parseInt($img.css('margin-left').slice(0, -2));
      expect(cssMarginLeftValue).to.be.greaterThan(100);
      expect(cssMarginLeftValue).to.be.lessThan(800);
      
      // Check for margin-left: auto
      const cssMarginRightValue = parseInt($img.css('margin-right').slice(0, -2));
      expect(cssMarginRightValue).to.be.greaterThan(100);
      expect(cssMarginRightValue).to.be.lessThan(800);
    });
  })

  it('issue2 - not found page contains image with correct rotation', () => {
    cy.get('img')
    .should('have.css', 'animation', '28s linear 0s infinite normal none running rotation');
  })
})

