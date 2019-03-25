require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { json } = require('body-parser');
const cors = require('cors');

//controllers
const bikeCtrl = require('./controllers/bike_controller');
const hikeCtrl = require('./controllers/hike_controller');
const climbCtrl = require('./controllers/climb_controller');
const runCtrl = require('./controllers/run_controller');
const shredCtrl = require('./controllers/shred_controller');
const weatherCtrl = require('./controllers/weather_controller');

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

//weather
app.post('/trails/weather', weatherCtrl.getWeather);
app.post('/trails/weatherP', weatherCtrl.postWeather);

//biking
app.get('/trails/biking', bikeCtrl.getBtrails);
app.post('/trails/biking', bikeCtrl.postBtrails);
app.post('/trails/bikingOne', bikeCtrl.getOneBtrail);
app.post('/trails/getPopularBTrails', bikeCtrl.getPopularBtrails);

//hiking
app.get('/trails/hiking', hikeCtrl.getHtrails);
app.post('/trails/hiking', hikeCtrl.postHtrails);
app.post('/trails/hikingOne', hikeCtrl.getOneHtrail);
app.post('/trails/getPopularHTrails', hikeCtrl.getPopularHtrails);

//climbing
app.get('/trails/climbing', climbCtrl.getCtrails);
app.post('/trails/climbing', climbCtrl.postCtrails);
app.post('/trails/climbingOne', climbCtrl.getOneCtrail);

//shredding
app.get('/trails/shredding', shredCtrl.getStrails);

//running
//app.get('/trails/biking', runCtrl.getBtrails);
app.post('/trails/running', runCtrl.postRtrails);
app.post('/trails/runningOne', runCtrl.getOneRtrail);
app.post('/trails/getPopularRTrails', runCtrl.getPopularRtrails);

app.listen(5050, () => console.log(`listening on port ${5050}`));
