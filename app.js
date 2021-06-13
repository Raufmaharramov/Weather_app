const request = require("request");
const geocode = require("./utils/geocode");
const chalk = require("chalk");

const address = process.argv[2];

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
