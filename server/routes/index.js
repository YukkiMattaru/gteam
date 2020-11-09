const users = require('./users');
const counters = require('./counters');
const login = require('./login')

module.exports = function(app, db) {
    users(app, db);
    counters(app, db);
    login(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};