module.exports = function (app, db) {
    app.get('/certificates', (req, res) => {
        debugger;
        db.db('depression').collection('certificates').find({sessID: req.cookies.sessID}).toArray((err, result) => {
            if (err) res.send(err)
            else res.send(result)
        })
            .then(result => {
                if (!result)
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "Счетчики отсутствуют"
                        }
                    })
                else {
                    res.send({
                        "resultCode": 0,
                        "body": {
                            "item": result
                        }
                    })
                }
            })
            .catch(error => {
                res.send({
                    "resultCode": -2,
                    "body": {
                        "message": error ? error : "unexpected error"
                    }
                })
            })

    })
    app.post('/certificates', (req, res) => {
        const myDB = db.db('depression');
        myDB.collection('certificates').findOne({_id: req.body.serialNumber})
            .then(result => {
                if (result) {
                    res.send('Такой счетчик уже есть')
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
    })
    app.delete('/certificates', (req, res) => {
        db.db('depression').collection('certificates').updateOne({_id: req.body.certificateID},
            {
                $set: {active: 0}
            })
            .then(result => {
                res.send('all done')
            })
            .catch(error => {
                res.send('all not done');
            })
    })
    app.put('/certificates', (req, res) => {
            const myDB = db.db('depression');
            myDB.collection('certificates').findOne({_id: req.body.certificateID})
                .then(result => {
                    console.log(result)
                    if (result) {
                        if (req.body.certificateID && req.body.userID
                            && result.userID[result.userID.length - 1] === req.body.userID && req.body.userID2
                            && result.active === 1
                        ) {
                            db.db('depression').collection('certificates').updateOne({
                                    _id: req.body.certificateID
                                },
                                {
                                    $push: {
                                        userID: req.body.userID2
                                    }
                                })
                                .then(result => {
                                    res.send(result)
                                })
                                .catch(error => {
                                    res.send(error)
                                })
                        }
                    } else {
                        res.send({
                            'resultCode': '-1',
                            'message': 'Нет счетчика'
                        })
                    }
                })
                .catch(error => res.send(error))
        }
    )
}
;