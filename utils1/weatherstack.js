const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config();

const weatherstack = (latitude, longitude, callback) => {
  const weatherstackURL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API}&query=${latitude},${longitude}&units=f`;
  request({ url: weatherstackURL, json: true }, (e, {body}) => {
    if (e) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const { region } = body.location;
      const { temperature, weather_descriptions } = body.current;
      callback(
        undefined,
        `In ${region}, the current temperature is ${temperature} degrees and ${weather_descriptions[0]}.`
      );
    }
  });
};

module.exports = weatherstack;
