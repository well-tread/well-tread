import React, { Component } from 'react';
import axios from 'axios';
import Quote from './Quote/Quote';
import TrailResults from './TrailResults/TrailResults';

//Material-UI Core Imports
import {
  createMuiTheme,
  createStyles,
  Theme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Material-UI Icon Imports
import DirectionWalk from '@material-ui/icons/DirectionsWalk';
import DirectionBike from '@material-ui/icons/DirectionsBike';
import DirectionRun from '@material-ui/icons/DirectionsRun';
import Terrain from '@material-ui/icons/Terrain';
import SearchIcon from '@material-ui/icons/Search';


const styles = (theme: Theme) =>
  createStyles({
    container: {
      // marginTop: '50px',
      // padding:'50px 0',
      // height: '500px',
      // display: 'flex',
      // alignItems:'center',
      // justifyContent:'center',
      width: '70%',
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: '50%'
      },
      [theme.breakpoints.up('md')]: {
        width: '45%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '30%'
      }
    },
    formGroup: {
      paddingBottom: theme.spacing.unit * 1.5,
      display: 'flex',
      justifyContent: 'space-between'
      // margin:'0 auto',
      // width:'100%'
    },
    button: {
      padding: '15px 0',
      width: '100%',
      margin: 'auto'
    },
    btnIcon: {
      marginLeft: theme.spacing.unit * 3
    },
    textField: {
      paddingBottom: theme.spacing.unit * 1.5,
      width: '100%'
    },
    quote: {
      paddingBottom: theme.spacing.unit * 1
    },
    formGroupContainer: {
      width: '100%'
    },
    checkboxIcon: {
      [theme.breakpoints.up('sm')]: {
        transform: 'scale(1.2)'
      },
      [theme.breakpoints.up('md')]: {
        transform: 'scale(1.3)'
      }
    }
  });

export interface Props {
  classes: {
    container: string;
    formGroup: string;
    btnIcon: any;
    textField: string;
    button: string;
    quote: string;
    formGroupContainer: string;
    checkboxIcon: string;
  };
}

export interface State {
  address: any;
  isHikingChecked: boolean;
  isBikingChecked: boolean;
  isRunningChecked: boolean;
  isResultsBack: boolean;
  hikingArr: any;
  bikingArr: any;
  runningArr: any;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: '',
      hikingArr: [],
      bikingArr: [],
      runningArr: [],
      isHikingChecked: false,
      isBikingChecked: false,
      isRunningChecked: false,
      isResultsBack: false
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { hikingArr, bikingArr, runningArr, isResultsBack } = this.state;
    if (
      !isResultsBack &&
      (hikingArr.length > 0 || bikingArr.length > 0 || runningArr.length > 0)
    ) {
      this.setState({ isResultsBack: true });
    }
  }

  handleChange = (e: any) => {
    this.setState({ address: e.target.value });
  };

  toggleCheckboxes = (value: any, id: string) => {
    this.setState(() => {
      return { ...this.state, [id]: !value };
    });
  };

  submitLocationSearch = () => {
    this.setState({ hikingArr: [], bikingArr: [], runningArr: [] }, () => {
      if (this.state.isHikingChecked) {
        axios
          .post(`/trails/hiking`, { address: this.state.address })
          .then(response => {
            this.setState({ hikingArr: response.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.state.isBikingChecked) {
        axios
          .post(`/trails/biking`, { address: this.state.address })
          .then(response => {
            this.setState({ bikingArr: response.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.state.isRunningChecked) {
        axios
          .post(`/trails/running`, { address: this.state.address })
          .then(response => {
            this.setState({ runningArr: response.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { isResultsBack, hikingArr, bikingArr, runningArr } = this.state;
    return (
        <div>
        <div className={classes.container}>
          <div>
            <TextField
              label='Enter a Location'
              value={this.state.address}
              onChange={e => this.handleChange(e)}
              name='address'
              className={classes.textField}
            />
            <FormGroup className={classes.formGroupContainer}>
              <div className={classes.formGroup}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <DirectionWalk
                          className={classes.checkboxIcon}
                          color='primary'
                        />
                      }
                      checkedIcon={
                        <DirectionWalk
                          className={classes.checkboxIcon}
                          color='secondary'
                        />
                      }
                      checked={this.state.isHikingChecked}
                      onChange={e =>
                        this.toggleCheckboxes(
                          this.state.isHikingChecked,
                          'isHikingChecked'
                        )
                      }
                    />
                  }
                  label='Hiking'
                  labelPlacement='bottom'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <DirectionBike
                          className={classes.checkboxIcon}
                          color='primary'
                        />
                      }
                      checkedIcon={
                        <DirectionBike
                          className={classes.checkboxIcon}
                          color='secondary'
                        />
                      }
                      checked={this.state.isBikingChecked}
                      onChange={e =>
                        this.toggleCheckboxes(
                          this.state.isBikingChecked,
                          'isBikingChecked'
                        )
                      }
                    />
                  }
                  label='Biking'
                  labelPlacement='bottom'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <DirectionRun
                          className={classes.checkboxIcon}
                          color='primary'
                        />
                      }
                      checkedIcon={
                        <DirectionRun
                          className={classes.checkboxIcon}
                          color='secondary'
                        />
                      }
                      checked={this.state.isRunningChecked}
                      onChange={e =>
                        this.toggleCheckboxes(
                          this.state.isRunningChecked,
                          'isRunningChecked'
                        )
                      }
                    />
                  }
                  label='Running'
                  labelPlacement='bottom'
                />
              </div>
              <Button
                color='secondary'
                variant='outlined'
                className={classes.button}
                onClick={() => this.submitLocationSearch()}
              >
                Search Trails
                <SearchIcon className={classes.btnIcon} />
              </Button>
            </FormGroup>
          </div>
        </div>
        {isResultsBack ? (
          <TrailResults
            hikingArr={hikingArr}
            bikingArr={bikingArr}
            runningArr={runningArr}
          />
        ) : (
          <Quote />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Search);
