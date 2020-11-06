const router = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: 'Node.JS and Express'
        })
    });

    app.get('/login', (req, res) => {
        res.send({
            "id": req.query.id,
            "password": req.query.password
        })
    })

    app.get('/register', (req, res) => {
        res.send({
            "message": "YOU REGISTERED"
        })
    })

   /* app.post("/register", function (request, response) {
        if(!request.body) return response.sendStatus(400);
        console.log(request.body);
        response.send(`${request.body.userName} - ${request.body.userAge}`);
    });

    app.delete();

    app.update()*/

}

module.exports = router;