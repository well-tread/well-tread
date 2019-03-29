import React, { Component } from 'react';
import firebase from '../../../firebase';

//materialUI imports
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

const styles = (theme: Theme) =>
  createStyles({
    expansionPanelSummary: {
      backgroundColor: '#F7F7F7'
    },
    expansionPanelActions: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    expansionActionItem: {
      margin: 20
    }
  });

export interface Props {
  classes: {
    expansionPanelActions: string;
    expansionActionItem: string;
    expansionPanelSummary: string;
  };
  isConversionDialogOpen: boolean;
  toggleConversionDialog(): void;
}

export interface State {
  isSnackbarOpen: boolean;
  snackbarMessage: string;
  email: string;
  password: string;
}

class ConversionDialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: '',
      email: '',
      password: ''
    };
  }

  handleTextChange(value: string, id: string) {
    this.setState(() => {
      return { ...this.state, [id]: value };
    });
  }

  registerWithEmail() {
    const { email, password } = this.state;
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        let credential = firebase.auth.EmailAuthProvider.credential(
          email,
          password
        );
        user
          .linkAndRetrieveDataWithCredential(credential)
          .then((usercred: any) => {
            this.setState({
              isSnackbarOpen: true,
              snackbarMessage: 'Registration Successful!'
            });
          })
          .catch((err: any) => {
            this.setState({
              isSnackbarOpen: true,
              snackbarMessage: err.message
            });
          });
      }
    });
  }

  registerWithGoogle() {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        user
          .linkWithPopup(provider)
          .then((result: any) => {
            this.setState({
              isSnackbarOpen: true,
              snackbarMessage: 'Registration Successful!'
            });
          })
          .catch((err: any) => {
            this.setState({
              isSnackbarOpen: true,
              snackbarMessage: err.message
            });
          });
      }
    });
  }

  render() {
    const {
      isConversionDialogOpen,
      toggleConversionDialog,
      classes
    } = this.props;
    const { isSnackbarOpen, snackbarMessage } = this.state;
    return (
      <Dialog open={isConversionDialogOpen}>
        <DialogContent>
          <Button onClick={() => this.registerWithGoogle()}>
            Register With Google
          </Button>
          <ExpansionPanel>
            <ExpansionPanelSummary className={classes.expansionPanelSummary}>
              Register with Email
            </ExpansionPanelSummary>

            <ExpansionPanelActions className={classes.expansionPanelActions}>
              <TextField
                className={classes.expansionActionItem}
                fullWidth
                variant='outlined'
                placeholder='email'
                label='email'
                onChange={e => this.handleTextChange(e.target.value, 'email')}
              />
              <TextField
                className={classes.expansionActionItem}
                fullWidth
                variant='outlined'
                placeholder='password'
                label='password'
                type='password'
                onChange={e =>
                  this.handleTextChange(e.target.value, 'password')
                }
              />
              <Button
                fullWidth
                variant='outlined'
                color='secondary'
                onClick={() => this.registerWithEmail()}
              >
                Register
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </DialogContent>

        <DialogActions>
          <Button fullWidth onClick={() => toggleConversionDialog()}>
            Cancel
          </Button>
        </DialogActions>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={() => this.setState({ isSnackbarOpen: false })}
          open={isSnackbarOpen}
          autoHideDuration={4000}
          message={snackbarMessage}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConversionDialog);
