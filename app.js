const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require('https');
const ejs = require('ejs');





app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


var temprature ="";
var logourl = "";
var cityName = "";
var description = "";
var message="";


function weatherFinder(city)
{
  const apiKey = "45b8bb7fd80cc75d65e6d56ed991d131";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=metric" ;
  return url;
}



app.post("/", function(req , res)
{
   cityName  = req.body.city;
  https.get(weatherFinder(cityName), function(response)
  {
    if(response.statusCode == 200)
    {
    response.on("data", function(data)
    {
      message="";
      var weatherData = JSON.parse(data);
      temprature = weatherData.main.temp;
      description = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      logourl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.redirect("/");

    });}

    else {
      temprature ="";
      logourl = "";
      cityName = "";
      description ="";
      res.redirect("/");



    }

  });

});

app.get("/" , function(req , res)
{
  res.render('index' , { currentTemprature : temprature , imageaddress : logourl,city : cityName, weatherDescription:description,warning : message});
});

app.listen(3000 , function(req , res)
{
  console.log("Server Started");
});
