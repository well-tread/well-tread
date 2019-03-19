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
import Badge from '@material-ui/core/Badge';

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
    displayName:string;
    zipCode:string;
    uid:string;
    preferencesIsOpen:boolean;
    isLoading:boolean;
    isAnonymous:boolean;
    isBadgeHidden:boolean;
}

class Account extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            displayName:'',
            zipCode:'',
            uid:'',
            preferencesIsOpen:false,
            isLoading:true,
            isAnonymous:true,
            isBadgeHidden:true
        }
        this.togglePreferences = this.togglePreferences.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user:any) => {
                firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot1) => {

                    // console.log(user)

                    if(snapshot1.val()){
                        const displayName = snapshot1.val().displayName;
                        const zipCode = snapshot1.val().zipCode;
                        if(zipCode && zipCode.zipCode){
                            console.log(zipCode.zipCode)
                            this.setState({displayName:displayName.displayName, zipCode:zipCode.zipCode, uid:user.uid, isBadgeHidden:true})
                        }
                        else{
                            this.setState({displayName:displayName.displayName, uid:user.uid, isBadgeHidden:false})
                        }
                    }
                    else{
                        firebase.database().ref(`users/${user.uid}/displayName`).set({
                            displayName:user.displayName
                        })
                        this.setState({displayName:user.displayName, uid:user.uid})
                    }

                })
                
        })
    }

    componentDidUpdate(prevProps:Props, prevState:State){
        const {zipCode, isBadgeHidden} = this.state;
        if(zipCode && !isBadgeHidden){
            this.setState({isBadgeHidden:true})
        }
    }

    togglePreferences(){
        const {preferencesIsOpen} = this.state;
        this.setState({preferencesIsOpen:!preferencesIsOpen})
    }

    handleChange(value:string, id:string){
        this.setState(()=>{
            if(value.length > 0 && id==='zipCode'){
                return{...this.state, isBadgeHidden:true, [id]:value}
            }
            return{...this.state, [id]:value}
        });
    }
    
    render(){
        const {classes} = this.props;
        const {preferencesIsOpen, displayName, zipCode, uid, isBadgeHidden} = this.state;
        return(
            <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>

            <div className={classes.userBar}>
                <IconButton onClick={()=>this.togglePreferences()}>
                    <Badge color='secondary' variant='dot' invisible={isBadgeHidden}>
                    <Avatar className={classes.avatar} src='https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F019%2F930%2F1421657233490.jpg&f=1'>T</Avatar>
                    </Badge>
                </IconButton>
                <Typography component='p'>{displayName}</Typography>
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

                <Preferences displayName={displayName} zipCode={zipCode} uid={uid} preferencesIsOpen={preferencesIsOpen} togglePreferences={this.togglePreferences} handleChange={this.handleChange}/>

            </div>
            </Paper>
            </MuiThemeProvider>
            
        )
    }
}

export default withStyles(styles)(Account);