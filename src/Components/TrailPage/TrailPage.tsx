import React, { Component } from "react";
import {
  withStyles,
  Theme,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Whatshot from "@material-ui/icons/Whatshot";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import "./trailpage.css";
import axios from "axios";
import Reviews from "./Reviews/Reviews";
import Map from "./Map/Map";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#757575"
    },
    secondary: {
      main: "#FF5722"
    }
  }
});

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
  },
  indicator: {
    indicatorColor: "white"
  }
});

export interface Props {
  classes: {
    root: string;
    button: string;
    leftIcon: string;
    indicator: string;
  };
}

export interface State {
  value: number;
  trail: any;
  color: any;
  open: boolean;
}

class TrailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 1,
      trail: "",
      color: "primary",
      open: false
    };
  }
  handleClick = (e: any) => {
    this.setState({ color: "secondary", open: true });
  };
  handleChange = (e: any, value: number) => {
    this.setState({ value });
  };
  handleClose = (e: any) =>{
    this.setState({open: false})
  }
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
            <div className="trailImage" ><img src={element.imgMedium} alt="" /></div>
            <Paper className={classes.root}>
              <div className="trailInfo">
                <Typography variant="h4" color="secondary">
                  {element.name}
                </Typography>
                <div className="sideBySide">
                  <Typography variant="h5" id="miles" color="primary">
                    <strong>Miles: </strong>
                    {element.length}
                  </Typography>
                  <Typography variant="h5" id="stars" color="primary">
                    <strong> Stars: </strong> {element.stars}
                  </Typography>
                </div>
                <Typography variant="h5" id="info" color="primary">
                  <strong>Difficulty: </strong> {element.difficulty}
                </Typography>
                <Typography variant="h5" id="info" color="primary">
                  <strong>Condition: </strong> {element.conditionDetails}
                </Typography>

                <Typography variant="h5" id="info" color="primary">
                  <strong>Description: </strong> {element.summary}
                </Typography>
                <Button
                  className={classes.button}
                  color={this.state.color}
                  variant="outlined"
                  onClick={e => this.handleClick(e)}
                >
                  <Whatshot className={classes.leftIcon} />
                  Favorite
                </Button>
              </div>
            </Paper>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={2500}
              color='primary'
              message={<span>Trail Saved to Favorites</span>}
              action={[
                <IconButton
                  onClick={(e)=>this.handleClose(e)}
                  color='secondary'
                >
                  <CloseIcon/>
                </IconButton>
              ]}
                
            />
          </div>
        );
      })
    ) : (
      <div>loading...</div>
    );
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {/* <Paper className={classes.root}> */}
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            id="tabs"
            classes={{
              indicator: classes.indicator
            }}
          >
            >
            <Tab label="Map" />
            <Tab label="Trail" />
            <Tab label="Reviews" />
          </Tabs>
          {this.state.value === 0 && <Map />}
          {this.state.value === 1 && <div>{Trail0}</div>}
          {this.state.value === 2 && <Reviews />}
          {/* </Paper> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(TrailPage);
