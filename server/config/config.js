var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'MyPics' },
        port: 5000,
        db: 'mongodb://127.0.0.1/mypics-dev',
        "uploads": rootPath + "/public/uploads/",
        secret: "ImInDev"
    },
    test: {
        root: rootPath,
        app: { name: 'MyPics' },
        port: 4000,
        db: 'mongodb://127.0.0.1/mypics-test',
        "uploads": rootPath + "/public/uploads/",
        secret: "IWasInDevButNowImInTest"
    },
    production: {
        root: rootPath,
        app: { name: 'MyPics' },
        port: 80,
        db: 'mongodb://127.0.0.1/mypics-prod',
        "uploads": rootPath + "/public/uploads/",
        secret: "IWasInDevThenIWasInTestNowImInProd"
    },
};

module.exports = config[env];