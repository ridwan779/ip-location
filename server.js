require('dotenv').config();
let express = require('express');
var app = express();

app.get('/check-ip', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(ip);
    res.json({
        ip: ip
    });
});

app.listen(process.env.APP_PORT, function () {
    console.log('Listening on port '+ process.env.APP_PORT)
});