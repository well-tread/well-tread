import React, { Component } from 'react';
import Preferences from './Preferences/Preferences';
import ConversionDialog from './ConversionDialog/ConversionDialog';
import MapMarker from './MapMarker/MapMarker';
import GoogleMapReact from 'google-map-react';
import firebase from '../../firebase';
import ReactExifImg from 'react-exif-orientation-img';
import Result from '../Search/TrailResults/Result/Result';
import googleMapKey from '../../googleMapKey';

import { connect } from 'react-redux';

//materialUI imports
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionWalk from '@material-ui/icons/DirectionsWalk';
import DirectionBike from '@material-ui/icons/DirectionsBike';
import DirectionRun from '@material-ui/icons/DirectionsRun';
import { Redirect } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#F7F7F7',
      paddingBottom: theme.spacing.unit * 6
    },
    expansionPanels: {},
    expansionPanel: {
      backgroundColor: '#F7F7F7',
      width: '90%',
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: '80%'
        // margin: 'auto'
      },
      [theme.breakpoints.up('md')]: {
        width: '75%'
        // margin: 'auto'
      },
      [theme.breakpoints.up('lg')]: {
        width: '60%'
      }
    },
    userBar: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    iconButton: {
      // width: 100,
      // height: 110,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    avatar: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 100,
      height: 100,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(20),
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none',
      textAlign: 'center',
      // Handle non-square image. The property isn't supported by IE 11.
      objectFit: 'cover'
    },
    mapDiv: {
      height: '60vh',
      width: '90vw',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing.unit * 2,
      border: '2px solid #757575',
      [theme.breakpoints.up('sm')]: {
        width: '80vw'
      },
      [theme.breakpoints.up('md')]: {
        width: '75vw'
      },
      [theme.breakpoints.up('lg')]: {
        width: '60vw'
      }
    },
    expansionPanelDetails: {
      display: 'flex',
      flexDirection: 'column'
    },
    registerBtn: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: '80%'
      },
      [theme.breakpoints.up('md')]: {
        width: '75%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '60%'
      }
    }
  });

export interface Props {
  classes: {
    paper: string;
    expansionPanels: string;
    expansionPanel: string;
    userBar: string;
    avatar: string;
    iconButton: string;
    mapDiv: string;
    expansionPanelDetails: string;
    registerBtn: string;
  };
  uid: string;
  profilePicture: string;
  displayName: string;
  favorites: any;
  completes: any;
  isAnonymous: boolean;
}

export interface State {
  profilePicture: string;
  displayName: string;
  zipCode: string;
  uid: string;
  preferencesIsOpen: boolean;
  isLoading: boolean;
  isAnonymous: boolean;
  isBadgeHidden: boolean;
  isConversionDialogOpen: boolean;
  favorites: { id: number; trailtype: string; trail: any }[];
  completes: { id: number; trailtype: string; trail: any }[];
  isRedirecting: boolean;
}

