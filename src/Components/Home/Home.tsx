import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
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
import { updateTopHiking } from '../../ducks/reducer';

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

export interface Props {
  topBiking:any,
  topHiking:any,
  topRunning:any
}

export interface State {
  popularBikingTrails: any;
  popularHikingTrails: any;
  popularRunningTrails: any;
  hikingArr: any;
  bikingArr: any;
  runningArr: any;
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
      runningArr: [],
      isResultsBack: false,
      latitude: 0,
      longitude: 0
    };
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
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    // }
    console.log(this.props.topBiking, 'Initial topBiking results')
    this.setState({
      popularBikingTrails:this.props.topBiking,
      popularHikingTrails:this.props.topHiking,
      popularRunningTrails:this.props.topRunning
    })
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    
    if(prevProps.topBiking !== this.props.topBiking){
      this.setState({
        popularBikingTrails:this.props.topBiking
      })
    }

    if(prevProps.topHiking !== this.props.topHiking){
      this.setState({
        popularHikingTrails:this.props.topHiking
      })
    }

    if(prevProps.topRunning !== this.props.topRunning){
      this.setState({
        popularRunningTrails:this.props.topRunning
      })
    }

  }



  render() {
    const {
      isResultsBack,
      hikingArr,
      bikingArr,
      runningArr,
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
              runningArr={[]}
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
              runningArr={[]}
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
              runningArr={popularRunningTrails}
            />
          ) : (
            <CircularProgress color='secondary' />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps =(state:any) => {
  return{
    topHiking:state.topHiking,
    topBiking:state.topBiking,
    topRunning:state.topRunning
  }
}

export default connect(mapStateToProps)(Home);
