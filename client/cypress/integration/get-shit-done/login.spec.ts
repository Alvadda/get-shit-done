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
        cy.fixture('login.json').then((login) => {
            cy.get('#email').type(login.userMail)
            cy.get('#password').type(login.wrongUserPassword)
            cy.get('.login-btn').click()
            cy.get('.login-btn').should('exist')
            cy.get('[data-testid=logout]').should('not.exist')
        })
    })

    it('check login', () => {
        cy.fixture('login.json').then((login) => {
            cy.get('#email').type(login.userMail)
            cy.get('#password').type(login.userPassword)
            cy.get('.login-btn').click()
            cy.get('.login-btn').should('not.exist')
            cy.get('[data-testid=logout]').should('exist')
        })
    })

    it('check logout', () => {
        cy.fixture('login.json').then((login) => {
            cy.get('#email').type(login.userMail)
            cy.get('#password').type(login.userPassword)
            cy.get('.login-btn').click()
            cy.get('.login-btn').should('not.exist')
            cy.get('[data-testid=logout]').should('exist')
            cy.get('[data-testid=logout]').click()
            cy.get('#email').should('exist')
            cy.get('#password').should('exist')
        })
    })
})
