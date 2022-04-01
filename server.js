require('dotenv').config();
let express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/check-ip', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    res.json({
        ip: ip
    });
});

app.listen(process.env.APP_PORT, function () {
    console.log('Listening on port '+ process.env.APP_PORT)
});

module.exports = app;