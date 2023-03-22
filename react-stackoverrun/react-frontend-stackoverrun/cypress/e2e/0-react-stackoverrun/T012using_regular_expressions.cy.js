describe('using_regular_expressions', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/2**', (req) => {
      const possibleInputs = ['zz', 'zzz', 'zzzz', 'zzzzz', 'zzzzzz', 'zzzzzzz', 'zzzzzzzz','00', '000', '0000', '00000', '000000', '0000000', '00000000'];
      if (possibleInputs.indexOf(req.query['search']) != -1) {
        req.reply({statusCode: 200, fixture: 'dashboard2-searchR0_v2.json' })
      } else {
        req.reply({statusCode: 200, fixture: 'dashboard2_v2.json' })
      }
    })
  })

  it('issue - dashboards/2 form correctly shows alert when input is 3 minus one letters', () => {
    // https://docs.cypress.io/api/events/catalog-of-events#Window-Alert
    const stub = cy.stub();
    cy.on('window:alert', stub);
    
    cy.visit('http://localhost:3000/dashboards/2');
    cy.wait(1000)

    for (let i=0; i<(3-1); i++) {
      cy.get('form')
      .find('input')
      .first()
      .type('z')
    }

    cy.get('form')
    .find('input')
    .eq(1)
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Introduce al menos '+3+' letras')
    })
  })

  it('issue - dashboards/2 form correctly shows alert when input is 3 numbers', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    for (let i=0; i<3; i++) {
      cy.get('form')
      .find('input')
      .first()
      .type('0')
    }

    cy.get('form')
    .find('input')
    .eq(1)
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Introduce al menos '+3+' letras')
    })
  })

  it('issue - dashboards/2 form correctly works as expected when input is 3 letters', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    for (let i=0; i<3; i++) {
      cy.get('form')
      .find('input')
      .first()
      .type('z')
    }

    cy.get('form')
    .find('input')
    .eq(1)
    .click()
    .then(() => {
      expect(stub.callCount).to.be.equal(0)
    })
    
  })
})

