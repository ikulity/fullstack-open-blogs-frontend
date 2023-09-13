Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'localhost:3003/api/login', { username, password })
        .then(({ body }) => {
            localStorage.setItem('token', body.token)
            localStorage.setItem('blogUsername', body.username)
            cy.visit('localhost:3000')
        })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        method: 'POST',
        url: 'localhost:3003/api/blogs',
        body: { title, author, url },
        headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` },
    })
    cy.visit('localhost:3000')
})