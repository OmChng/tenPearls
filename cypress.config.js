const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
