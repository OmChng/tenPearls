// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-iframe";

Cypress.Commands.add("getIframeBody", () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  cy.wait(1500);
  return cy
    .get("iframe[class=result]")
    .its("0.contentDocument.body")
    .find("iframe:first-of-type")
    .its("0.contentDocument.body")
    .should("not.be.empty");
});

Cypress.Commands.add("navigateToTutorialsPoint", () => {
  cy.intercept("POST", "/lst").as("prebid");
  cy.visit("http://www.tutorialspoint.com/html/html_iframes#");
  cy.wait("@prebid");
});
