import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';

Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) =>
  cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, {
          type: fileType,
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        return cy.wrap(subject).trigger('change', { force: true });
      });
  }),
);

Cypress.Commands.add('getRandomID', () => Math.ceil(Math.random() * 20));
