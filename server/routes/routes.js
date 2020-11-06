module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.get('/', (req, res) => {
        res.send({
            "message": "hello"
        })
        console.log('hey')
    })

    app.get('/login', (req, res) => {
        res.send({
            "message": 'hello'
        })
        console.log('hey hey')
    })
};