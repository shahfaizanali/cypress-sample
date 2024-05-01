// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const cucumber = require('cypress-cucumber-preprocessor').default;
const postgresDB = require('../databases/postgres');
const mongoDB = require('../databases/mongo');
const neo4jDB = require('../databases/neo4j');
const FileUtils = require('../file-util');
const Utils = require('../utils');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    readFile: FileUtils.read,
  });

  on('task', {
    seedDB: postgresDB.seedDB,
  });

  on('task', {
    uploadToS3: Utils.uploadToS3,
  });

  on('task', {
    create: mongoDB.create,
  });

  on('task', {
    delete: mongoDB.delete,
  });

  on('task', {
    neo4jQuery: neo4jDB.runQuery,
  });

  on('before:browser:launch', (browser = {}, launchOptions) => {
    console.log(launchOptions); // print all current args

    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });
};
