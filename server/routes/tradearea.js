module.exports = function (app, db) {
    const databaseUsers = db.db('depression').collection('users');
    const databaseCertificates = db.db('depression').collection('certificates');
    const databaseTradearea = db.db('depression').collection('tradearea');

    app.get('/tradearea', (req, res) => { // получение всех сделок

    })

    app.get('/tradearea/:userID', (req, res) => { // получение сделок пользователя

    })

    app.post('/tradearea', (req, res) => { // создание сделки

    })

    app.put('/tradearea', (req, res) => { // завершение сделки

    })

    app.delete('/tradearea', (req, res) => { // удаление сделки

    })

}