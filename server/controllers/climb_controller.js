const axios = require("axios");

module.exports = {
  getCtrails: (req, res) => {
    axios
      .get(
        "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=200433049-e4cde3f7e98d856dd46b6f3ad4b8091f"
      )
      .then(result => res.send(result.data.routes))
      //   .then(function(response) {
      //     console.log(response.data.routes);
      //   })
      .catch(function(error) {
        console.log(error);
      });
  }
};