class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profilePicture: '',
      displayName: '',
      zipCode: '',
      uid: '',
      favorites: [],
      completes: [],
      preferencesIsOpen: false,
      isLoading: true,
      isAnonymous: true,
      isBadgeHidden: true,
      isConversionDialogOpen: false,
      isRedirecting: false
    };
    this.togglePreferences = this.togglePreferences.bind(this);
    this.toggleConversionDialog = this.toggleConversionDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      profilePicture: this.props.profilePicture,
      displayName: this.props.displayName,
      uid: this.props.uid,
      isBadgeHidden: true,
      isAnonymous: this.props.isAnonymous,
      favorites: this.props.favorites,
      completes: this.props.completes
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { zipCode, isBadgeHidden } = this.state;
    if (zipCode && !isBadgeHidden) {
      this.setState({ isBadgeHidden: true });
    }
    if (prevProps !== this.props) {
      this.setState({
        profilePicture: this.props.profilePicture,
        displayName: this.props.displayName,
        uid: this.props.uid,
        isBadgeHidden: true,
        isAnonymous: this.props.isAnonymous,
        favorites: this.props.favorites,
        completes: this.props.completes
      });
    }
  }
  logout() {
    firebase.auth().signOut();
    this.setState({
      isRedirecting: true
    });
  }

  togglePreferences() {
    const { preferencesIsOpen } = this.state;
    this.setState({ preferencesIsOpen: !preferencesIsOpen });
  }

  toggleConversionDialog() {
    const { isConversionDialogOpen } = this.state;
    this.setState({ isConversionDialogOpen: !isConversionDialogOpen });
  }

  addToCompletes(index: number) {
    const { favorites, completes, uid } = this.state;
    completes.push(favorites[index]);
    favorites.splice(index, 1);
    firebase
      .database()
      .ref(`users/${uid}/favorites`)
      .set({
        favorites: favorites
      });
    firebase
      .database()
      .ref(`users/${uid}/completes`)
      .set({
        completes: completes
      });
    this.setState({ favorites, completes });
  }

  removeFromCompletes(index: number) {
    const { completes, uid } = this.state;
    completes.splice(index, 1);
    firebase
      .database()
      .ref(`users/${uid}/completes`)
      .set({
        completes: completes
      });
    this.setState({ completes });
  }

  removeFromFavorites(index: number) {
    const { favorites, uid } = this.state;
    favorites.splice(index, 1);
    firebase
      .database()
      .ref(`users/${uid}/favorites`)
      .set({
        favorites: favorites
      });
    this.setState({ favorites });
  }

  handleChange(value: string, id: string) {
    this.setState(() => {
      if (value.length > 0 && id === 'zipCode') {
        return { ...this.state, isBadgeHidden: true, [id]: value };
      }
      return { ...this.state, [id]: value };
    });
  }

  render() {
    const { classes } = this.props;
    const {
      preferencesIsOpen,
      displayName,
      zipCode,
      uid,
      isBadgeHidden,
      isAnonymous,
      isConversionDialogOpen,
      profilePicture,
      favorites,
      completes,
      isRedirecting
    } = this.state;
    return (
      <Paper className={classes.paper}>
        {isAnonymous ? (
          <div>
            <Button
              variant='outlined'
              className={classes.registerBtn}
              color='secondary'
              onClick={() => this.toggleConversionDialog()}
            >
              Register to save your trail information
            </Button>{' '}
            <Button
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>{' '}
          </div>
        ) : (
          <div className={classes.userBar}>
            <IconButton
              className={classes.iconButton}
              onClick={() => this.togglePreferences()}
            >
              <Badge color='secondary' variant='dot' invisible={isBadgeHidden}>
                <ReactExifImg src={profilePicture} className={classes.avatar} />
              </Badge>
            </IconButton>
            <Typography color='primary' component='p' variant='h4'>
              {displayName}
            </Typography>
          </div>
        )}

        <div className={classes.mapDiv}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: googleMapKey.key
            }}
            defaultCenter={{ lat: 39.8333333, lng: -98.585522 }}
            defaultZoom={4}
            options={{ mapTypeId: 'terrain' }}
          >
            {favorites.map((val, i) => {
              return (
                <MapMarker
                  key={i}
                  trailtype={val.trailtype}
                  trail={val.trail[0]}
                  lat={val.trail[0].latitude}
                  lng={val.trail[0].longitude}
                  favorite={true}
                />
              );
            })}

            {completes.map((val, i) => {
              return (
                <MapMarker
                  key={i}
                  trailtype={val.trailtype}
                  trail={val.trail[0]}
                  lat={val.trail[0].latitude}
                  lng={val.trail[0].longitude}
                  favorite={false}
                />
              );
            })}
          </GoogleMapReact>
        </div>

        <div className={classes.expansionPanels}>
          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon color='secondary' />}
            >
              <Typography color='primary'>Favorited Trails</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {favorites.length > 0 ? (
                favorites.map((val, i) => {
                  let icon = <DirectionWalk />;
                  switch (val.trailtype) {
                    case 'hiking':
                      icon = <DirectionWalk />;
                      break;
                    case 'biking':
                      icon = <DirectionBike />;
                      break;
                    case 'running':
                      icon = <DirectionRun />;
                      break;
                  }
                  return (
                    <div key={i}>
                      <Button
                        color='secondary'
                        onClick={() => this.removeFromFavorites(i)}
                      >
                        Remove
                      </Button>
                      <Button
                        color='secondary'
                        onClick={() => this.addToCompletes(i)}
                      >
                        Mark Complete
                      </Button>

                      <Result
                        icon={icon}
                        type={val.trailtype}
                        trail={val.trail[0]}
                      />
                    </div>
                  );
                })
              ) : (
                <Typography color='primary'>
                  You haven't favorited any trails yet!
                </Typography>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon color='secondary' />}
            >
              <Typography color='primary'>Completed Trails</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {completes.length > 0 ? (
                completes.map((val, i) => {
                  let icon = <DirectionWalk />;
                  switch (val.trailtype) {
                    case 'hiking':
                      icon = <DirectionWalk />;
                      break;
                    case 'biking':
                      icon = <DirectionBike />;
                      break;
                    case 'running':
                      icon = <DirectionRun />;
                      break;
                  }
                  return (
                    <div key={i}>
                      <Button
                        color='secondary'
                        onClick={() => this.removeFromCompletes(i)}
                      >
                        Remove
                      </Button>
                      <Result
                        icon={icon}
                        type={val.trailtype}
                        trail={val.trail[0]}
                      />
                    </div>
                  );
                })
              ) : (
                <Typography color='primary'>
                  You haven't marked any trails as complete yet!
                </Typography>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Preferences
            displayName={displayName}
            zipCode={zipCode}
            uid={uid}
            preferencesIsOpen={preferencesIsOpen}
            togglePreferences={this.togglePreferences}
            handleChange={this.handleChange}
          />

          <ConversionDialog
            isConversionDialogOpen={isConversionDialogOpen}
            toggleConversionDialog={this.toggleConversionDialog}
          />
        </div>
        {isRedirecting ? <Redirect to='/' /> : <div />}
      </Paper>
    );
  }
}

export const mapStateToProps = (state: any) => {
  return {
    uid: state.uid,
    profilePicture: state.profilePicture,
    displayName: state.displayName,
    favorites: state.favorites,
    completes: state.completes,
    isAnonymous: state.isAnonymous
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Account));
