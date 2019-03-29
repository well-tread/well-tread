import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import firebase, { emailConfig, googleConfig } from '../../firebase';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

//MaterialUI imports
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background:
        'url(https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/displayImages%2FLoginPageBackground.jpg?alt=media&token=7418d340-f063-46e4-8442-207b4a97e583)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    },
    textField: {
      width: '80%',
      margin: '4vh auto',
      backgroundColor: '#F7F7F7',
      borderRadius: 5
    },
    textFieldInput: {
      fontSize: '1.2em'
    },
    button: {
      // width:'60%',
      marginTop: theme.spacing.unit * 1,
      marginBottom: theme.spacing.unit * 1,
      fontSize: '1em',
      fontWeight: 'bold',
      backgroundColor: 'rgba(247, 247, 247, 0.1)',
      borderWidth: 3
    },
    typography: {
      margin: '4vh auto',
      fontWeight: 'bold'
    },
    title: {
      alignSelf: 'center',
      color: '#F7F7F7'
      // paddingTop: theme.spacing.unit * 10,
      // position:'absolute',
      // top:0
    },
    firebaseUI: {},
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      margin: '0 auto',
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: '70%'
      },
      [theme.breakpoints.up('md')]: {
        width: '55%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '40%'
      }
    }
  });

export interface Props {
  classes: {
    paper: string;
    textField: string;
    textFieldInput: string;
    button: string;
    typography: string;
    title: string;
    firebaseUI: string;
    loginContainer: string;
  };
  location: {
    search: string;
  };
  LinkButton: any;
}

export interface State {
  dialogIsOpen: boolean;
  anonymousLogin: boolean;
  isRedirecting: boolean;
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      anonymousLogin: false,
      isRedirecting: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isRedirecting: true });
      }
    });
    if (this.props.location.search === '?mode=select') {
      this.setState({ dialogIsOpen: true });
    }
  }

  toggleDialog() {
    const { dialogIsOpen } = this.state;
    this.setState({ dialogIsOpen: !dialogIsOpen });
  }

  signInAnonymously() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        this.setState({ anonymousLogin: true });
      });
  }

  render() {
    const { classes } = this.props;
    const { dialogIsOpen, anonymousLogin, isRedirecting } = this.state;

    return (
      <Paper className={classes.paper}>
        <Typography component='h2' variant='h2' className={classes.title}>
          Well Tread
        </Typography>
        <div className={classes.loginContainer}>
          <Button
            className={classes.button}
            color='secondary'
            variant='outlined'
            onClick={() => this.toggleDialog()}
          >
            Sign in / Register
          </Button>
          <Button
            className={classes.button}
            color='secondary'
            variant='outlined'
            onClick={() => this.signInAnonymously()}
          >
            Continue without account
          </Button>
        </div>

        <Dialog open={dialogIsOpen}>
          <FirebaseAuth
            className={classes.firebaseUI}
            uiConfig={emailConfig}
            firebaseAuth={firebase.auth()}
          />
          <Button
            className={classes.button}
            color='secondary'
            variant='outlined'
            onClick={() => this.toggleDialog()}
          >
            Close
          </Button>
        </Dialog>

        {anonymousLogin ? <Redirect to='/account' /> : <div />}
        {isRedirecting ? <Redirect to='/home' /> : <div />}
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);
