import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '30vw',
    margin: '.25em'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    // fontSize: 20
    marginTop: '3em'
  },
  deg: {
    fontSize: 25,
    padding: '.3em'
  },
  desc: {
    fontSize: 20
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  icon: {
    height: '5em',
    width: '5em',
    margin: '.5em'
  }
};

export interface Props {
  classes: any;
}

export interface State {
  city: string;
  weatherData: any;
  icon: string;
  description: string;
  weatherDataTomorrow: any;
  iconTomorrow: string;
  descriptionTomorrow: string;
  weatherDataNextDay: any;
  iconNextDay: string;
  descriptionNextDay: string;
  weatherMain: string;
  weatherMainTomorrow: string;
  weatherMainNextDay: string;
  weatherColor: string;
  weatherIconOne: string;
  latitude: number;
  longitude: number;
  dateToday: number;
  dateTomorrow: number;
  dateNextDay: number;
}

class Weather extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      city: 'city',
      weatherData: [],
      icon: '',
      description: '',
      weatherDataTomorrow: [],
      iconTomorrow: '',
      descriptionTomorrow: '',
      weatherDataNextDay: [],
      iconNextDay: '',
      descriptionNextDay: '',
      weatherMain: '',
      weatherMainTomorrow: '',
      weatherMainNextDay: '',
      weatherColor: '',
      weatherIconOne: '',
      latitude: 0,
      longitude: 0,
      dateToday: 0,
      dateTomorrow: 0,
      dateNextDay: 0
    };
  }
  displayLocationInfo = (position: any) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    axios
      .post('http://localhost:5050/trails/weather', {
        lat: lat,
        lng: lng
      })
      .then(res => {
        const response = res.data;

        this.setState({
          // temperature: response.main.temp,
          city: response.city.name,
          weatherData: response.list[4].main.temp,
          icon: response.list[4].weather[0].icon,
          description: response.list[4].weather[0].description,
          weatherMain: response.list[4].weather[0].main,
          weatherMainTomorrow: response.list[12].weather[0].main,
          weatherMainNextDay: response.list[20].weather[0].main,
          weatherDataTomorrow: response.list[12].main.temp,
          dateToday: response.list[4].dt,
          dateTomorrow: response.list[12].dt,
          dateNextDay: response.list[20].dt,
          iconTomorrow: response.list[12].weather[0].icon,
          descriptionTomorrow: response.list[12].weather[0].description,
          weatherDataNextDay: response.list[20].main.temp,
          iconNextDay: response.list[20].weather[0].icon,
          descriptionNextDay: response.list[20].weather[0].description
          // humidity: response.main.humidity,
          // description: response.weather[0].description,
          // error: ""
        });
        if (this.state.weatherMain === 'Clear') {
          this.setState({
            icon: '/icons/clear-day.svg'
          });
        } else if (
          this.state.weatherMain === 'Rain' ||
          this.state.weatherMain === 'Drizzle' ||
          this.state.weatherMain === 'Thunderstorm'
        ) {
          this.setState({
            icon: '/icons/rain.svg'
          });
        } else if (this.state.weatherMain === 'Clouds') {
          this.setState({
            icon: '/icons/cloudy.svg'
          });
        } else if (this.state.weatherMain === 'Snow') {
          this.setState({
            icon: '/icons/snow.svg'
          });
        } else {
          this.setState({
            icon: '/icons/wind.svg'
          });
        }
        if (this.state.weatherMainTomorrow === 'Clear') {
          this.setState({
            iconTomorrow: '/icons/clear-day.svg'
          });
        } else if (
          this.state.weatherMainTomorrow === 'Rain' ||
          this.state.weatherMainTomorrow === 'Drizzle' ||
          this.state.weatherMainTomorrow === 'Thunderstorm'
        ) {
          this.setState({
            iconTomorrow: '/icons/rain.svg'
          });
        } else if (this.state.weatherMainTomorrow === 'Clouds') {
          this.setState({
            iconTomorrow: '/icons/cloudy.svg'
          });
        } else if (this.state.weatherMainTomorrow === 'Snow') {
          this.setState({
            iconTomorrow: '/icons/snow.svg'
          });
        } else {
          this.setState({
            iconTomorrow: '/icons/wind.svg'
          });
        }
        if (this.state.weatherMainNextDay === 'Clear') {
          this.setState({
            iconNextDay: '/icons/clear-day.svg'
          });
        } else if (
          this.state.weatherMainNextDay === 'Rain' ||
          this.state.weatherMainNextDay === 'Drizzle' ||
          this.state.weatherMainNextDay === 'Thunderstorm'
        ) {
          this.setState({
            iconNextDay: '/icons/rain.svg'
          });
        } else if (this.state.weatherMainNextDay === 'Clouds') {
          this.setState({
            iconNextDay: '/icons/cloudy.svg'
          });
        } else if (this.state.weatherMainNextDay === 'Snow') {
          this.setState({
            iconNextDay: '/icons/snow.svg'
          });
        } else {
          this.setState({
            iconNextDay: '/icons/wind.svg'
          });
        }
      });
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo, () => {
        axios
          .post('http://localhost:5050/trails/weather', {
            lat: 40.014,
            lng: -105.27
          })
          .then(res => {
            const response = res.data;

            this.setState({
              // temperature: response.main.temp,
              city: response.city.name,
              weatherData: response.list[4].main.temp,
              icon: response.list[4].weather[0].icon,
              description: response.list[4].weather[0].description,
              weatherMain: response.list[4].weather[0].main,
              weatherMainTomorrow: response.list[12].weather[0].main,
              weatherMainNextDay: response.list[20].weather[0].main,
              weatherDataTomorrow: response.list[12].main.temp,
              dateToday: response.list[4].dt,
              dateTomorrow: response.list[12].dt,
              dateNextDay: response.list[20].dt,
              iconTomorrow: response.list[12].weather[0].icon,
              descriptionTomorrow: response.list[12].weather[0].description,
              weatherDataNextDay: response.list[20].main.temp,
              iconNextDay: response.list[20].weather[0].icon,
              descriptionNextDay: response.list[20].weather[0].description
              // humidity: response.main.humidity,
              // description: response.weather[0].description,
              // error: ""
            });
            if (this.state.weatherMain === 'Clear') {
              this.setState({
                icon: '/icons/clear-day.svg'
              });
            } else if (
              this.state.weatherMain === 'Rain' ||
              this.state.weatherMain === 'Drizzle' ||
              this.state.weatherMain === 'Thunderstorm'
            ) {
              this.setState({
                icon: '/icons/rain.svg'
              });
            } else if (this.state.weatherMain === 'Clouds') {
              this.setState({
                icon: '/icons/cloudy.svg'
              });
            } else if (this.state.weatherMain === 'Snow') {
              this.setState({
                icon: '/icons/snow.svg'
              });
            } else {
              this.setState({
                icon: '/icons/wind.svg'
              });
            }
            if (this.state.weatherMainTomorrow === 'Clear') {
              this.setState({
                iconTomorrow: '/icons/clear-day.svg'
              });
            } else if (
              this.state.weatherMainTomorrow === 'Rain' ||
              this.state.weatherMainTomorrow === 'Drizzle' ||
              this.state.weatherMainTomorrow === 'Thunderstorm'
            ) {
              this.setState({
                iconTomorrow: '/icons/rain.svg'
              });
            } else if (this.state.weatherMainTomorrow === 'Clouds') {
              this.setState({
                iconTomorrow: '/icons/cloudy.svg'
              });
            } else if (this.state.weatherMainTomorrow === 'Snow') {
              this.setState({
                iconTomorrow: '/icons/snow.svg'
              });
            } else {
              this.setState({
                iconTomorrow: '/icons/wind.svg'
              });
            }
            if (this.state.weatherMainNextDay === 'Clear') {
              this.setState({
                iconNextDay: '/icons/clear-day.svg'
              });
            } else if (
              this.state.weatherMainNextDay === 'Rain' ||
              this.state.weatherMainNextDay === 'Drizzle' ||
              this.state.weatherMainNextDay === 'Thunderstorm'
            ) {
              this.setState({
                iconNextDay: '/icons/rain.svg'
              });
            } else if (this.state.weatherMainNextDay === 'Clouds') {
              this.setState({
                iconNextDay: '/icons/cloudy.svg'
              });
            } else if (this.state.weatherMainNextDay === 'Snow') {
              this.setState({
                iconNextDay: '/icons/snow.svg'
              });
            } else {
              this.setState({
                iconNextDay: '/icons/wind.svg'
              });
            }
          });
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      weatherColor,
      weatherMain,
      weatherIconOne,
      icon,
      iconTomorrow,
      iconNextDay,
      dateToday,
      dateTomorrow,
      dateNextDay
    } = this.state;
    var Today = new Date(dateToday * 1000).toLocaleDateString('en-US', {
      weekday: 'long'
    });
    var Tomorrow = new Date(dateTomorrow * 1000).toLocaleDateString('en-US', {
      weekday: 'long'
    });
    var NextDay = new Date(dateNextDay * 1000).toLocaleDateString('en-US', {
      weekday: 'long'
    });

    return (
      <div>
        <Typography
          className={classes.title}
          variant='h5'
          color='primary'
          gutterBottom
        >
          {this.state.city} Weather Forecast
        </Typography>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.desc} color='primary'>
                {Today}
              </Typography>
              <img
                className={classes.icon}
                src={process.env.PUBLIC_URL + `${icon}`}
              />

              <Typography className={classes.deg} color='primary'>
                {Math.floor(this.state.weatherData)}º
              </Typography>
              <Typography className={classes.desc} color='primary'>
                {this.state.description}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.desc} color='primary'>
                {Tomorrow}
              </Typography>
              <img
                className={classes.icon}
                src={process.env.PUBLIC_URL + `${iconTomorrow}`}
              />

              <Typography className={classes.deg} color='primary'>
                {Math.floor(this.state.weatherDataTomorrow)}º
              </Typography>
              <Typography className={classes.desc} color='primary'>
                {this.state.descriptionTomorrow}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.desc} color='primary'>
                {NextDay}
              </Typography>
              <img
                className={classes.icon}
                src={process.env.PUBLIC_URL + `${iconNextDay}`}
              />

              <Typography className={classes.deg} color='primary'>
                {Math.floor(this.state.weatherDataNextDay)}º
              </Typography>
              <Typography className={classes.desc} color='primary'>
                {this.state.descriptionNextDay}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Weather);
