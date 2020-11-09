const uuid = require('uuid')

module.exports = function (app, db) {

    const database = db.db('depression').collection("users");

    app.post('/login', (req, res) => {
        database.findOne({userName: req.body.userName, hashPassword: req.body.hashPassword})
            .then(result => {
                if (!result) {
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Введены некорректные логин и/или пароль"
                        }
                    })
                } else {
                    const sessID = uuid.v4();
                    database.updateOne({
                            userName: req.body.userName,
                            hashPassword: req.body.hashPassword
                        },
                        {
                            $set: {sessID: sessID}
                        })
                        .then(result => {
                            if (result) {
                                res.cookie('sessID', sessID)
                                res.send({
                                    "resultCode": 0,
                                    "body": {
                                        "message": "Вы авторизованы"
                                    }
                                })
                            } else res.send({
                                "resultCode": -1,
                                "body": {
                                    "message": "Введены некорректный логин и/или пароль"
                                }
                            })
                        })
                        .catch(error => {
                            res.send({
                                "resultCode": -2,
                                "body": {
                                    "message": error || "Unexpected error"
                                }
                            });
                        })
                }
            })
            .catch(error => res.send(error))
    })

    app.get('/login', (req, res) => {
        if (req.cookies.sessID) {
            database.findOne({sessID: req.cookies.sessID})
                .then(result => {
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "item": {
                                "userName": result.userName,
                                "userType": result.userType
                            }
                        }
                    })
                })
                .catch()
        } else {
            res.send({
                "resultCode": -1,
                "body": {
                    "message": "You haven't authorized"
                }
            })
        }
    })

    app.delete('/login', (req, res) => {
        if (req.cookies.sessID) {
            database.updateOne({sessID: req.cookies.sessID},
                {$unset: {sessID: 1}}
            )
                .then(result => {
                    res.clearCookie('sessID')
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "message": "Вы вышли из системы"
                        }
                    })
                })
                .catch(error => {
                    res.clearCookie('sessID')
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Передан неверный идентификатор сессии"
                        }
                    })
                })
        }
        else {
            res.send({
                "resultCode": -1,
                "body": {
                    "message": "Пользователь не авторизован"
                }
            })
        }
    })
}