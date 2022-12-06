describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'localhost:3003/api/testing/reset')

        const user = { name: 'iippa', username: 'ikulity', password: 'secret' }
        cy.request('POST', 'localhost:3003/api/users', user)

        cy.visit('localhost:3000')
    })
    it('Login form is shown', () => {
        cy.contains('Log in to application')
        cy.contains('login')
    })

    describe('Login', () => {
        it('succeeds with correct credentials', () => {
            cy.get('#username').type('ikulity')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()

            cy.contains('logged in')
        })

        it('fails with wrong credentials', () => {
            cy.get('#username').type('ikulity')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            // red error box
            cy.get('.error').should('contain', 'wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'ikulity', password: 'secret' })
        })

        it('a blog can be created', () => {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('cypress.com')

            cy.get('#create-button').click()
            cy.contains('a blog created by cypress')
            cy.contains('view')
        })
    })
})