require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const cors = require("cors");

const bikeCtrl = require("./controllers/bike_controller");
const hikeCtrl = require("./controllers/hike_controller");
const climbCtrl = require("./controllers/climb_controller");
const shredCtrl = require("./controllers/shred_controller");

const app = express();
app.use(json());
app.use(cors());

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//biking
app.get("/trails/biking", bikeCtrl.getBtrails);
app.get("/trails/bikingOne", bikeCtrl.getOneBtrail);

//hiking
app.get("/trails/hiking", hikeCtrl.getHtrails);

//climbing
app.get("/trails/climbing", climbCtrl.getCtrails);

//shredding
app.get("/trails/shredding", shredCtrl.getStrails);

app.listen(5050, () => console.log(`listening on port ${5050}`));
