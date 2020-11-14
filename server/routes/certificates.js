let ObjectID = require('mongodb').ObjectID;
let toISOString = require('mongodb').ObjectID.toISOString;

module.exports = function (app, db) {

    const databaseCertificates = db.db('depression').collection('certificates');
    const databaseUsers = db.db('depression').collection('users');

    app.get('/certificates', (req, res) => {
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(user => {
                if (user) {
                    databaseCertificates.find(
                        {},
                        {users: {$slice: -1}}
                    ).toArray()
                        .then(result => {
                            const certificates = result.filter(item => {
                                if (item.users[item.users.length - 1].userID === user._id && (item.active)) {
                                    return item;
                                }
                            }).map(item => {
                                return {
                                    "_id": item._id,
                                    "userID": item.users[item.users.length - 1].userID,
                                    "date": item.users[item.users.length - 1].date,
                                    "active": item.active,
                                    "dateFrom": item.dateFrom
                                }
                            })
                            if (certificates.length) {
                                res.send({
                                    "resultCode": 0,
                                    "body": {
                                        "certificates": certificates
                                    }
                                })
                            } else {
                                res.send({
                                    "resultCode": -3,
                                    "body": {
                                        "message": "У данного пользователя нет сертификатов"
                                    }
                                })
                            }

                        })
                        .catch(error => {
                            res.send({
                                "resultCode": -1,
                                "body": {
                                    "message": error || "Unexpected error"
                                }
                            })
                        })
                } else {
                    res.send({
                        "resultCode": -2,
                        "body": {
                            "message": "Нет такого пользователя или сессия недействительна"
                        }
                    })
                }
            })
    });

    app.get('/certificates/:id', (req, res) => {
        databaseCertificates.findOne({_id: new ObjectID(req.params.id)})
            .then(async certificate => {
                if (certificate) {
                    let user = await databaseUsers.findOne({_id: certificate.users[certificate.users.length - 1].userID})
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "item": {
                                "_id": certificate._id,
                                "userName": user.userName,
                                "date": certificate.users[certificate.users.length - 1].date,
                                "active": certificate.active
                            }
                        }
                    })
                }
            })
            .catch(error => {
                res.send({
                    "resultCode": -1,
                    "body": {
                        "message": error || "Unexpected error"
                    }
                })
            })
    })

    app.delete('/certificates', (req, res) => {
        databaseUsers.findOne({sessID: req.cookies.sessID})
            .then(user => {
                if (user) {
                    databaseCertificates.findOne({_id: +req.query.id})
                        .then(certificate => {
                            if (certificate && certificate.users[certificate.users.length - 1].userID === user._id) {
                                databaseCertificates.updateOne({_id: certificate._id},
                                    {
                                        $set: {active: 0}
                                    })
                                    .then(result => {
                                        res.send({
                                            "resultCode": 0,
                                            "body": {
                                                "message": "Сертификат удален"
                                            }
                                        })
                                    })
                                    .catch(error => {
                                        res.send({
                                            "resultCode": -1,
                                            "body": {
                                                "message": error || "Unexpected error"
                                            }
                                        });
                                    })
                            } else {
                                res.send({
                                    "resultCode": -2,
                                    "body": {
                                        "message": "Сертификат не существует или у пользователя нет к нему доступа"
                                    }
                                })
                            }
                        })
                } else {
                    res.send({
                        "resultCode": -3,
                        "body": {
                            "message": "Такого пользователя не существует или сессия недействительна"
                        }
                    })
                }
            })
            .catch(error => {
                    res.send({
                        "resultCode": -4,
                        "body": {
                            "message": error || "Unexpected error"
                        }
                    })
                }
            )
    })

    app.put('/certificates', (req, res) => {
            databaseUsers.findOne({sessID: req.cookies.sessID})
                .then(user => {
                    if (user) {
                        let userID = user._id;
                        databaseCertificates.findOne({_id: new ObjectID(req.body.certificateID)})
                            .then(certificate => {
                                if (certificate) {
                                    if (certificate.users[certificate.users.length - 1].userID === userID
                                        && req.body.customerUserID && certificate.active) {
                                        databaseCertificates.updateOne({_id: certificate._id},
                                            {
                                                $push: {
                                                    users: {
                                                        userID: +req.body.customerUserID,
                                                        date: new Date().toISOString()
                                                    }
                                                }
                                            })
                                            .then(result => {
                                                res.send({
                                                    "resultCode": 0,
                                                    "body": {
                                                        "message": "Успешная сделка!!!"
                                                    }
                                                })
                                            })
                                            .catch(error => {
                                                res.send({
                                                    "resultCode": -1,
                                                    "body": {
                                                        "message": error || "Unexpected error"
                                                    }
                                                })
                                            })
                                    }
                                }
                            })
                            .catch(error => {
                                res.send({
                                    "resultCode": -1,
                                    "body": {
                                        "message": error || "Unexpected error"
                                    }
                                })
                            })
                    }
                })
        }
    )
};

/*app.post('/certificates', (req, res) => {
        databaseCertificates.findOne({_id: req.body.serialNumber})
            .then(result => {
                if (result) {
                    res.send('Такой сертификат уже есть')
                } else {

                    if (req.body.serialNumber && req.body.userID) {
                        const counter = {
                            _id: req.body.serialNumber,
                            userID: Number(req.body.userID),
                            active: 1
                        };
                        myDB.collection('certificates').insertOne(counter)
                            .then(result => {
                                res.send(result.ops[0])
                            })
                            .catch(error => {
                                res.send({
                                    'resultCode': -1,
                                    'message': error
                                })
                            })
                    } else {
                        res.send({
                            'resultCode': '-1',
                            'message': 'Переданы пустые значения'
                        })
                    }

                }
            })
            .catch(error => res.send(error))
    })*/