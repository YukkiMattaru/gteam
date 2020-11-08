module.exports = function (app, db) {
    app.get('/counters', (req, res) => {
        debugger;
        db.db('depression').collection('counters').findOne({_id: req.query.serialNumber.toString()})
            .then(result => {
                if (!result)
                    res.send({
                        "resultCode": -1,
                        "body": {
                            "message": "такого счетчика нет"
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
    app.post('/counters', (req, res) => {
        const myDB = db.db('depression');
        myDB.collection('counters').findOne({_id: req.body.serialNumber})
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
                        myDB.collection('counters').insertOne(counter)
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
    app.delete('/counters', (req, res) => {
        db.db('depression').collection('counters').updateOne({_id: req.body.serialNumber, userID: req.body.userID},
            {
                $set: {active: 0}
            })
            .then(result => {
                res.send('all done')//"верните мою психику ...
            })
            .catch(error => {         //нашей смерти надо
                res.send('all not done');      // ee e e okay eeeee oh oh oh yeaaaah
            })
    })
    app.put('/counters', (req, res) => {
            const myDB = db.db('depression');
            myDB.collection('counters').findOne({_id: req.body.serialNumber})
                .then(result => {
                    console.log(result)
                    if (result) {
                        if (req.body.serialNumber && req.body.userID) {
                            db.db('depression').collection('counters').updateOne({
                                    _id: req.body.serialNumber,
                                    userID: req.body.userID
                                },
                                {
                                    $push: {
                                        value: {
                                            date: new Date(req.body.date),
                                            energy: {
                                                t1: req.body.t1, t2: req.body.t2, t3: req.body.t3, t4: req.body.t4
                                            }
                                        }
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