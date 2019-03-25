import React, { Component } from 'react';
import firebase from '../../../../firebase';
import ReactExifImg from 'react-exif-orientation-img';

//materialUI imports
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {
  createMuiTheme,
  createStyles,
  Theme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

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
    avatar: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 50,
      height: 50,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(20),
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none',
      textAlign: 'center',
      // Handle non-square image. The property isn't supported by IE 11.
      objectFit: 'cover',
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
  },
  uid:string,
  deleteReview:(index:number)=>void,
  index:number
}

export interface State {
  username:string,
  profilePicture:string,
}

class Comment extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username:'',
      profilePicture:'',
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
    const {classes, deleteReview, index} = this.props;
    const {review, uid} = this.props.review;
    const {username, profilePicture} = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        
        <ReactExifImg className={classes.avatar} src={profilePicture} alt='' />

        <div className={classes.typographyDiv}>
        <Typography color='primary' component='h6' variant='h6'>{username}</Typography>
        <Typography color='primary'>{review}</Typography>
        </div>

        {
          this.props.uid === uid ? <IconButton onClick={()=>deleteReview(index)} style={{alignSelf:'flex-end'}}><DeleteIcon /> </IconButton> : <div />
        }

      </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Comment);
