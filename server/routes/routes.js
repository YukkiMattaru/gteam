const router = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: 'Node.JS and Express'
        })
    });

    app.get('/auth', (req, res) => {
        res.send({
            username: req.query.username,
            password: req.query.password
        })
        console.log(req.query.username, req.query.password)
    })
}

module.exports = router;