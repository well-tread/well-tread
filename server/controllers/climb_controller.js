const axios = require("axios");
require("dotenv").config();
const {GOOGLE_API_KEY, CLIMBING_API_KEY} = process.env

module.exports = {
  getCtrails: (req, res) => {
    axios
      .get(
        `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=200433049-e4cde3f7e98d856dd46b6f3ad4b8091f`
      )
      .then(result => res.send(result.data.routes))
      //   .then(function(response) {
      //     console.log(response.data.routes);
      //   })
      .catch(function(error) {
        console.log(error);
      });
  },
  postCtrails: (req, res) => {
    let lat = 0
    let lng = 0
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${GOOGLE_API_KEY}`
      ).then(response=>{
        console.log(response)
        const location = response.data.results[0].geometry.location
        lat = location.lat
        lng = location.lng
        axios
          .get(
            `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lng}&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=${CLIMBING_API_KEY}`
          )
          .then(result => res.send(result.data.routes))
          //   .then(function(response) {
          //     console.log(response.data.trails);
          //   })
          .catch(function(error) {
            console.log(error);
          });
        // console.log(response.data.results[0].geometry.location)
      }).catch(err=>console.log(err))
  }
};
