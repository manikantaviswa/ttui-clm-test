var users = require('./models/users');

module.exports = function (app) {

    app.get('/api/users', function (req, res) {
        return res.json(users.getUsers());
    });

    app.post('/api/users/add', function (req, res) {
        return res.json(users.addUser(req.body));
    });

    app.delete('/api/users/:userIndex', function (req, res) {
        return res.json(users.removeUser(req.params.userIndex));
    });

    // application -------------------------------------------------------------
    app.get('/ui', function (req, res) {
        res.sendFile(__dirname + '../public/index.html');
    });
};
