import React,{Component} from 'react';
import {Link} from 'react-router-dom'

// Material-UI Core Imports
import {createMuiTheme, createStyles, Theme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// Material-UI Icon Imports
import Menu from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import AccountBox from '@material-ui/icons/AccountBox';
import Search from '@material-ui/icons/Search';

const theme = createMuiTheme({
    palette:{
        primary:{
            main:'#757575'
        },
        secondary:{
            main:'#FF5722'
        }
    }
})

const styles = (theme:Theme) => createStyles({
    appBar:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

export interface Props{
    classes:{
        appBar: string,
    }
}

export interface State{
    drawerOpen: boolean
}

interface LinkProps extends Props {
    to: string;
    replace?: boolean;
    primary: string;
  }

class Navbar extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            drawerOpen: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    toggleDrawer = (open:boolean) => {
        this.setState({
          drawerOpen: open
        });
      };

    // ListItemLinkShorthand=(props:LinkProps)=>{
    //     const { primary, to } = props;
    //     return (
    //       <li>
    //         <ListItem button component={Link} to={to}>
    //             <ListItemText primary={primary} />
    //         </ListItem>
    //       </li>
    //     );
    //   }
    
    render(){
        const {classes} = this.props
        // const accountLink = (props: any) => <Link to="account" {...props} />
        // const homeLink = (props: any) => <Link to="/" {...props} />

        return(
            <MuiThemeProvider theme={theme}>
                <AppBar className={classes.appBar}>
                    <Typography variant='h5'>
                        Well Tread
                    </Typography>
                    <IconButton onClick={()=>this.toggleDrawer(true)}>
                        <Menu/>
                    </IconButton>
                </AppBar>
                <SwipeableDrawer
                    anchor='top'
                    open={this.state.drawerOpen}
                    onClose={()=>this.toggleDrawer(false)}
                    onOpen={()=>this.toggleDrawer(true)}
                >
                    <List component='nav'>
                        <ListItem button >
                            <ListItemIcon>
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary='Home'/>
                        </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountBox/>
                                </ListItemIcon>
                                <ListItemText primary='Account'/>
                            </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <Search/>
                            </ListItemIcon>
                            <ListItemText primary='Search for Trails'/>
                        </ListItem>
                    </List>
                </SwipeableDrawer>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Navbar);