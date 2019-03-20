import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

export interface Props {
  review: {
    uid: string;
    profilePicture: string;
    username: string;
    review: string;
  };
}

export interface State {}

class Comment extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Avatar src={this.props.review.profilePicture} alt=''>
          T
        </Avatar>
        <Typography>{this.props.review.username}</Typography>
        <Typography>{this.props.review.review}</Typography>
      </div>
    );
  }
}

export default Comment;
