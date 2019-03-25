const axios = require('axios');
require('dotenv').config();
const { WEATHER_API_KEY, GOOGLE_API_KEY } = process.env;

module.exports = {
  getWeather: (req, res) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${req.body.lat}&lon=${req.body.lng}&APPID=${WEATHER_API_KEY}&units=imperial`
      )
      .then(result => res.send(result.data))

      .catch(function(error) {
        console.log('big err', error);
      });
  },
  postWeather: (req, res) => {
    let lat = 0;
    let lng = 0;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          req.body.address
        }&key=${GOOGLE_API_KEY}`
      )
      .then(response => {
        const location = response.data.results[0].geometry.location;
        lat = location.lat;
        lng = location.lng;
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=${WEATHER_API_KEY}&units=imperial`
          )
          .then(result => res.send(result.data))
          
          .catch(function(error) {
            console.log(error);
          });
        
      })
      .catch(err => console.log(err));
  }
};

