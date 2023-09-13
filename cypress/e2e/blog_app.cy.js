describe('Blog app', () => {
    const user = { name: 'iippa', username: 'ikulity', password: 'secret' }
    const testUser = { name: 'test_user', username: 'test_user', password: 'password' }
    beforeEach(() => {
        cy.request('POST', 'localhost:3003/api/testing/reset')

        cy.request('POST', 'localhost:3003/api/users', user)
        cy.request('POST', 'localhost:3003/api/users', testUser)

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
            cy.login(user)
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

        it('user can like a blog', () => {
            cy.createBlog({ title: 'title', author: 'cypress', url: 'cypress.com' })
            cy.contains('view').click()
            cy.contains('likes 0')
            cy.contains('like').click()
            cy.contains('likes 1')
        })

        it('user can delete a blog', () => {
            cy.createBlog({ title: 'title', author: 'cypress', url: 'cypress.com' })
            cy.contains('view').click()
            cy.contains('cypress.com')
            cy.contains('remove').click()
            cy.contains('remove').should('not.exist')
        })

        it('only the blog creator can see the delete button', () => {
            cy.createBlog({ title: 'title', author: 'cypress', url: 'cypress.com' })
            cy.contains('view').click()
            cy.contains('cypress.com')

            cy.contains('logout').click()

            cy.get('#username').type(testUser.name)
            cy.get('#password').type(testUser.password)
            cy.contains('login').click()

            cy.contains('test_user logged in')
            cy.contains('view').click()
            cy.contains('remove').should('not.exist')
        })
    })
})