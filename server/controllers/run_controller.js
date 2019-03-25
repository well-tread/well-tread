require('dotenv').config();
const axios = require('axios');
const { GOOGLE_API_KEY, HIKING_API_KEY } = process.env;

module.exports = {
  
  getPopularRtrails: (req, res) => {
    
    axios
      .get(
        `https://www.trailrunproject.com/data/get-trails?lat=${req.body.lat}&lon=${
          req.body.lng
        }&maxDistance=50&minStars=4&maxResults=5&key=${HIKING_API_KEY}`
      )
      .then(result => res.send(result.data.trails))
      .catch(function(error) {
        console.log(error);
      });
  },
  getOneRtrail: (req, res) => {
    axios
      .get(
        `https://www.trailrunproject.com/data/get-trails-by-id?ids=${
          req.body.id
        }&key=${HIKING_API_KEY }`
      )
      .then(result => res.send(result.data.trails))
      .catch(function(error) {
        console.log(error);
      });
  },
  postRtrails: (req, res) => {
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
            `https://www.trailrunproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${HIKING_API_KEY}`
          )
          .then(result => res.send(result.data.trails))
        .catch(error => {
            console.log(error)
          })
          
  })
}
}
//https://www.trailrunproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=YOUR_KEY_HERE