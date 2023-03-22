describe('is_that_a_useless_button', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/1/questions/1?**', (req) => {
      if ((req.query['page_size'] == 5) && (req.query['older_than'] == 1234)) {
        req.reply({statusCode: 200, fixture: 'question1-d1-size5-page2_v2.json' })
      } else if ((req.query['page_size'] == 5) && (req.query['older_than'] == 5555)) {
        req.alias = "correctSecondPageRequest"
        req.reply({statusCode: 200, fixture: 'question1-d1-empty_v2.json' })
      } else if (req.query['page_size'] == 5) {
        req.reply({statusCode: 200, fixture: 'question1-d1-size5_v2.json' })
      } else {
        req.reply({statusCode: 400 }) // Developer has sent a wrong request!
      }
    })
  })

  it('issue10 - dashboards/1/questions/1 page button is still there after 1 click and 2 clicks', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)

    cy.get('button')
    .first()
    .click() // If hidden, it can't be clicked

    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 6)

    cy.get('button')
    .first()
    .click() // If hidden, it can't be clicked
  })

  it('issue10 - dashboards/1/questions/1 page button disappears after 2 clicks', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)

    cy.get('button')
    .first()
    .click() // If hidden, it can't be clicked

    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 6)

    cy.get('button')
    .first()
    .click() // If hidden, it can't be clicked

    cy.wait(1000)

    cy.get('button')
    .first()
    .should('have.attr', 'hidden')
  })
})


