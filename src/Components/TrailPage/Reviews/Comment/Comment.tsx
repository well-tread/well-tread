import React, { Component } from 'react';
import firebase from '../../../../firebase';

//materialUI imports
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import {
  createMuiTheme,
  createStyles,
  Theme,
  MuiThemeProvider,
  withStyles
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

const styles = (theme: Theme) =>
  createStyles({
    paper:{
      paddingTop:10,
      paddingBottom:10,
      margin:'10px auto',
      width:'90%',
      display:'flex',
      justifyContent:'flex-start',
      backgroundColor:'#f7f7f7'
    },
    avatar:{
      width:50,
      height:50,
      margin:5,
      transform:'rotate(90deg)'
    },
    typographyDiv:{
      display:'flex',
      flexDirection:'column',
      textAlign:'left',
      margin:5
    }
  });

export interface Props {
  review: {
    uid: string;
    review: string;
  },
  classes:{
    avatar:string,
    paper:string,
    typographyDiv:string
  }
}

export interface State {
  username:string,
  profilePicture:string
}

class Comment extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username:'',
      profilePicture:''
    };
  }

  componentDidMount(){
    const {review} = this.props;
    console.log('review', review)
    firebase
        .database()
        .ref(`/users/${review.uid}`)
        .once('value')
        .then(snapshot1 => {
          console.log("LOOK AT ME OVER", snapshot1.val())
          if(snapshot1.val().displayName && snapshot1.val().displayName.displayName){
            this.setState({
              username:snapshot1.val().displayName.displayName,
              profilePicture:snapshot1.val().profilePicture.profilePicture
            })
          }
        })
  }

  render() {
    const {classes} = this.props;
    const {review} = this.props.review;
    const {username, profilePicture} = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={profilePicture} alt=''>{profilePicture.charAt(0)}</Avatar>

        <div className={classes.typographyDiv}>
        <Typography color='primary' component='h6' variant='h6'>{username}</Typography>
        <Typography color='primary'>{review}</Typography>
        </div>

      </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Comment);
