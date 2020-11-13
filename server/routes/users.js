module.exports = function (app, db) {

    const myDB = db.db('depression').collection('users');
    const myDBCounters = db.db('depression').collection('counters');
    const myDBUserInfo = db.db('depression').collection('userInfo');

    app.get('/users', (req, res) => {
        myDB.find().toArray((err, result) => {
            if (err) res.send(err)
            else res.send(result)
        })
    })

    app.get('/usersInfo', (req, res) => {
        myDBUserInfo.find().toArray().then(resu => res.send(resu))
    })

    app.put('/users', (req, res) => {
        myDB.findOne({sessID: req.cookies.sessID})
            .then(async user => {
                if (user) {
                    myDBUserInfo.updateOne({userID: user._id},
                        {
                            $set: {
                                fullName: req.body.newUserInfo.fullName,
                                companyName: req.body.newUserInfo.companyName,
                                email: req.body.newUserInfo.email,
                                phone: req.body.newUserInfo.phone,
                                location: req.body.newUserInfo.location
                            }
                        })
                        .then(result => {
                            res.send({
                                "resultCode": 0,
                            })
                        })
                        .catch(error => {
                            res.send({
                                "resultCode": -2,
                                "body": {
                                    "message": error || "Unexpected error"
                                }
                            })
                        })
                } else {
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Такого пользователя не существует или сессия недействительна"
                        }
                    })
                }
            })
            .catch(error => {
                res.send({
                    "resultCode": -3,
                    "body": {
                        "message": error || "Unexpected error"
                    }
                })
            })
    })

    app.post('/users', (req, res) => {
        myDB.findOne({userName: req.body.userName})
            .then(result => {
                if (result) {
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Пользователь с таким именем уже зарегистрирован"
                        }
                    })
                } else {
                    myDB.find()
                        .sort({_id: -1}).limit(1)
                        .toArray().then(async result => {
                        if (req.body.userName && req.body.hashPassword && req.body.userType) {
                            const user = {
                                _id: result.length ? result[0]._id + 1 : 0,
                                userName: req.body.userName,
                                hashPassword: req.body.hashPassword,
                                userType: req.body.userType,
                                receivedCertificates: 0
                            };
                            const userInfo = {
                                userID: result.length ? result[0]._id + 1 : 0,
                                fullName: req.body.fullName,
                                companyName: req.body.companyName,
                                location: req.body.location,
                                phone: req.body.phone,
                                email: req.body.email
                            }
                            await myDBUserInfo.insertOne(userInfo);
                            myDB.insertOne(user)
                                .then(() => {
                                    res.send({
                                        "resultCode": 0,
                                        "body": {
                                            "item": "Вы успешно зарегистрированы в системе"
                                        }
                                    })
                                })
                                .catch(error => {
                                    res.send({
                                        'resultCode': -2,
                                        'message': error || "Unexpected error"
                                    })
                                })
                        } else {
                            res.send({
                                'resultCode': '-3',
                                'message': 'Для регистрации переданы некорректные значения'
                            })
                        }
                    })
                }
            })
            .catch(error => res.send({
                "resultCode": -4,
                "body": {
                    "message": error || "Unexpected error"
                }
            }))
    })
    /*
    app.get('/me', (req, res) => {
        myDB.findOne({userName: req.query.userName})
            .then(item => {
                item ?
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "userID": item._id,
                            "userName": item.userName,
                            "userType": item.userType
                        }
                    })
                    : res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Такого пользователя нет в базе"
                        }
                    });
            })
            .catch(err => {
                res.send({
                    "resultCode": -2,
                    "error": "Произошла непредвиденная ошибка"
                })
            })
    })*/
};