import React, { Component } from 'react';
import Comment from './Comment/Comment';
import '../trailpage.css';
import firebase from '../../../firebase';

import {
  createMuiTheme,
  createStyles,
  Theme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface Props {
  trailID: number;

  profilePicture: string;
  displayName: string;
}

export interface State {
  reviews: {
    uid: string;
    profilePicture: string;
    username: string;
    review: string;
  }[];
  reviewInput: string;
}

class Reviews extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reviews: [],
      reviewInput: ''
    };
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

  postReview = () => {
    let { reviews, reviewInput } = this.state;

    reviews.push({
      uid: 'test',
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
      reviewInput: ''
    });
  };

  render() {
    let allReviews = this.state.reviews ? (
      this.state.reviews.map((element: any, index: number) => {
        return (
          <div className='trailContainer' key={index}>
            <Comment review={element} />
          </div>
        );
      })
    ) : (
      <div>loading...</div>
    );
    return (
      <div>
        <TextField
          label='Review'
          value={this.state.reviewInput}
          onChange={e => this.handleChange(e)}
          // className={classes.reviewField}
        />
        <Button
          // className={classes.button}
          // color={this.state.color}
          variant='outlined'
          onClick={() => this.postReview()}
        >
          Submit Review
        </Button>
        {allReviews}
      </div>
    );
  }
}

export default Reviews;
