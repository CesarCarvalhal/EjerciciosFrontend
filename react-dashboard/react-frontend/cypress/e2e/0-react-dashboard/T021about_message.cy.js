describe('about_message', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about')
  })

  it('issue21 - message has correct text', () => {
    cy.get('p[data-cy=paragraph378]')
    .contains('envidiable')
  })
})
