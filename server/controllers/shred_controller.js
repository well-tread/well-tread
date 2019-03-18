const axios = require("axios");

module.exports = {
  getStrails: (req, res) => {
    axios
      .get(
        "https://www.powderproject.com/data/get-trails-by-id?ids=7000143,7000493,7000538,7000172,7000266&key=200430946-fc66551e94fef44057cb0cc88316bbec"
      )
      .then(result => res.send(result.data.trails))
      //   .then(function(response) {
      //     console.log(response.data);
      //   })
      .catch(function(error) {
        console.log(error);
      });
  }
};
