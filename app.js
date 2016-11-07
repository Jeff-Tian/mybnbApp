const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();
const util = require('util');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.use(favicon(path.join(__dirname, 'www', 'img/ionic.png')));
app.use(function (req, res, next) {
    const domain = require('domain').create();
    domain.on('error', function (err) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
    domain.run(next);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use(function (req, res, next) {
    res.locals.app = {
        version: require('./config/config').version
    };

    next();
});

app.get('/', function (req, res, next) {
    res.render('index.html');
});

app.get('/version', function (req, res, next) {
    res.json(res.locals.app.version);
});

app.use(express.static(path.join(__dirname, 'www'), {
    etag: true,
    lastModified: true,
    maxAge: 1000 * 3600 * 24 * 30,
    setHeaders: function (res, path) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));

app.use('/virtual-js/config.js', function (req, res, next) {
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8');

    var js = util.format('if (typeof angular !== "undefined") {\
            angular.module("clientConfigModule", [])\
                .value("config", {\
                    serviceUrls: %s\
                })\
            ;\
        }', JSON.stringify(require('./config/config').serviceUrls));

    res.send(js);
});

app.use(require('./service-proxy'));

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/www');

module.exports = app;