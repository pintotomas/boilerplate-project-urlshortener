require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const validUrl = require('valid-url');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.route("/api/shorturl")
    .get(function(req, res) {
        //TO DO
})
    .post(function(req, res) {
        console.log(req.body);
        console.log(req.body.url);
        if(!validUrl.isUri(req.body.url)) {
          res.json({"error": "Invalid URL"});
          return;
        }
        res.json({"OK": "Valid URL"});
    });

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
