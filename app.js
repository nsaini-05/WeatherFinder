const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require('https');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function weatherFinder(city)
{
  const apiKey = "45b8bb7fd80cc75d65e6d56ed991d131";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=metric" ;
  return url;
}



app.post("/", function(req , res)
{
  var cityName  = req.body.city;
  https.get(weatherFinder(cityName), function(response)
  {
    response.on("data", function(data)
    {
      var weatherData = JSON.parse(data);
      var icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temp is" +weatherData.main.temp +"</h1>");
      res.write("<img src ="+ imgUrl +">");


    });

  });

});

app.get("/" , function(req , res)
{
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000 , function(req , res)
{
  console.log("Server Started");
});
