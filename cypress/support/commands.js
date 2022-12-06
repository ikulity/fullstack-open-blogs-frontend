Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'localhost:3003/api/login', { username, password })
        .then(({ body }) => {
            localStorage.setItem('token', body.token)
            localStorage.setItem('blogUsername', body.username)
            cy.visit('localhost:3000')
        })
})