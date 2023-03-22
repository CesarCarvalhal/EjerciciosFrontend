describe('registering_users', () => {
  const randomThing1 = 'a' + parseInt(Math.random(999)*1000);
  const randomThing2 = 'b' + parseInt(Math.random(999)*1000);
  const randomThing3 = 'c' + parseInt(Math.random(999)*1000);

  beforeEach(() => {
    cy.intercept('POST', '**/api/v2/users', (req) => {
      // Don't modify the real backend
      // https://docs.cypress.io/api/commands/intercept#Controlling-the-response
      req.reply({statusCode: 201, fixture: 'created.json'})
    }).as('onePost')

    //cy.intercept('POST', '**/api/v2/users', (req) => {
    //  req.reply({statusCode: 201, fixture: 'created.json'})
    //}).as('onePost')

    cy.visit('http://localhost:3000/register')
  })

  it('issue15 - register form sends correct random POST (1)', () => {
    cy.get('input[data-cy=inputUsername]')
    .type(randomThing1)

    cy.get('input[data-cy=inputPassword]')
    .type(randomThing2)

    cy.get('input[data-cy=inputPasswordConfirm]')
    .type(randomThing3)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait('@onePost')
    .its('request.body')
    .then(($reqBody) => {
      expect($reqBody.username).to.eq(randomThing1)
      expect($reqBody.password).to.eq(randomThing2)
      expect($reqBody.passwordConfirm).to.eq(randomThing3)
    })
  })

  it('issue15 - register form sends correct random POST (2)', () => {
    
    cy.get('input[data-cy=inputPasswordConfirm]')
    .type(randomThing3)
    
    cy.get('input[data-cy=inputUsername]')
    .type(randomThing1)

    cy.get('input[data-cy=inputPassword]')
    .type(randomThing2)


    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait('@onePost')
    .its('request.body')
    .then(($reqBody) => {
      expect($reqBody.username).to.eq(randomThing1)
      expect($reqBody.password).to.eq(randomThing2)
      expect($reqBody.passwordConfirm).to.eq(randomThing3)
    })
  })

  it('issue15 - register form does not send request if one element is empty', () => {
    cy.get('input[data-cy=inputUsername]')
    .type('a')
    cy.get('input[data-cy=inputPassword]')
    .type('a')
    cy.get('input[data-cy=inputSubmit]')
    .click()

    // Empty passwordConfirm
    cy.wait(1000)
    cy.get('@onePost.all').should('have.length', 0)

    cy.get('input[data-cy=inputUsername]')
    .clear()
    cy.get('input[data-cy=inputPasswordConfirm]')
    .type('a')
    cy.get('input[data-cy=inputSubmit]')
    .click()

    // Empty username
    cy.wait(1000)
    cy.get('@onePost.all').should('have.length', 0)

    cy.get('input[data-cy=inputPassword]')
    .clear()
    cy.get('input[data-cy=inputUsername]')
    .type('a')
    cy.get('input[data-cy=inputSubmit]')
    .click()
    
    // Empty password
    cy.wait(1000)
    cy.get('@onePost.all').should('have.length', 0)
  })

})

