const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: '../cucumber-json/combined.json',
  output: '../cucumber-json/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'Test Environment': 'latest',
  },
};

reporter.generate(options);
