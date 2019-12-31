const express = require('express');
const app = express();
const ejs = require('ejs');
const request = require('request');
const bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set(express.static('public'));

router.route("/")
  .get(function(req, res) {
    res.render("index")
  }).post(function(req, res) {

    const APIkey = "47ec556034454d8caf815808190412";
    const ZIP = req.body.zipcode;
    const url = "http://api.weatherapi.com/v1/current.json?key=47ec556034454d8caf815808190412&q=kansas city";
    request(url, function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });

  })


module.exports = router;
