var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var dbURI = 'mongodb://localhost/bpVP2';
var dbURI = 'mongodb://oksana:123456@ds129939.mlab.com:29939/turburo';

mongoose
    .connect(dbURI)
    .then(() => {
        console.log('MongoDb has started ...',dbURI)
    })
    .catch(e => console.log(e));

/*
 CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through' + msg);
        callback();
    })
}
*/

// BRING IN YOUR SCHEMAS & MODELS
require('./manager');
require('./country');
require('./tourist.model');