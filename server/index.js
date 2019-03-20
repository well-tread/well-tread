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
app.post("/trails/biking", bikeCtrl.postBtrails);
app.post("/trails/bikingOne", bikeCtrl.getOneBtrail);

//hiking
app.get("/trails/hiking", hikeCtrl.getHtrails);
app.post("/trails/hiking", hikeCtrl.postHtrails);
app.post("/trails/hikingOne", hikeCtrl.getOneHtrail);

//climbing
app.get("/trails/climbing", climbCtrl.getCtrails);
app.post("/trails/climbing", climbCtrl.postCtrails);
app.post("/trails/climbingOne", climbCtrl.getOneCtrail);

//shredding
app.get("/trails/shredding", shredCtrl.getStrails);

app.listen(5050, () => console.log(`listening on port ${5050}`));
