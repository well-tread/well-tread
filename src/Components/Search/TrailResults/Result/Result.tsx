import React,{Component} from 'react';

import {Redirect} from 'react-router-dom';

//materialUI imports
import { withStyles, Theme, createMuiTheme, createStyles, MuiThemeProvider} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Hidden } from '@material-ui/core';

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
        backgroundSize:`cover`,
        backgroundPosition:'center',
        backgroundBlendMode:'overlay',
        paddingTop:35,
        paddingBottom:35,
        width:'100vw'
      },
      expansionPanelExpanded:{
        backgroundColor:'#757575', 
        backgroundSize:`cover`,
        backgroundPosition:'center',
        backgroundBlendMode:'overlay',
        paddingTop:35,
        paddingBottom:35,
        // margin:0,
        width:'100vw',
        overflow: 'hidden'
      },
      expandMoreIcon:{
          width:30,
          height:30
      },
      exPanelSummary:{
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0,0,0,.125)',
          marginBottom: -1,
          minHeight: 56,
      }
});

export interface Props{
    trail:any;
    classes:{
        typographyTitle:string,
        typographyContent:string,
        expansionPanel:string,
        expansionPanelExpanded:string,
        expandMoreIcon:string,
        exPanelSummary:string
    },
    icon:any,
    type:string
}

export interface State{
    isRedirecting:boolean
}

class Result extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            isRedirecting:false
        }
    }

    redirectToTrailPage(){
      this.setState({isRedirecting:true})
    }
    
    render(){
        const {isRedirecting} = this.state;
        const {trail, classes, icon, type} = this.props;
        return(
            <MuiThemeProvider theme={theme}>
            <ExpansionPanel 
              className={classes.expansionPanel} 
              style={{backgroundImage:`url(${trail.imgMedium})`}} classes={{expanded:classes.expansionPanelExpanded}} >

            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon color='secondary' className={classes.expandMoreIcon}/>}
                
            >
                <Typography className={classes.typographyTitle}>{icon} {trail.name}</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <Typography className={classes.typographyContent}>{trail.summary}</Typography>
            </ExpansionPanelDetails>

            <ExpansionPanelActions>
                <Button style={{fontSize:'1.2em', fontWeight:'bold'}} color='secondary' variant='flat' onClick={()=>this.redirectToTrailPage()} fullWidth>Trail Page</Button>
                <Button style={{fontSize:'1.2em', fontWeight:'bold'}} color='secondary' variant='flat' fullWidth>Favorite</Button>
            </ExpansionPanelActions>

            </ExpansionPanel>

            {
              isRedirecting ? <Redirect to={`/trails/${type}/${trail.id}`} /> : <div />
            }
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Result);