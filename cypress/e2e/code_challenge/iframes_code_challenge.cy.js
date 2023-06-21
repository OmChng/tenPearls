const fs = require("fs");

describe("Code challenge for 10 pearls", () => {
  Cypress.on("uncaught:exception", () => false);

  /* The following test validates that we can navigate to the iFrame contained within 
  tutorialspoint.com/html/html_iframes.htm, click on about us and retrieve the url given afterwards. */
  it("Gets the URL of the page after clicking on about us", () => {
    cy.navigateToTutorialsPoint();
    cy.getIframeBody().find('a[href="/about/index.htm"]').click({ force: true });
    let iframeUrl = cy.getIframeBody().url();
    cy.log(iframeUrl);
  });

  /* The following test gets all the buttons and logs them using cy.log functionality */
  it("Gets a list of all the buttons inside the iFrame", () => {
    cy.navigateToTutorialsPoint();
    cy.getIframeBody()
      .find("button")
      .each(($element) => {
        cy.log($element);
      });
  });

  /* The following test gets all the inputs and logs them using cy.log functionality */
  it("Gets a list of all the text inputs inside the iFrame", () => {
    cy.navigateToTutorialsPoint();
    cy.getIframeBody()
      .find("input")
      .each(($element) => {
        cy.log($element);
      });
  });

  /* The following test follows a fow to create an account at tutorials point website */
  it("Creates an account for tutorialspoint", () => {
    // Data to be used.
    let email = createUniqueEmail(12);
    let name = "Testing Name";
    let phoneNumber = createUniquePhone();
    let password = "Testing1234";

    // Flow starts here.
    cy.navigateToTutorialsPoint();
    cy.getIframeBody().find("a.btn.btn-grey-border.mb-0").click({ force: true });
    cy.getIframeBody().find("a[class=ps-2]").click({ force: true });
    cy.getIframeBody().find("input[id=textRegName]").type(name, { force: true });
    cy.getIframeBody().find("input[id=phone]").type(phoneNumber, { force: true });
    cy.getIframeBody().find("input[id=textSRegEmail]").type(email, { force: true });
    cy.getIframeBody().find("input[id=user_password]").type(password, { force: true });
    cy.getIframeBody().find("button[id=signUpNew]").click({ force: true }); // This fails due to second step validation.

    cy.log("Email used for this test: " + email);
    cy.log("Name used for this test: " + name);
    cy.log("Phone used for this test: " + phoneNumber);
    cy.log("Password used for this test: " + password);
  });

  /* Create a unique email for creating an account at tutorialspoint website */
  function createUniqueEmail(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    result += "_test@gmail.com";
    return result;
  }

  /* Create a unique phone for creating an account at tutorialspoint website */
  function createUniquePhone() {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
});
