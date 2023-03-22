describe('post_answer', () => {

  it('issue20 - question page contains correct form header', () => {
    cy.server()
    cy.route('GET', '**/api/v1/dashboards/3/questions/2', 'fixture:question2.json')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.get('div[data-cy=formContainer]')
    .find('h4')
    .should('have.length', 1)

    cy.get('div[data-cy=formContainer]')
    .find('h4')
    .should('have.text', 'Adelante, responde a la pregunta')
  })

  it('issue20 - question page contains correct form DOM', () => {
    cy.server()
    cy.route('GET', '**/api/v1/dashboards/3/questions/2', 'fixture:question2.json')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('input[data-cy=newAnswerDescription]')
    .should('have.attr', 'placeholder', 'Texto de la respuesta')
    .type('Hola')

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('button[data-cy=postDataButton]')
    .should('have.text', 'Escribir respuesta')
  })

  it('issue20 - question page contains correct form CSS', () => {
    cy.server()
    cy.route('GET', '**/api/v1/dashboards/3/questions/2', 'fixture:question2.json')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.get('div[data-cy=formContainer]')
    .should('have.css', 'background-color', 'rgb(185, 200, 200)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px')
  })

  it('issue20 - question page form typing works OK', () => {
    cy.server()
    cy.route('GET', '**/api/v1/dashboards/3/questions/2', 'fixture:question2.json')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('input[data-cy=newAnswerDescription]')
    .type('Hola amigo')

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('input[data-cy=newAnswerDescription]')
    .should('have.value', 'Hola amigo')
  })

  it('issue20 - question page correctly prevents sending empty data', () => {
    cy.server()
    cy.route('GET', '**/api/v1/dashboards/3/questions/2', 'fixture:question2.json')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.intercept('POST', '**/api/v1/dashboards/3/questions/2/answers', (req) => {
      throw 'A POST has been made, but the we did not type a thing inside the form'
      /*++++++++++++*/
      req.reply({statusCode: 201, fixture: 'created.json'})
    })

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('button[data-cy=postDataButton]')
    .click()

    cy.wait(1000)
    // No 'throw' here? Alright, everything's good
  })

  it('issue20 - question page correctly sends POST data', () => {
    cy.server()
    cy.route('GET', '**/api/v1/dashboards/3/questions/2', 'fixture:question2.json')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.intercept('POST', '**/api/v1/dashboards/3/questions/2/answers', (req) => {
      const { body } = req
      if (
        body.hasOwnProperty("description") &&
        body.description === "Farewell"
      ) {
        req.alias = "correctPost"
      }
      // Don't modify the real backend
      // https://docs.cypress.io/api/commands/intercept#Controlling-the-response
      req.reply({statusCode: 201, fixture: 'created.json'})
    })

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('input[data-cy=newAnswerDescription]')
    .type('Farewell')

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('button[data-cy=postDataButton]')
    .click()

    cy.wait('@correctPost')
  })

  it('issue20 - question page correctly refreshes questions after POST', () => {
    cy.intercept('GET', '**/api/v1/dashboards/3/questions/2', {
      fixture: 'question2.json'
    }).as('questionRequested')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.intercept('POST', '**/api/v1/dashboards/3/questions/2/answers', (req) => {
      const { body } = req
      if (
        body.hasOwnProperty("description") &&
        body.description === "ESTA ES UNA RESPUESTA"
      ) {
        req.alias = "correctPost"
      }
      // Don't modify the real backend
      // https://docs.cypress.io/api/commands/intercept#Controlling-the-response
      req.reply({statusCode: 201, fixture: 'created.json'})
    })

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('input[data-cy=newAnswerDescription]')
    .type('ESTA ES UNA RESPUESTA')

    cy.get('div[data-cy=formContainer]')
    .find('form[data-cy=newAnswerForm]')
    .find('button[data-cy=postDataButton]')
    .click()

    cy.wait('@correctPost')
    cy.wait('@questionRequested')
  })

  it('issue20 - dashboard 3 page refreshes dashboards only ONCE initially', () => {
    cy.intercept('GET', '**/api/v1/dashboards/3/questions/2', {
      fixture: 'question2.json'
    }).as('questionRequested')
    cy.visit('http://localhost:3000/dashboards/3/questions/2')

    cy.wait(1000)
    cy.get('@questionRequested.all').should('have.length', 2) // React.StrictMode renders things twice
  })
})

