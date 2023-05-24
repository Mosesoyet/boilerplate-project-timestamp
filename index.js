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

app.get('/api/', (req,res,next) => {
  res.json({"unix": Date.now(), "utc": Date()})
})

app.get('/api/:date', (req,res,next) => {
  req.date = req.params.date
  next()
}, (req,res) => {
  if(/\d{5,}/.test(req.date)) {
    let dateInt = parseInt(req.date);
    res.json({"unix": dateInt, "utc": new Date(dateInt).toUTCString()})
  } else {
    let date = new Date(req.date)
    if(date.toString() === "Invalid Date") {
      res.json({"error": "Invalid Date"})
    } else {
      res.json({"unix": date.valueOf(), "utc": date.toUTCString()})
    }
  }
})

// listen for requests :
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});