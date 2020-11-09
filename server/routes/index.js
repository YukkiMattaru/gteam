const users = require('./users');
const counters = require('./counters');
const login = require('./login')
const certificates = require('./certificates')

module.exports = function(app, db) {
    users(app, db);
    counters(app, db);
    login(app, db);
    certificates(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};