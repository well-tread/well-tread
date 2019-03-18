import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./trailpage.css";
import axios from "axios";
import { string } from "prop-types";

const styles = {
  root: {
    flexGrow: 1
  }
};

export interface Props {
  classes: {
    root: string;
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
            <div className="trailInfo">
              <h1>{element.name}</h1>
              <h2>Stars: {element.stars}</h2>
              <h2>Difficulty: {element.difficulty}</h2>
              <h2>{element.length} Miles</h2>
              <h2>Description: {element.summary}</h2>
            </div>
          </div>
        );
      })
    ) : (
      <div>loading...</div>
    );
    return (
      <div>
        <Paper className={classes.root}>
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
        </Paper>
        {Trail0}
      </div>
    );
  }
}

export default withStyles(styles)(TrailPage);
