import React, { Component } from 'react';

import firebase from '../../../../firebase';
import {connect} from 'react-redux';
import {updateFavorites} from '../../../../ducks/reducer';
import TrailPage from '../../../TrailPage/TrailPage';
import './Result.css';

//materialUI imports
import {
  withStyles,
  Theme,
  createMuiTheme,
  createStyles,
  MuiThemeProvider
} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';

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
    useNextVariants: true
  }
});

const styles = (theme: Theme) =>
  createStyles({
    typographyTitle: {
      color: '#F7F7F7',
      textShadow: '1px 1px 4px black',
      fontSize: '1.3em'
    },
    typographyContent: {
      color: '#F7F7F7',
      textShadow: '1px 1px 4px black'
    },
    expansionPanel: {
      backgroundColor: ' rgba(65, 63, 63, 0.606)',
      backgroundSize: `cover`,
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
      paddingTop: 35,
      // opacity: 0.8,

      paddingBottom: 35,
      margin: 'auto',
      // width:'100vw',
      [theme.breakpoints.up('sm')]: {
        width: '70vw'
      },
      [theme.breakpoints.up('md')]: {
        width: '60vw'
      },
      [theme.breakpoints.up('lg')]: {
        width: '50vw'
      }
    },
    expansionPanelExpanded: {
      backgroundColor: ' rgba(65, 63, 63, 0.606)',
      backgroundSize: `cover`,
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
      paddingTop: 35,
      paddingBottom: 35,
      marginTop: 15,
      marginBottom: 15
    },
    expandMoreIcon: {
      width: 30,
      height: 30
    },
    exPanelSummary: {
      backgroundColor: 'white'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  });

export interface Props {
  trail: any;
  classes: {
    typographyTitle: string;
    typographyContent: string;
    expansionPanel: string;
    expansionPanelExpanded: string;
    expandMoreIcon: string;
    exPanelSummary: string;
    buttons: string;
  };
  icon: any;
  type: string;
  uid?: string;
  favorites?: { id: string; type: string; trail: any }[];
  updateFavorites(favorites:{ id: string; type: string; trail: any }[]):void
}

export interface State {
  isRedirecting: boolean;
  checked: boolean;
  isDialogOpen: boolean;
}

class Result extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isRedirecting: false,
      checked: false,
      isDialogOpen: false
    };
  }

  componentDidMount() {
    this.setState({ checked: true });
  }

  openDialog() {
    this.setState({ isDialogOpen: true });
  }

  addToFavorites() {
    // const { type, uid } = this.props;
    // let trail = [];
    // trail.push(this.props.trail);
    // let favorites: { id: number; trailtype: string; trail: any }[] = [];
    // if (this.props.favorites) {
    //   favorites = this.props.favorites;
    // }

    // favorites.push({ id: this.props.trail.id, trail: trail, trailtype: type });
    // firebase
    //   .database()
    //   .ref(`users/${uid}/favorites`)
    //   .set({
    //     favorites: favorites
    //   });
    let {trail, type, uid, favorites} = this.props;
    if(favorites){
      favorites.push({ id: trail.id, type: type, trail: [trail] });
      firebase
        .database()
        .ref(`users/${uid}/favorites`)
        .set({
          favorites: favorites
        });
      this.props.updateFavorites(favorites);
    }
    else{
      favorites=[];
      favorites.push({ id: trail.id, type: type, trail: [trail] });
      firebase
        .database()
        .ref(`users/${uid}/favorites`)
        .set({
          favorites: favorites
        });
      this.props.updateFavorites(favorites);
    }
    
  }

  scroll = (e: any) => {
    e.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { isRedirecting, isDialogOpen } = this.state;
    const { trail, classes, icon, type } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Zoom
            in={this.state.checked}
            style={{ transitionDelay: this.state.checked ? '500ms' : '0ms' }}
          >
            <ExpansionPanel
              className={classes.expansionPanel}
              style={{ backgroundImage: `url(${trail.imgMedium})` }}
              classes={{ expanded: classes.expansionPanelExpanded }}
              // onClick={(e)=>this.scroll(e)}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon
                    color='secondary'
                    className={classes.expandMoreIcon}
                  />
                }
              >
                <Typography className={classes.typographyTitle}>
                  {icon} {trail.name}
                </Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <Typography className={classes.typographyContent}>
                  {trail.summary}
                </Typography>
              </ExpansionPanelDetails>

              <ExpansionPanelActions className={classes.buttons}>
                <Button
                  style={{
                    fontSize: '.9em',
                    fontWeight: 'bold',
                    color: '#F7F7F7',
                    borderWidth: '2px',
                    borderColor: '#FF5722'
                  }}
                  color='secondary'
                  size='small'
                  variant='outlined'
                  onClick={() => this.openDialog()}
                >
                  Trail Page
                </Button>
                <Button
                  style={{
                    fontSize: '.9em',
                    fontWeight: 'bold',
                    color: '#F7F7F7',
                    borderWidth: '2px',
                    borderColor: '#FF5722'
                  }}
                  color='secondary'
                  size='small'
                  variant='outlined'
                  onClick={() => this.addToFavorites()}
                >
                  Favorite
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Zoom>
          {/* <div className='blurBetween'></div> */}
        </div>
        <TrailPage
          trail={trail}
          trailtype={type}
          isDialogOpen={isDialogOpen}
          closeDialog={() => this.setState({ isDialogOpen: false })}
        />
        {/* {
              isRedirecting ? <Redirect to={`/trails/${type}/${trail.id}`} /> : <div />
            } */}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    
  };
};

export default withStyles(styles)(connect(mapStateToProps, {updateFavorites})(Result));
