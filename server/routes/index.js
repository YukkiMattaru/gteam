const users = require('./users');
const counters = require('./counters');
const login = require('./login')
const certificates = require('./certificates')
const tradearea = require('./tradearea');

module.exports = function(app, db) {
    users(app, db);
    counters(app, db);
    login(app, db);
    certificates(app, db);
    tradearea(app, db);
};