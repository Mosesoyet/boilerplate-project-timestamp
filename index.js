// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// a function to get exact date string

// date regex
let utcRegex = /^\d{4}-\d{2}-\d{2}$/
let unixRegex = /^\d{13}$/

app.get('/api/:date', (req,res,next) => {
  req.date = req.params.date
  next()
},(req,res) => {
  if(req.date.match(utcRegex)) {
    let date = new Date(req.date);
    let unixDate = (date * 1000) / 1000;
    res.json({"unix": unixDate, "utc": date.toUTCString()})
  } else if(req.date.match(unixRegex)) {
    let date = new Date((req.date / 1000) * 1000);
    res.json({"unix": req.date, "utc": date.toUTCString()})
  } else if(!req.params.date) {
    let date = new Date();
    let unixDate = (date / 1000) * 1000;
    res.json({"unix": unixDate, "utc": date.toUTCString()})
  } else/* if(!utcRegex.test(req.date) || !unixRegex.test(req.date)) */{
    res.json({"error": "Invalid Date"})
  }
})

// listen for requests :
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});