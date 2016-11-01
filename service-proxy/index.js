var serviceUrls = require('../config/config').serviceUrls;
var proxy = require('node-service-proxy');

module.exports = require('express').Router()
    .put(serviceUrls.orders.create, function (req, res, next) {
        proxy(req, res, next, {
            host: 'localhost',
            port: 8002,
            path: serviceUrls.orders.create
        });
    })
;