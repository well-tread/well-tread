import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Material-UI Core Imports
import {
  createMuiTheme,
  createStyles,
  Theme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ButtonProps } from '@material-ui/core/Button';

// Material-UI Icon Imports
import Menu from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import AccountBox from '@material-ui/icons/AccountBox';
import Search from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#757575'
    },
    secondary: {
      main: '#FF5722'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = (theme: Theme) =>
  createStyles({
    appBarContainer: {
      marginBottom: theme.spacing.unit * 6
    },
    appBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: '2em',
      addingRight: '2em',
      alignItems: 'center',
      // background: '0,0,0,00',
      background: 'white',
      position: 'fixed',
      zIndex: 9999,
      boxShadow: 'none'
    },
    blurBg: {
      // overflow: 'hidden',
      // zIndex: 9998,
      // backgroundColor: '#fff',
      // width: '100%',
      // filter:'10px'
    },
    dropDownMenu: {
      paddingTop: '50px',
      [theme.breakpoints.up('sm')]: {
        paddingRight: '80px'
      }
    },
    topNavDropdown: {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    rightNavDropdown: {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    }
  });

export interface Props {
  classes: {
    appBarContainer: string;
    appBar: string;
    dropDownMenu: string;
    blurBg: string;
    topNavDropdown: string;
    rightNavDropdown: string;
  };
  // location:any,
  // pathname:any,
}

export interface State {
  drawerOpen: boolean;
  navLinkColor: string;
}

export interface LinkButtonProps extends ButtonProps {
  to: string;
  replace?: boolean;
}

const LinkItem = (props: LinkButtonProps) => (
  <ListItem {...props} component={Link as any} />
);

class Navbar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drawerOpen: false,
      navLinkColor: 'primary'
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (open: boolean) => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  };

  // toggleCurrentLink=()=>{
  //     if(this.props.location.pathname === this.props.location.pathname){
  //         this.setState({navLinkColor:'secondary'})
  //     }
  // }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.appBarContainer}>
          <AppBar className={classes.appBar}>
            <Typography component='h6' variant='h6' color='primary'>
              WELL TREAD
            </Typography>
            <IconButton onClick={() => this.toggleDrawer(true)}>
              <Menu color='secondary' className={this.state.navLinkColor} />
            </IconButton>
          </AppBar>
          <div className={classes.blurBg} />
        </div>
        <SwipeableDrawer
          anchor='top'
          className={classes.topNavDropdown}
          open={this.state.drawerOpen}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
        >
          <List component='nav' className={classes.dropDownMenu}>
            <LinkItem to='/home' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <Home className={this.state.navLinkColor} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </LinkItem>
            <LinkItem to='/account' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary='Account' />
            </LinkItem>
            <LinkItem to='/search' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary='Search for Trails' />
            </LinkItem>
            <LinkItem to='/login' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary='Sign In' />
            </LinkItem>
          </List>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor='right'
          className={classes.rightNavDropdown}
          open={this.state.drawerOpen}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
        >
          <List component='nav' className={classes.dropDownMenu}>
            <LinkItem to='/home' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <Home className={this.state.navLinkColor} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </LinkItem>
            <LinkItem to='/account' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary='Account' />
            </LinkItem>
            <LinkItem to='/search' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary='Search for Trails' />
            </LinkItem>
            <LinkItem to='/login' onClick={() => this.toggleDrawer(false)}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary='Sign In' />
            </LinkItem>
          </List>
        </SwipeableDrawer>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Navbar);
