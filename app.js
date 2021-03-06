var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');
var uglifyJs = require('uglify-js');
var fs = require('fs');
require('./app_api/models/db'); //подключение к базе данных

//var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
//var users = require('./app_server/routes/users');

var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');*/
var appClientFiles = ['app_client/app.js', 'app_client/home/home.controller.js', 'app_client/controllers/manager.controller.js', 'app_client/controllers/admin.controller.js', 'app_client/controllers/ban.controller.js', 'app_client/controllers/table.controller.js', 'app_client/controllers/list.controller.js', 'app_client/controllers/fullList.controller.js', 'app_client/common/services/bpData.service.js', 'app_client/common/services/bpManagers.service.js', 'app_client/common/services/addNewManager.service.js', 'app_client/common/filters/yesOrNo.filter.js', 'app_client/common/filters/timeDuration.filter.js', 'app_client/common/directives/deepIdentification.directive.js', 'app_client/common/directives/questioning.directive.js', 'app_client/common/directives/touristWishes.directive.js'];

var uglified = uglifyJs.minify(appClientFiles, {compress: true});
fs.writeFile('public/angular/bpvp.min.js', uglified.code, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('script generated and saved: bpvp.min.js');
    }
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', routes);
app.use('/api', routesApi);
app.use(function(req, res) {
    res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});
//app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;