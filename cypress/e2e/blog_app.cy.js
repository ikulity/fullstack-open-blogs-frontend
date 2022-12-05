describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'localhost:3003/api/testing/reset')
        cy.visit('localhost:3000')
    })
    it('Login form is shown', () => {
        // ...
    })
})