describe('beginning_to_understand_pagination', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/1/questions/1?**', (req) => {
      if (req.query['page_size'] == 5) {
        req.reply({statusCode: 200, fixture: 'question1-d1-size5_v2.json' })
      } else {
        req.reply({statusCode: 400 }) // Developer has sent a wrong request!
      }
    })
  })

  it('issue8 - dashboard 2 page has correct amount of questions', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)
  })
})
