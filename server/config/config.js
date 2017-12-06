var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'MyPics' },
        port: 5000,
        db: 'mongodb://127.0.0.1/mypics-dev',
        secret: "ImInDev"
    },
    test: {
        root: rootPath,
        app: { name: 'MyPics' },
        port: 4000,
        db: 'mongodb://127.0.0.1/mypics-test',
        secret: "IWasInDevButNowImInTest"
    },
    production: {
        root: rootPath,
        app: { name: 'MyPics' },
        port: 80,
        secret: "IWasInDevThenIWasInTestNowImInProd"
    },
};

module.exports = config[env];