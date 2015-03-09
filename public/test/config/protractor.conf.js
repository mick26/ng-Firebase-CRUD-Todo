
/**
 * Protractor configuration file.
 */
exports.config = {

    //The address of a running selenium server.
    //Need to have selenium running, by entering the following console command:
    //web-manager start
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    //specs: ['test/e2e/checkTitle-spec.js'],

    //Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};