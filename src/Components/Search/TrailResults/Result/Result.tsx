import React,{Component} from 'react';

//materialUI imports
import { withStyles, Theme, createMuiTheme, createStyles, MuiThemeProvider} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

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
  
const styles = (theme: Theme) => createStyles({
      typographyTitle:{
          opacity:1, 
          color:'#F7F7F7',
          textShadow:'1px 1px 4px black',
          fontSize:'1.3em',
      },
      typographyContent:{
        opacity:1, 
        color:'#F7F7F7',
        textShadow:'1px 1px 4px black',
        textAlign:'left',
        fontSize:'1.1em'
      },
      expansionPanel:{
        backgroundColor:'#757575', 
        backgroundSize:`100% 100%`, 
        backgroundBlendMode:'overlay',
        paddingTop:25,
        paddingBottom:25,
        width:'100%'
      },
      expansionPanelExpanded:{
        backgroundColor:'#757575', 
        backgroundSize:`100% 100%`, 
        backgroundBlendMode:'overlay',
        paddingTop:25,
        paddingBottom:25,
        margin:0,
        width:'100%'
      },
      expandMoreIcon:{
          width:30,
          height:30
      }
});

export interface Props{
    trail:any;
    classes:{
        typographyTitle:string,
        typographyContent:string,
        expansionPanel:string,
        expansionPanelExpanded:string,
        expandMoreIcon:string
    },
    icon:any
}

export interface State{
    
}

class Result extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            
        }
    }
    
    render(){
        const {trail, classes, icon} = this.props;
        return(
            <MuiThemeProvider theme={theme}>
            <ExpansionPanel className={classes.expansionPanel} style={{backgroundImage:`url(${trail.imgMedium})`}} classes={{expanded:classes.expansionPanelExpanded}} >

            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon color='secondary' className={classes.expandMoreIcon} />}
                
            >
                <Typography className={classes.typographyTitle}>{icon} {trail.name}</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <Typography className={classes.typographyContent}>{trail.summary}</Typography>
            </ExpansionPanelDetails>

            <ExpansionPanelActions>
                <Button color='secondary' fullWidth>Trail Page</Button>
                <Button color='secondary' fullWidth>Favorite</Button>
            </ExpansionPanelActions>

            </ExpansionPanel>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Result);