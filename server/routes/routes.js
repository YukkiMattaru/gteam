module.exports = function (app, db) {
    app.get('/users', (req, res) => {
        db.db('depression').collection('users').find().toArray((err, result) => {
            if (err) res.send(err)
            else res.send(result)
        })
    })
    app.post('/users', (req, res) => {
        const myDB = db.db('depression');
        myDB.collection('users').findOne({userName: req.body.userName})
            .then(result => {
                if (result) {
                    res.send('Такой пользователь уже есть')
                } else {
                    db.db('depression').collection('users').find()
                        .sort({_id: -1}).limit(1)
                        .toArray().then(result => {
                        if (req.body.userName && req.body.hashPassword && req.body.userType) {
                            const user = {
                                _id: result[0]._id + 1,
                                userName: req.body.userName,
                                hashPassword: req.body.hashPassword,
                                userType: req.body.userType
                            };
                            myDB.collection('users').insertOne(user)
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
                    })
                }
            })
            .catch(error => res.send(error))
    })
    app.delete('/users', (req, res) => {
        db.db('depression').collection('users').deleteOne({userName: req.body.userName})
            .then(result => {
                res.send(result.result)
            })
            .catch(error => {
                res.send(error);
            })
    })

    app.get('/', (req, res) => {
        res.send({
            "message": "/"
        });
    })
    app.get('/me', (req, res) => {
        let payload = {
            "userName": req.query.userName
        }
        const myDB = db.db('depression');
        myDB.collection('users').findOne(payload)
            .then(item => {
                item ?
                    res.send({
                        "resultCode": 0,
                        "item": {
                            "userID": item._id,
                            "userName": item.userName,
                            "userType": item.userType
                        }
                    })
                    : res.send({
                    "resultCode": -1,
                    "message": "Такого пользователя нет в базе"
                });
            })
            .catch(err => {
                res.send({
                    "resultCode": -2,
                    "error": "Произошла непредвиденная ошибка"})
            })
    })
};