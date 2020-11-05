const router = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: 'Node.JS and Express'
        })
    });

    app.get('/login', (req, res) => {
        res.send({
            "id": req.query.id,
            "count": req.query.count
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