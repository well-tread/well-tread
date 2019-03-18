const axios = require("axios");

module.exports = {
  getBtrails: (req, res) => {
    axios
      .get(
        "https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200430946-fc66551e94fef44057cb0cc88316bbec"
      )
      .then(result => res.send(result.data.trails))
      //   .then(function(response) {

      //     console.log(response.data.trails);
      //   })
      .catch(function(error) {
        console.log(error);
      });
  }
};
