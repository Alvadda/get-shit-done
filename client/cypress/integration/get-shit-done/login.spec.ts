import { removeAuthToken, removeUserName } from '../../../src/utils/sessionStoreManager'

describe('login', () => {
    beforeEach(() => {
        cy.get('#email').should('exist')
        cy.get('#password').should('exist')
        cy.get('.login-btn').should('exist')
        cy.get('.register-btn').should('exist')
    })

    afterEach(() => {
        removeAuthToken()
        removeUserName()
    })

    it('check login false user', () => {
        cy.get('#email').type('hallo@gmx.de')
        cy.get('#password').type('123')
        cy.get('.login-btn').click()
        cy.get('.login-btn').should('exist')
        cy.get('[data-testid=logout]').should('not.exist')
    })

    it('check login', () => {
        cy.get('#email').type('test@user.de')
        cy.get('#password').type('123')
        cy.get('.login-btn').click()
        cy.get('.login-btn').should('not.exist')
        cy.get('[data-testid=logout]').should('exist')
    })

    it('check logout', () => {
        cy.get('#email').type('test@user.de')
        cy.get('#password').type('123')
        cy.get('.login-btn').click()
        cy.get('.login-btn').should('not.exist')
        cy.get('[data-testid=logout]').should('exist')
        cy.wait(1000)
        cy.get('[data-testid=logout]').click()
        cy.get('#email').should('exist')
        cy.get('#password').should('exist')
    })
})
