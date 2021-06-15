var express = require('express');
var path = require('path');
var secure = require('express-force-https');
const RateLimit = require('express-rate-limit');
 
var app = express();

app.use(secure);

app.use(express.static(path.join(__dirname, 'public')));
 
const limiter = RateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 70 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: "public" });
});

module.exports = app;
