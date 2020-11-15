module.exports = function (app, db) {
    const databaseUsers = db.db('depression').collection('users');
    const databaseCertificates = db.db('depression').collection('certificates');
    const databaseTradearea = db.db('depression').collection('tradearea');


    app.get('/tradearea', (req, res) => { // получение всех сделок
        databaseTradearea.find({}).toArray()
            .then(deals => {
                res.send({
                    "resultCode": 0,
                    "body": {
                        deals: deals.length ? deals : []
                    }
                })
            })
            .catch(error => res.send({
                "resultCode": -1,
                "body": {
                    "message": error || "Unexpected error from database"
                }
            }))
    })

    app.get('/tradearea/:userID', (req, res) => { // получение сделок пользователя

    })

    app.post('/tradearea', (req, res) => { // создание сделки
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(user => {
                if (user) {
                    databaseCertificates.findOne({_id: +req.body.id})
                        .then(certificate => {
                            if (certificate) {
                                databaseTradearea.find({}).sort({_id: -1}).limit(1).toArray()
                                    .then(lastDeal => {
                                        let date = new Date().toISOString()
                                        let deal = {
                                            _id: lastDeal.length ? +lastDeal[0]._id + 1 : 1,
                                            seller: +user._id,
                                            certificateID: +certificate._id,
                                            certificateDateFrom: certificate.dateFrom,
                                            createDate: date,
                                            status: +0
                                        }
                                        databaseTradearea.insertOne(deal)
                                            .then(() => {
                                                databaseCertificates.updateOne({_id: +certificate._id},
                                                    {
                                                        $set: {
                                                            toSell: 1
                                                        }
                                                    })
                                                    .then(() => {
                                                        res.send({
                                                            "resultCode": 0,
                                                        })
                                                    })
                                                    .catch(error => res.send({
                                                        "resultCode": -2,
                                                        "body": {
                                                            "message": error || "Unexpected error from database"
                                                        }
                                                    }))
                                            })
                                            .catch(error => res.send({
                                                "resultCode": -2,
                                                "body": {
                                                    "message": error || "Unexpected error from database"
                                                }
                                            }))
                                    })
                                    .catch(error => res.send({
                                        "resultCode": -2,
                                        "body": {
                                            "message": error || "Unexpected error from database"
                                        }
                                    }))
                            } else {
                                res.send({
                                    "resultCode": -3,
                                    "body": {
                                        "message": "У пользователя нет такого сертификата или его не существует"
                                    }
                                })
                            }
                        })
                        .catch(error => res.send({
                            "resultCode": -2,
                            "body": {
                                "message": error || "Unexpected error from database"
                            }
                        }))
                } else res.send({
                    "resultCode": -1,
                    "body": {
                        "message": "Такого пользователя нет или сессия недействительна"
                    }
                })
            })
            .catch(error => res.send({
                "resultCode": -2,
                "body": {
                    "message": error || "Unexpected error from database"
                }
            }))
    })

    app.put('/tradearea', (req, res) => { // завершение сделки

    })

    app.delete('/tradearea', (req, res) => { // удаление сделки
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(user => {
                if (user) {
                    databaseTradearea.deleteOne({certificateID: +req.query.id})
                        .then(() => {
                            databaseCertificates.updateOne({_id: +req.query.id}, {
                                $set: {
                                    toSell: 0
                                }
                            }).then(() => res.send({
                                "resultCode": 0,
                            })).catch(error => res.send({
                                "resultCode": -2,
                                "body": {
                                    "message": error || "Unexpected error from database"
                                }
                            }))
                        })
                        .catch(error => res.send({
                            "resultCode": -2,
                            "body": {
                                "message": error || "Unexpected error from database"
                            }
                        }))
                } else res.send({
                    "resultCode": -1,
                    "body": {
                        "message": "Такого пользователя нет или сессия недействительна"
                    }
                })
            })
            .catch(error => res.send({
                "resultCode": -2,
                "body": {
                    "message": error || "Unexpected error from database"
                }
            }))
    })

}