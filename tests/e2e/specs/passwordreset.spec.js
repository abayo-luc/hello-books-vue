import {
  resetPassword
} from '../mocks/responses';

describe('Password Reset Page', () => {
  it('should send confirmation email', () => {
    cy.visit('/users/password/reset', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(`${Cypress.env('VUE_APP_BACKEND_URL')}/users/password`)
          .as('resetResponse')
          .returns(resetPassword.success);
      }
    });
    cy.get('#reset-instructions').should('not.be.visible');
    cy.get('input[name="email"]').type('fake@example.com');
    cy.get('.default').contains('Send Reset Instructions');
    cy.get('#reset-form').submit();
    cy.get('#reset-form').should('not.be.visible');
    cy.get('#reset-instructions').should('be.visible');
    cy.get('.vue-notification-wrapper').should('be.visible');
    cy.get('.vue-notification-wrapper').children('.success');
    cy.get('.notification-content').contains(
      'Password reset instructions was sent successfully'
    );
  });
  it('should not send confirmation email on validation errors', () => {
    cy.visit('/users/password/reset');
    cy.get('#reset-instructions').should('not.be.visible');
    cy.get('.default').contains('Send Reset Instructions');
    cy.get('#reset-form').submit();
    cy.get('.vue-notification-wrapper').should('be.visible');
    cy.get('.vue-notification-wrapper').children('.error');
  });
  it('should not hide the form on backend error', () => {
    cy.visit('/users/password/reset', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(`${Cypress.env('VUE_APP_BACKEND_URL')}/users/password`)
          .as('resetResponse')
          .returns(resetPassword.failed);
      }
    });
    cy.get('#reset-instructions').should('not.be.visible');
    cy.get('input[name="email"]').type('fake@example.com');
    cy.get('.default').contains('Send Reset Instructions');
    cy.get('#reset-form').submit();
    cy.get('.vue-notification-wrapper').should('be.visible');
    cy.get('.vue-notification-wrapper').children('.error');
    cy.get('.notification-content').contains(
      'Email provided is not associated to any user account!'
    );
  });
  it('should let user navigate sign up', () => {
    cy.visit('/users/password/reset');
    cy.get('#auth-link').click();
    cy.location('pathname').should('eq', '/signup');
  });
});
