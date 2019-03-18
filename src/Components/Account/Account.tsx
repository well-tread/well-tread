import React,{Component} from 'react';

//materialUI imports
import { withStyles, createStyles, Theme , createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

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
    expansionPanels:{
        
    },
    userBar:{

    }
})

export interface Props{
    classes:{
        expansionPanels:string;
        userBar:string;
    }
}

export interface State{
    
}

class Account extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            
        }
    }
    
    render(){
        const {classes} = this.props;
        return(
            <MuiThemeProvider theme={theme}>

            <div className={classes.userBar}>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </div>

            <Typography component= 'h2' variant='h2'>Map</Typography>

            <div className={classes.expansionPanels}>

                <ExpansionPanel>

                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Favorited Trails</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography>
                            All your favorited trails will go here
                        </Typography>
                    </ExpansionPanelDetails>

                </ExpansionPanel>

                <ExpansionPanel>

                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Completed Trails</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography>
                            All your Completed trails will go here
                        </Typography>
                    </ExpansionPanelDetails>

                </ExpansionPanel>
            </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Account);