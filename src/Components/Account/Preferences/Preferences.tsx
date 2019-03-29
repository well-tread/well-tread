import React, { Component } from 'react';
import firebase from '../../../firebase';
import { Redirect } from 'react-router-dom';

//materialUI imports
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) =>
  createStyles({
    dialog: {
      backgroundColor: '#f7f7f7',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center'
    },
    dialogContent: {
      overflow: 'hidden'
    },
    dialogActions: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '50vh'
    },
    textField: {},
    inputLabel: {
      textAlign: 'center',
      border: '1px solid #C4C4C4',
      padding: '5px 1px',
      borderRadius: 4
    },
    button: {
      fontWeight: 'bold',
      width: '30%',
      margin: '0px auto'
    },
    buttonDiv: {
      display: 'flex'
    }
  });

export interface Props {
  classes: {
    dialog: string;
    dialogContent: string;
    dialogActions: string;
    textField: string;
    inputLabel: string;
    button: string;
    buttonDiv: string;
  };
  preferencesIsOpen: boolean;
  displayName: string;
  zipCode: string;
  uid: string;
  togglePreferences: () => void;
  handleChange: (value: string, id: string) => void;
}

export interface State {
  confirmChangesIsVisible: boolean;
  isRedirecting: boolean;
}

class Preferences extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmChangesIsVisible: false,
      isRedirecting: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { confirmChangesIsVisible } = this.state;
    if (
      prevProps.displayName !== '' &&
      (prevProps.zipCode !== this.props.zipCode ||
        prevProps.displayName !== this.props.displayName) &&
      !confirmChangesIsVisible
    ) {
      this.setState({ confirmChangesIsVisible: true });
    }
  }

  logout() {
    firebase.auth().signOut();
    this.setState({ isRedirecting: true });
  }

  uploadProfilePicture(e: any) {
    const { uid, handleChange } = this.props;
    let file = e.target.files[0];
    let fileType = file.type;
    if (fileType.indexOf('image/') !== -1) {
      firebase
        .storage()
        .ref(`users/${uid}/profilePicture`)
        .put(file)
        .then(() => {
          firebase
            .storage()
            .ref(`users/${uid}/profilePicture`)
            .getDownloadURL()
            .then(url => {
              firebase
                .database()
                .ref(`users/${uid}/profilePicture`)
                .set({
                  profilePicture: url
                });

              handleChange(url, 'profilePicture');
            });
        });
    }
  }

  confirmChanges(e: any) {
    e.preventDefault();
    const { displayName, zipCode, uid } = this.props;
    firebase
      .database()
      .ref(`users/${uid}/displayName`)
      .set({
        displayName: displayName
      });
    firebase
      .database()
      .ref(`users/${uid}/zipCode`)
      .set({
        zipCode: zipCode
      });
    this.setState({ confirmChangesIsVisible: false });
  }

  render() {
    const { confirmChangesIsVisible, isRedirecting } = this.state;
    const {
      classes,
      preferencesIsOpen,
      togglePreferences,
      displayName,
      zipCode,
      handleChange
    } = this.props;

    return (
      <Dialog open={preferencesIsOpen}>
        <div className={classes.dialog}>
          <DialogTitle>
            <Typography color='primary' component='h5' variant='h5'>
              User Preferences
            </Typography>
          </DialogTitle>

          <DialogContent className={classes.dialogContent}>
            <Typography color='primary' component='p'>
              Update your profile picture, display name, and home zip here.
            </Typography>
          </DialogContent>

          <DialogActions>
            <form
              className={classes.dialogActions}
              onSubmit={e => this.confirmChanges(e)}
            >
              <InputLabel className={classes.inputLabel}>
                Upload Profile Picture
                <Input
                  disableUnderline
                  fullWidth
                  type='file'
                  onChange={e => this.uploadProfilePicture(e)}
                />
              </InputLabel>

              <TextField
                required={true}
                className={classes.textField}
                onChange={e => handleChange(e.target.value, 'displayName')}
                fullWidth
                variant='outlined'
                placeholder='Display Name'
                label='Display Name'
                value={displayName}
              />

              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => this.logout()}
              >
                Logout
              </Button>
              <div className={classes.buttonDiv}>
                <Button
                  color='secondary'
                  variant='contained'
                  className={classes.button}
                  onClick={() => togglePreferences()}
                >
                  Close
                </Button>
                {confirmChangesIsVisible ? (
                  <Button
                    type='submit'
                    color='secondary'
                    variant='contained'
                    className={classes.button}
                  >
                    Confirm Changes
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            </form>
          </DialogActions>
        </div>
        {isRedirecting ? <Redirect to='/' /> : <div />}
      </Dialog>
    );
  }
}

export default withStyles(styles)(Preferences);
