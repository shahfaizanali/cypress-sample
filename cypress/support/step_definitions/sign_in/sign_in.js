import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`the user is on new sign-in page`, () => {
  cy.visit('/users/sign_in/');
});

When(`the user clicks sign-in`, () => {
  cy.findByDisplayValue(/Sign in/i).click({ force: true });
});

Then(`the user must be redirected to home page`, () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
});

Given(
  'the user fills email as {string} and password as {string}',
  (email, password) => {
    cy.findByTestId('email')
      .type(email)
      .should('have.value', email);

    cy.findByTestId('password')
      .type(password)
      .should('have.value', password);
  },
);
