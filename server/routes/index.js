const noteRoutes = require('./routes');
const sertificates=require('./seroutes');
module.exports = function(app, db) {
    noteRoutes(app, db);
    sertificates(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};