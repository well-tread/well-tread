import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Whatshot from "@material-ui/icons/Whatshot";
import Typography from "@material-ui/core/Typography";
import "./trailpage.css";
import axios from "axios";

// const styles = {
//   root: {
//     flexGrow: 1
//   }
// };
const styles = (theme: any) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "70vw",
    margin: "0 auto",
    "margin-bottom": "2em",
    "margin-top": "2em"
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

export interface Props {
  classes: {
    root: string;
    button: string;
    leftIcon: string;
  };
}

export interface State {
  value: number;
  trail: any;
}

class TrailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      trail: ""
    };
  }
  handleChange = (e: any, value: number) => {
    this.setState({ value });
  };
  componentDidMount() {
    axios.get(`http://localhost:5050/trails/bikingOne`).then(res => {
      console.log(res.data);
      const response = res.data;
      this.setState({
        trail: response
      });
    });
  }

  render() {
    const { classes } = this.props;
    let Trail0 = this.state.trail ? (
      this.state.trail.map((element: any, index: number) => {
        return (
          <div className="trailContainer" key={index}>
            <img className="trailImage" src={element.imgMedium} alt="" />
            <Paper className={classes.root}>
              <div className="trailInfo">
                <Typography variant="h4">{element.name}</Typography>
                <div className="sideBySide">
                  <Typography variant="h5" id="miles">
                    <strong>Miles: </strong>
                    {element.length}
                  </Typography>
                  <Typography variant="h5" id="stars">
                    <strong> Stars: </strong> {element.stars}
                  </Typography>
                </div>
                <Typography variant="h5" id="info">
                  <strong>Difficulty: </strong> {element.difficulty}
                </Typography>

                <Typography variant="h5" id="info">
                  <strong>Description: </strong> {element.summary}
                </Typography>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                >
                  <Whatshot className={classes.leftIcon} />
                  Favorite
                </Button>
              </div>
            </Paper>
          </div>
        );
      })
    ) : (
      <div>loading...</div>
    );
    return (
      <div>
        {/* <Paper className={classes.root}> */}
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          id="tabs"
        >
          <Tab label="Map" />
          <Tab label="Trail" />
          <Tab label="Reviews" />
        </Tabs>
        {/* </Paper> */}
        {Trail0}
      </div>
    );
  }
}

export default withStyles(styles)(TrailPage);
