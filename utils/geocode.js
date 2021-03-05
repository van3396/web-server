require("dotenv").config();
const request = require("postman-request");

const geocode = (address, callback) => {
  const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API}&limit=1`;

  request({ url: mapboxURL, json: true }, (e, { body }) => {
    if (e) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location.  Try another search", undefined);
    } else {
      const { place_name, center } = body.features[0];

      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
