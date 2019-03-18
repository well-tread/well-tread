import React,{Component} from 'react';
import Preferences from './Preferences/Preferences'; 

import firebase from '../../firebase';

//materialUI imports
import { withStyles, createStyles, Theme , createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

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

const styles = (theme:Theme) =>createStyles({
    paper:{
        backgroundColor:'#FCFCFC'
    },
    expansionPanels:{
        
    },
    expansionPanel:{
        backgroundColor:'#F7F7F7',
    },
    userBar:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:'15%'
    },
    avatar:{
        width:100,
        height:100,
        fontSize:'2em',
        backgroundColor:'#FF5722',
    }
})

export interface Props{
    classes:{
        paper:string;
        expansionPanels:string;
        expansionPanel:string;
        userBar:string;
        avatar:string
    }
}

export interface State{
    preferencesIsOpen:boolean;
}

class Account extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            preferencesIsOpen:false
        }
        this.togglePreferences = this.togglePreferences.bind(this);
    }

    togglePreferences(){
        const {preferencesIsOpen} = this.state;
        this.setState({preferencesIsOpen:!preferencesIsOpen})
    }
    
    render(){
        const {classes} = this.props;
        const {preferencesIsOpen} = this.state;
        return(
            <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>

            <div className={classes.userBar}>
                <IconButton onClick={()=>this.togglePreferences()}>
                    <Avatar className={classes.avatar} src='https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F019%2F930%2F1421657233490.jpg&f=1'>T</Avatar>
                </IconButton>
                <Typography component='p'>Username goes here</Typography>
            </div>

            <Typography component='h2' variant='h2'>Map</Typography>

            <div className={classes.expansionPanels}>

                <ExpansionPanel className={classes.expansionPanel}>

                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color='secondary'/>}>
                        <Typography>Favorited Trails</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography>
                            All your favorited trails will go here
                        </Typography>
                    </ExpansionPanelDetails>

                </ExpansionPanel>

                <ExpansionPanel className={classes.expansionPanel}>

                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color='secondary'/>}>
                        <Typography>Completed Trails</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography>
                            All your Completed trails will go here
                        </Typography>
                    </ExpansionPanelDetails>

                </ExpansionPanel>

                <Preferences preferencesIsOpen={preferencesIsOpen} togglePreferences={this.togglePreferences}/>

            </div>
            </Paper>
            </MuiThemeProvider>
            
        )
    }
}

export default withStyles(styles)(Account);