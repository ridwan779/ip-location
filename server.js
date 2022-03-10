require('dotenv').config();
let express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/check-ip', function (req, res) {
    console.log('test1');
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(ip);
    res.json({
        ip: ip
    });
});

app.listen(process.env.APP_PORT, function () {
    console.log('Listening on port '+ process.env.APP_PORT)
});

module.exports = app;