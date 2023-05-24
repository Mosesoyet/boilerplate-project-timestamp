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

let getDay = (day) => {
  switch(day) {
    case 1:
      return "Sun";
      break;
    case 2:
      return "Mon";
      break;
    case 3:
      return "Tue";
      break;
    case 4:
      return "Wed";
      break;
    case 5:
      return "Thus";
      break;
    case 6:
      return "Fri";
      break;
    case 7:
      return "Sat"
      break;
  }
  return day;
}

// Get month string

let getMonth = (month) => {
  switch(month) {
    case 1:
      return "Jan";
      break;
    case 2:
      return "Feb"
      break;
    case 3:
      return "Mar";
      break;
    case 4:
      return "Apr";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "Jun";
      break;
    case 7:
      return "July";
      break;
    case 8:
      return "Aug";
      break;
    case 9:
      return "Sept";
      break;
    case 10:
      return "Oct";
      break;
    case 11:
      return "Nov";
      break;
    case 12:
      return "Dec";
      break;
  }
  return month;
}

app.get('/api/:date', (req,res,next) => {
  req.date = req.params.date;
  next()
},(req,res) => {
  if(req.date === " ") {
    let dateNow = new Date().toString();
    res.json({"unix": dateNow})
  } else if(isNaN(req.date)) {
    res.json({ "error" : "Invalid Date"})
  } else {
    let d = new Date(req.date * 1000)
    let day = d.getDay();
    let dateN = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let hour = d.getHours()
    let mins = d.getMinutes()
    let sec = d.getSeconds()
    res.json({
      "unix" : req.date,
      "utc": /*`${getDay(day)}, ${dateN} ${getMonth(month)} ${year} ${hour}:${mins}:${sec} GMT`*/d.toUTCString()
    })
  }
})

// listen for requests :
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});