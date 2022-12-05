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
})