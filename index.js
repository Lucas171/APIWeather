const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.set(express.static("public"));

//routes
app
  .route("/")
  .get(function (req, res) {
    var date = new Date();
    var day = date.getDay();

    var weekday;
    switch (day) {
      case 0:
        weekday = "Sunday";
        break;
      case 1:
        weekday = "Monday";
        break;
      case 2:
        weekday = "Tuesday";
        break;
      case 3:
        weekday = "Wednesday";
        break;
      case 4:
        weekday = "Thursday";
        break;
      case 5:
        weekday = "Friday";
      case 6:
        weekday = "Saturday";
        break;
      default:
    }

    switch (date.getMonth()) {
      case 0:
        var month = "JAN";
        break;
      case 1:
        var month = "FEB";
        break;
      case 2:
        var month = "MAR";
        break;
      case 3:
        var month = "APR";
        break;
      case 4:
        var month = "MAY";
        break;
      case 5:
        var month = "JUN";
        break;
      case 6:
        var month = "JUL";
        break;
      case 7:
        var month = "AUG";
        break;
      case 8:
        var month = "SEP";
        break;
      case 9:
        var month = "OCT";
        break;
      case 10:
        var month = "NOV";
        break;
      case 11:
        var month = "DEC";
        break;

      default:
    }

    res.render("index", {
      date: date.getDate() + " " + month + " " + date.getFullYear(),
      day: weekday,
      degrees: "0",
      cityState: null,
      weatherType: "Enter a Zipcode or city",
      precipitation: null,
      humidity: null,
      wind: null,
      day1: null,
      day2: null,
      day3: null,
      day1Weather: 0,
      day2Weather: 0,
      day3Weather: 0,
      icon1: null,
      icon2: null,
      icon3: null,
    });
  })

  .post(function (req, res) {
    var date = new Date();
    var day = date.getDay();

    console.log(day);
    var weekday;
    switch (day) {
      case 0:
        weekday = "Sunday";
        break;
      case 1:
        weekday = "Monday";
        break;
      case 2:
        weekday = "Tuesday";
        break;
      case 3:
        weekday = "Wednesday";
        break;
      case 4:
        weekday = "Thursday";
        break;
      case 5:
        weekday = "Friday";
      case 6:
        weekday = "Saturday";
        break;
      default:
    }
    switch (day) {
      case 0:
        smallDay = "SUN";
        break;
      case 1:
        smallDay = "MON";
        break;
      case 2:
        smallDay = "TUE";
        break;
      case 3:
        smallDay = "WED";
        break;
      case 4:
        smallDay = "THU";
        break;
      case 5:
        smallDay = "FRI";
      case 6:
        smallDay = "SAT";
        break;
      default:
    }
    switch (day + 1) {
      case 0:
        smallDay2 = "SUN";
        break;
      case 1:
        smallDay2 = "MON";
        break;
      case 2:
        smallDay2 = "TUE";
        break;
      case 3:
        smallDay2 = "WED";
        break;
      case 4:
        smallDay2 = "THU";
        break;
      case 5:
        smallDay2 = "FRI";
      case 6:
        smallDay2 = "SAT";
        break;
      case 7:
        smallDay2 = "SUN";
        break;
      default:
    }
    switch (day + 2) {
      case 0:
        smallDay3 = "SUN";
        break;
      case 1:
        smallDay3 = "MON";
        break;
      case 2:
        smallDay3 = "TUE";
        break;
      case 3:
        smallDay3 = "WED";
        break;
      case 4:
        smallDay3 = "THU";
        break;
      case 5:
        smallDay3 = "FRI";
      case 6:
        smallDay3 = "SAT";
        break;
      case 7:
        smallDay3 = "SUN";
        break;
      case 8:
        smallDay3 = "MON";
        break;
      default:
    }
    switch (date.getMonth()) {
      case 0:
        var month = "JAN";
        break;
      case 1:
        var month = "FEB";
        break;
      case 2:
        var month = "MAR";
        break;
      case 3:
        var month = "APR";
        break;
      case 4:
        var month = "MAY";
        break;
      case 5:
        var month = "JUN";
        break;
      case 6:
        var month = "JUL";
        break;
      case 7:
        var month = "AUG";
        break;
      case 8:
        var month = "SEP";
        break;
      case 9:
        var month = "OCT";
        break;
      case 10:
        var month = "NOV";
        break;
      case 11:
        var month = "DEC";
        break;

      default:
    }
    const city = req.body.city;

    const APIkey = "3319c5ff8a6b41ac830191943200501";
    const ZIP = req.body.zipcode;
    const url =
      "http://api.weatherapi.com/v1/forecast.json?key=" +
      APIkey +
      "&q=" +
      city +
      "&days=3";
    request(url, function (error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      const apiResponse = JSON.parse(response.body);
      const apiResponse2 = JSON.parse(response.body);
      if (response && response.statusCode == 200) {
        res.render("index", {
          date: date.getDate() + " " + month + " " + date.getFullYear(),
          day: weekday,
          degrees: apiResponse.current.temp_f,
          cityState: apiResponse.location.name,
          weatherType: apiResponse.current.condition.text,
          precipitation: apiResponse.current.precip_in,
          humidity: apiResponse.current.humidity,
          wind: apiResponse.current.wind_mph,
          day1: smallDay,
          day2: smallDay2,
          day3: smallDay3,
          day1Weather: apiResponse2.forecast.forecastday[0].day.avgtemp_f,
          day2Weather: apiResponse2.forecast.forecastday[1].day.avgtemp_f,
          day3Weather: apiResponse2.forecast.forecastday[2].day.avgtemp_f,
          icon1: apiResponse2.forecast.forecastday[0].day.condition.icon,
          icon2: apiResponse2.forecast.forecastday[1].day.condition.icon,
          icon3: apiResponse2.forecast.forecastday[2].day.condition.icon,
        });
      } else {
        res.render("index", {
          date: date.getDate() + " " + month + " " + date.getFullYear(),
          day: weekday,
          degrees: "0",
          cityState: null,
          weatherType: "Invalid, Try Again",
          precipitation: null,
          humidity: null,
          wind: null,
          day1: null,
          day2: null,
          day3: null,
          day1Weather: 0,
          day2Weather: 0,
          day3Weather: 0,
          icon1: null,
          icon2: null,
          icon3: null,
        });
      }
    });
  });

//listening
app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});
