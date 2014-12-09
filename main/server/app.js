// --- Require Dependencies ----------------------------------------------------

var config = require('config');
var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var request = require('request');
require('bluebird').promisifyAll(request);

// --- Setup Koa ---------------------------------------------------------------

var app = koa();
app.use(serve('./client'));
app.use(router(app));

// --- Setup Routes ------------------------------------------------------------

app.get('/books', function* () {
  this.body = yield request.getAsync(config.booksUrl + '/books').spread(function (resp, body) {
    return JSON.parse(body);
  });
});

// --- Create Servers ----------------------------------------------------------

app.listen(config.port);
console.log('server listening on port ' + config.port);
