import { removeAuthToken, removeUserName } from '../../../src/utils/sessionStoreManager'

describe('login', () => {
    beforeEach(() => {
        cy.fixture('todo.json').then((todo) => {
            cy.get('#email').type(todo.userMail)
            cy.get('#password').type(todo.userPassword)
            cy.get('.login-btn').click()
        })
    })
    afterEach(() => {
        removeAuthToken()
        removeUserName()
    })

    it('check todos', () => {
        cy.fixture('todo.json').then((todo) => {
            cy.get('[data-testid=user-name]').contains('testUser')
            cy.get('[data-testid=todo-item]').should('have.length', 3)

            cy.get('[data-testid=add-todo-description]').type(todo.addTodoDescription1)
            cy.get('[data-testid=add-todo-button]').click()
            cy.get('[data-testid=todo-item]').should('have.length', 4)
            cy.get('.todo-list-container').contains(todo.addTodoDescription1)

            cy.get('[data-testid=add-todo-description]').clear()
            cy.get('[data-testid=add-todo-description]').type(todo.addTodoDescription2)
            cy.get('[data-testid=add-todo]').find('[data-testid=select]').select(todo.testProject1)
            cy.get('[data-testid=add-todo-button]').click()
            cy.get('[data-testid=project-container]').contains(todo.testProject1).click()
            cy.get('.todo-list-container').contains(todo.addTodoDescription2)
            cy.get('[data-testid=todo-item]').should('have.length', 4)

            cy.get('[data-testid=project-container]').contains(todo.inbox).click()
            cy.get('.todo-list-container > :nth-child(1)').find('[data-testid=select]').select(todo.testProject1)
            cy.get('[data-testid=todo-item]').should('have.length', 3)
            cy.get('[data-testid=project-container]').contains(todo.testProject1).click()
            cy.get('.todo-list-container').contains(todo.addTodoDescription1)
            cy.get('[data-testid=todo-item]').should('have.length', 5)

            cy.get('[data-testid=project-container]').contains(todo.inbox).click()
            cy.get('.todo-list-container > :nth-child(1)').find('[data-testid=checkbox]').click()
            cy.wait(700)
            cy.get('[data-testid=todo-item]').should('have.length', 2)

            cy.get('.todo-list-container > :nth-child(1)').find('[data-testid=todo-item-delete]').click()
            cy.get('[data-testid=todo-item]').should('have.length', 1)
        })
    })
})
