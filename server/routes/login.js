const uuid = require('uuid')

module.exports = function (app, db) {

    const database = db.db('depression').collection("users");
    const databaseUserInfo = db.db('depression').collection("userInfo");

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
                                res.cookie('sessID', sessID, {
                                    maxAge: 3600 * 24,
                                    secure: true
                                })
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
            .catch(error => res.send({
                "resultCode": -4,
                "body": {
                    "message": error || "Unexpected error from database"
                }
            }))
    })

    app.get('/login', (req, res) => {
        if (req.cookies.sessID) {
            database.findOne({sessID: req.cookies.sessID})
                .then(async user => {
                    let userInfo = await databaseUserInfo.findOne({userID: user._id});
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "userName": user.userName,
                            "userType": user.userType,
                            "userInfo": userInfo ? userInfo : null
                        }
                    })
                })
                .catch(error => {
                    res.send({
                        "resultCode": -2,
                        "body": {
                            "message": error || "Unexpected error from database"
                        }
                    })
                })
        } else {
            res.send({
                "resultCode": -1,
                "body": {
                    "message": "Вы не авторизованы"
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
        } else {
            res.send({
                "resultCode": -1,
                "body": {
                    "message": "Пользователь не авторизован"
                }
            })
        }
    })
}