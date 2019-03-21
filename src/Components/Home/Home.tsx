import React, { Component } from 'react';
import axios from 'axios';
// import TrailResults from './TrailResults/TrailResults';
import TrailResults from '../Search/TrailResults/TrailResults'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  withStyles,
  Theme,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#757575'
    },
    secondary: {
      main: '#FF5722'
    }
  }
});

export interface Props {}

export interface State {
  popularBikingTrails: any;
  popularHikingTrails: any;
  hikingArr: any;
  bikingArr: any;
  climbingArr: any;
  isResultsBack: boolean;
  latitude: number;
  longitude: number;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      popularBikingTrails: [],
      popularHikingTrails: [],
      hikingArr: [],
      bikingArr: [],
      climbingArr: [],
      isResultsBack: false,
      latitude: 0,
      longitude: 0
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { hikingArr, bikingArr, climbingArr, isResultsBack } = this.state;
    if (
      !isResultsBack &&
      (hikingArr.length > 0 || bikingArr.length > 0 || climbingArr.length > 0)
    ) {
      console.log('updating');
      this.setState({ isResultsBack: true });
    }
  }
  displayLocationInfo = (position: any) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    axios
      .post('/trails/getPopularTrails', {
        lat: lat,
        lng: lng
      })
      //   .then(res => console.log('BIKE', res));
      .then(res => {
        const response = res.data;
        //console.log(response);
        this.setState({
          popularBikingTrails: response
        });
      });

    console.log(`longitude: ${lng} | latitude: ${lat}`);
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
    // axios
    //   .post('/trails/getPopularTrails', {
    //     lat: this.state.latitude,
    //     lng: this.state.longitude
    //   })
    //   .then(res => console.log('BIKE', res));
    //   .then(res => {
    //     const response = res.data;
    //     console.log(response);
    //     this.setState({
    //       popularBikingTrails: response.trails
    //     });
    //   });

    // axios
    //   .get(
    //     `https://www.mtbproject.com/data/get-trails?lat=${
    //       this.state.latitude
    //     }&lon=${
    //       this.state.longitude
    //     }&maxDistance=200&minStars=4&maxResults=5&key=200430946-fc66551e94fef44057cb0cc88316bbec`
    //   )
    //   .then(res => {
    //     const response = res.data;
    //     console.log(res.data.trails);
    //     this.setState({
    //       popularBikingTrails: response.trails
    //     });
    //   })

    //   .catch(function(error) {
    //     console.log(error);
    //   });
    axios
      .get(
        `https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=200&minStars=4&maxResults=5&key=200430946-fc66551e94fef44057cb0cc88316bbec`
      )
      .then(res => {
        const response = res.data;
        //console.log(res.data.trails);
        this.setState({
          popularHikingTrails: response.trails
        });
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const {
      isResultsBack,
      hikingArr,
      bikingArr,
      climbingArr,
      popularBikingTrails,
      popularHikingTrails
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div>
            <Typography variant='h5' color='primary' id='popular'>
              Top 5 Biking Trails Near You
            </Typography>
          </div>
          {this.state.popularBikingTrails.length > 0 ? <TrailResults
            // popularBikingTrails={popularBikingTrails}
            // popularHikingTrails={[]}
            hikingArr={[]}
            bikingArr={popularBikingTrails}
            climbingArr={[]}
          /> : <CircularProgress color='secondary'/>}
          <Typography variant='h5' color='primary' id='popular'>
            Top 5 Hiking Trails Near You
          </Typography>
          {this.state.popularHikingTrails.length > 0 ? <TrailResults
            // popularBikingTrails={[]}
            hikingArr={popularHikingTrails}
            // popularHikingTrails={popularHikingTrails}
            bikingArr={[]}
            climbingArr={[]}
          /> : <CircularProgress color='secondary'/>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
