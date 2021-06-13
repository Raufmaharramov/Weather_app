const request = require("request");
const geocode = require("./utils/geocode");
const chalk = require("chalk");

const address = process.argv[2];

// const url = "http://api.weatherstack.com/current?access_key=9d61a14ad40b4bd64a492e1fc2038ff6&query=40.7128,%20-74.0060&units=f";

// request({ url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.error) {
//     console.log("Unable to find location!");
//   } else {
//     console.log(`${response.body.current.weather_descriptions[0]}. It's currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degress out.`);
//   }
// });

// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaG9tZWdvb2RzIiwiYSI6ImNrcDJvc2FhbDBqaHMydXRmbDRxaGU3bWcifQ.h4aMEdRqVRZmcs3L9jEq8g&limit=1";

// request({ url: geocodeUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find location!");
//   } else {
//     console.log(`Longitude is ${response.body.features[0].center[0]} and latitude is ${response.body.features[0].center[1]}`);
//   }
// });
if (!address) {
  console.log(chalk.red.bold.inverse("Please provide a valid location!"));
} else {
  geocode.geocode(address, (error, { longitude, latitude }) => {
    if (error) {
      return console.log(error);
    }
    geocode.forecast(longitude, latitude, (error, { description, temperature, feelsLike, region, country, address }) => {
      if (error) {
        return console.log(error);
      }
      console.log({
        description,
        temperature,
        feelsLike,
        region,
        country,
        address
      });
    });
  });
}
