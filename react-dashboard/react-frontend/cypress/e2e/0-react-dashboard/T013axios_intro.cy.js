function approximatelyEquals(a, b) {
  // 1 second margin for the retrieval of timestamp according to the
  // test vs. what the page loads. I've found this to be enough
  return (a == b) || (a == b+1) || (a == b-1)
}

describe('axios_intro', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/examples')
  })

  it('issue13 - examples page div has correct header', () => {
    cy.get('div[data-cy=issue13div]')
    .find('h1')
    .should('have.text', 'Ejercicio 13')
  })

  it('issue13 - examples page timestamp checker has correct paragraph', () => {
    cy.get('div[data-cy=issue13div]')
    .find('div[data-cy=timestampChecker]')
    .find('p[data-cy=title]')
    .should('have.text', 'El timestamp de acuerdo al servidor de Akamai:')
  })

  it('issue13 - examples page timestamp checker has correct timestamp', () => {
    cy.request('http://time.akamai.com').then(response => {
      cy.wait(2000)
      cy.get('div[data-cy=issue13div]')
      .find('div[data-cy=timestampChecker]')
      .find('p[data-cy=timestamp]')
      .first()
      .then(($p) => {
        expect(approximatelyEquals(parseInt($p.text()), parseInt(response.body)))
      })
    })
  })
})
