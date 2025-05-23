// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

// A route to handle both Unix timestamps and ISO date strings
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let response = {};

  if (!date) {
    // Jika tidak ada parameter date, kirim waktu sekarang
    const currentDate = new Date();
    response.unix = currentDate.getTime();
    response.utc = currentDate.toUTCString();
    return res.json(response);
  }

  // Cek apakah input adalah angka (Unix timestamp)
  const unixDate = Number(date);
  if (!isNaN(unixDate)) {
    // Jika input adalah Unix timestamp
    response.unix = unixDate;
    response.utc = new Date(unixDate).toUTCString();
    return res.json(response);
  }

  // Cek apakah input adalah string ISO valid
  const isoDate = new Date(date);
  if (isoDate.toString() === 'Invalid Date') {
    // Jika input tidak valid, kirim error
    return res.json({ error: "Invalid Date" });
  }

  // Jika input adalah tanggal valid dalam format ISO
  response.unix = isoDate.getTime();
  response.utc = isoDate.toUTCString();
  return res.json(response);
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
