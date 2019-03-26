import React, { Component } from 'react';
import Comment from './Comment/Comment';
import '../trailpage.css';
import firebase from '../../../firebase';


//materialUI icons
import {
  createMuiTheme,
  createStyles,
  Theme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import CreateIcon from '@material-ui/icons/Create';
import { Typography } from '@material-ui/core';


const styles = (theme: Theme) =>
  createStyles({
    div:{
      backgroundColor:'#fcfcfc'
    },
    fab:{
      position:'fixed',
      bottom:10,
      right:10
    }
  });

export interface Props {
  trailID: number;
  profilePicture: string;
  displayName: string;
  uid:string;
  classes:{
    div:string,
    fab:string
  }
  isAnonymous:boolean;
}

export interface State {
  reviews: {
    uid: string;
    profilePicture: string;
    username: string;
    review: string;
  }[];
  reviewInput: string;
  isReviewDialogOpen: boolean;
}

class Reviews extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reviews: [],
      reviewInput: '',
      isReviewDialogOpen:false
    };
    this.deleteReview = this.deleteReview.bind(this);
  }
  componentDidMount() {
    firebase
      .database()
      .ref(`/trails/${this.props.trailID}`)
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          this.setState({
            reviews: snapshot.val().reviews
          });
        }
      });
  }
  handleChange = (e: any) => {
    this.setState({
      reviewInput: e.target.value
    });
  };

  toggleReviewDialog(){
    const {isReviewDialogOpen} = this.state;
    this.setState({isReviewDialogOpen:!isReviewDialogOpen, reviewInput:''})
  }

  postReview = () => {
    let { reviews, reviewInput } = this.state;

    reviews.push({
      uid: this.props.uid,
      profilePicture: this.props.profilePicture,
      username: this.props.displayName,
      review: reviewInput
    });
    firebase
      .database()
      .ref(`/trails/${this.props.trailID}`)
      .set({
        reviews: reviews
      });
    this.setState({
      reviews: reviews,
      reviewInput: '',
      isReviewDialogOpen:false
    });
  };

  deleteReview(index:number){
    let {reviews} = this.state;

    reviews.splice(index, 1);
    firebase
      .database()
      .ref(`/trails/${this.props.trailID}`)
      .set({
        reviews: reviews
      });
    this.setState({reviews})
  }

  render() {
    const {classes, isAnonymous} = this.props;
    const {isReviewDialogOpen, reviews} = this.state;

    let allReviews = this.state.reviews ? (
      this.state.reviews.map((element: any, index: number) => {
        return (
          <div className='trailContainer' key={index}>
            <Comment review={element} uid={this.props.uid} deleteReview={this.deleteReview} index={index}/>
          </div>
        );
      })
    ) : (
      <div>loading...</div>
    );

    return (
      <div className={classes.div}>
        <Dialog fullWidth open={isReviewDialogOpen}>
            <DialogContent>
              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder='Write how you felt about this trail here!'
                label='Review'
                value={this.state.reviewInput}
                onChange={e => this.handleChange(e)}
                variant='outlined'
                
                // className={classes.reviewField}
              />
            </DialogContent>

            <DialogActions>
              <Button 
              onClick={()=>this.toggleReviewDialog()}
              variant='outlined'>
                Cancel
              </Button>

              <Button
                // className={classes.button}
                // color={this.state.color}
                variant='outlined'
                onClick={() => this.postReview()}
              >
                Submit Review
              </Button>

            </DialogActions>
        </Dialog>
        
        {
         reviews.length >0 ? allReviews : <Typography component='h3' variant='h3' color='primary' style={{backgroundColor:'#f7f7f7'}}>Be the first to leave a review!</Typography>
        }

        {
          isAnonymous ?
            (<Typography>Login/Register to leave a review</Typography>)
            : 
            (<Fab onClick={()=>this.toggleReviewDialog()} className={classes.fab}>
              <CreateIcon color='secondary'/>
            </Fab>) 
        }
        
      </div>
    );
  }
}

export default withStyles(styles)(Reviews);
