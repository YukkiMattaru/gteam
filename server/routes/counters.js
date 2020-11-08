/*
Регистрировать счетчик
Обновлять данные
Удалять счетчик
Брать данные из счетчика из базы
*/
module.exports = function(app, db) {
    app.post('/counters', (req, res) => {
        db.db('depression').collection('counters').findOne({_id: req.body.serialNumber})
            .then(result => {
                if (result) {
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Такой счетчик уже зарегистрирован в системе"
                        }
                    })
                }
            })
    })
}