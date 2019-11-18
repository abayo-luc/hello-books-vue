// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

/* eslint-disable import/no-extraneous-dependencies, global-require, arrow-body-style */
// const webpack = require('@cypress/webpack-preprocessor')
module.exports = (on, config) => {
  const {
    VUE_APP_BACKEND_URL = 'https://testing-hello-book.herokuapp.com/api/v1',
    VUE_APP_TOKEN_STORAGE_KEY = 'hello-@*%-127875-token',
    VUE_APP_UPLOAD_PRESET = 'hello',
    VUE_APP_CLOUD_NAME = 'come_one'
  } = process.env;
  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
    env: {
      VUE_APP_BACKEND_URL,
      VUE_APP_TOKEN_STORAGE_KEY,
      VUE_APP_UPLOAD_PRESET,
      VUE_APP_CLOUD_NAME
    }
  });
};
