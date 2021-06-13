const request = require("request");
const chalk = require("chalk");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaG9tZWdvb2RzIiwiYSI6ImNrcDJvc2FhbDBqaHMydXRmbDRxaGU3bWcifQ.h4aMEdRqVRZmcs3L9jEq8g&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(chalk.red.bold.inverse("Unable to connect to local service!"), undefined);
    } else if (!body.features.length) {
      callback(chalk.red.bold.inverse("Unable to find loaction! Please try to change the location."), undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9d61a14ad40b4bd64a492e1fc2038ff6&query= ${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(chalk.red.bold.inverse("Unable to connect to service!"), undefined);
    } else if (body.error) {
      callback(chalk.red.bold.inverse("Unable to find location!"), undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        address: body.location.name,
        region: body.location.region,
        country: body.location.country
      });
    }
  });
};

module.exports = { geocode, forecast };
