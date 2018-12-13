#!/usr/bin/env nodejs
var http = require('http');
var httpModule = require('./http-module.js');
http.createServer(httpModule.handleRequest).listen(8181, 'localhost');
