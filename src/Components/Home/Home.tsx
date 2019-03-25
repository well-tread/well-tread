import React, { Component } from 'react';
import axios from 'axios';
// import TrailResults from './TrailResults/TrailResults';
import TrailResults from '../Search/TrailResults/TrailResults';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  withStyles,
  Theme,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import Weather from './Weather/Weather';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#757575'
    },
    secondary: {
      main: '#FF5722'
    }
  },
  typography: {
    useNextVariants: true,
  },
});

export interface Props {}

export interface State {
  popularBikingTrails: any;
  popularHikingTrails: any;
  popularRunningTrails: any;
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
      popularRunningTrails: [],
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
    // axios.post('/trails/weatherP', {
    //   lat: lat,
    //   lng: lng
    // });
    axios
      .post('/trails/getPopularBTrails', {
        lat: lat,
        lng: lng
      })

      .then(res => {
        const response = res.data;
        
        this.setState({
          popularBikingTrails: response
        });
      });
    axios
      .post('/trails/getPopularHTrails', {
        lat: lat,
        lng: lng
      })

      .then(res => {
        const response = res.data;
        
        this.setState({
          popularHikingTrails: response
        });
      });
      axios
      .post('/trails/getPopularRTrails', {
        lat: lat,
        lng: lng
      })

      .then(res => {
        const response = res.data;
        
        this.setState({
          popularRunningTrails: response
        });
      });

    
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
  }

  render() {
    const {
      isResultsBack,
      hikingArr,
      bikingArr,
      climbingArr,
      popularBikingTrails,
      popularHikingTrails,
      popularRunningTrails
    } = this.state;
    
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div>
            
            <Weather />
            <Typography variant='h5' color='primary' id='popular'>
              Top 5 Biking Trails Near You
            </Typography>
          </div>
          {this.state.popularBikingTrails.length > 0 ? (
            <TrailResults
              // popularBikingTrails={popularBikingTrails}
              // popularHikingTrails={[]}
              hikingArr={[]}
              bikingArr={popularBikingTrails}
              climbingArr={[]}
            />
          ) : (
            <CircularProgress color='secondary' />
          )}
          <Typography variant='h5' color='primary' id='popular'>
            Top 5 Hiking Trails Near You
          </Typography>
          {this.state.popularHikingTrails.length > 0 ? (
            <TrailResults
              // popularBikingTrails={[]}
              hikingArr={popularHikingTrails}
              // popularHikingTrails={popularHikingTrails}
              bikingArr={[]}
              climbingArr={[]}
            />
          ) : (
            <CircularProgress color='secondary' />
          )}
          <Typography variant='h5' color='primary' id='popular'>
            Top 5 Running Trails Near You
          </Typography>
          {this.state.popularRunningTrails.length > 0 ? (
            <TrailResults
              // popularBikingTrails={[]}
              hikingArr={[]}
              // popularHikingTrails={popularHikingTrails}
              bikingArr={[]}
              climbingArr={popularRunningTrails}
            />
          ) : (
            <CircularProgress color='secondary' />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
