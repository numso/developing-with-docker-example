// --- Require Dependencies ----------------------------------------------------

var config = require('config');
var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var body = require('koa-body');
var r = require('rethinkdbdash')(config.db);

// --- Setup Koa ---------------------------------------------------------------

var app = koa();
app.use(serve('./client'));
app.use(body());
app.use(router(app));

// --- Setup Routes ------------------------------------------------------------

app.get('/books', checkDB, function* () {
  this.body = yield r.table(config.db.table).run();
});

app.post('/books', checkDB, function* () {
  this.body = yield r.table(config.db.table).insert(this.request.body).run();
});

app.del('/books/:id', checkDB, function* () {
  this.body = yield r.table(config.db.table).get(this.params.id).delete().run();
});

// --- Create Servers ----------------------------------------------------------

app.listen(config.port);
console.log('server listening on port ' + config.port);


function* checkDB(next) {
  yield r.dbCreate(config.db.db).run().catch(function () { return 'ok'; })
  yield r.tableCreate(config.db.table).run().then(function () {
    // table created for first time
    return r.table(config.db.table).insert([
      { title: 'Stung',               author: 'Bethany Wiggins'   },
      { title: 'Steelheart',          author: 'Brandon Sanderson' },
      { title: 'Ghosts in the Wires', author: 'Kevin Mitnick'     }
    ]).run();
  }).catch(function () { return 'ok'; });
  yield next;
}
