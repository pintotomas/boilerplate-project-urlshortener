require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;
var cors = require('cors');
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const validateUrl = require("./myApp.js").validateUrl;
const createAndSaveUrl = require("./myApp.js").createAndSaveUrl;
const handleCreateAndSaveUrl = require("./myApp.js").handleCreateAndSaveUrl;
app.route("/api/shorturl")
    .get(function(req, res) {
        //TO DO
})
    .post(function(req, res) {
        console.log(req.body);
        console.log(req.body.url);
        if (!validateUrl(req.body.url)) {
          res.json({"error": "Invalid URL"});
          return;
        }
        createAndSaveUrl(handleCreateAndSaveUrl , req.body.url, res);
        //console.log("Resulting of save is: " + result);
        // if (result) {
        //   res.json({"OK": "Valid saved URL"});
        // } else {
        //   res.json({"error": "Failed to save URL"})
        // }
    })



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
