import React, { Component } from 'react';

//Material-UI Core Imports
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    quote: {
      paddingBottom: theme.spacing.unit * 1,
      fontStyle: 'italic'
    }
  });

export interface Props {
  classes: {
    quote: string;
  };
}

export interface State {
  quotes: {
    content: string;
    author: string;
  }[];
  currentQuote: number;
}

class Quote extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      quotes: [
        {
          content:
            '“I felt my lungs inflate with the onrush of scenery—air, mountains, trees, people. I thought, "This is what it is to be happy.” ',
          author: 'Sylvia Plath, The Bell Jar '
        },
        {
          content:
            '“The clearest way into the Universe is through a forest wilderness.”',
          author: ' John Muir '
        },
        {
          content: '“The mountains are calling and I must go.”',
          author: ' John Muir '
        },
        {
          content:
            '“In the spring, at the end of the day, you should smell like dirt.”',
          author: `Margaret Atwood, Bluebeard's Egg `
        },
        {
          content:
            '“...and then, I have nature and art and poetry, and if that is not enough, what is enough?”',
          author: `Vincent Willem van Gogh `
        },
        {
          content:
            '“Live in each season as it passes; breathe the air, drink the drink, taste the fruit, and resign yourself to the influence of the earth.” ',
          author: `Henry David Thoreau, Walden `
        },
        {
          content: '“The poetry of the earth is never dead.”  ',
          author: `John Keats`
        },
        {
          content: '“Nature is not a place to visit. It is home.”',
          author: `Gary Snyder`
        },
        {
          content: '“Heaven is under our feet as well as over our heads.”',
          author: `Henry David Thoreau, Walden`
        }
      ],
      currentQuote: 0
    };
  }

  componentDidMount() {
    let { quotes, currentQuote } = this.state;

    currentQuote = Math.floor(Math.random() * quotes.length);
    this.setState({ currentQuote });
  }

  render() {
    const { classes } = this.props;
    const { quotes, currentQuote } = this.state;
    return (
      <div style={{ width: '70%', margin: 'auto', marginTop: '120px' }}>
        <Typography
          variant='subtitle1'
          className={classes.quote}
          color='primary'
        >
          {quotes[currentQuote].content}
        </Typography>
        <Typography variant='subtitle2' color='primary'>
          {quotes[currentQuote].author}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Quote);
