import React,{Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import firebase,{emailConfig, googleConfig} from '../../firebase';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';



//MaterialUI imports
import { withStyles, createStyles, Theme , createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        background:'url(https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/displayImages%2FLoginPageBackground.jpg?alt=media&token=7418d340-f063-46e4-8442-207b4a97e583)',
        backgroundSize:'100vw 100vh',
        height:'100vh'
    },
    textField:{
        width:'80%',
        margin:'4vh auto',
        backgroundColor:'#F7F7F7',
        borderRadius:5
    },
    textFieldInput:{
        fontSize:'1.2em'
    },
    button:{
        width:'60%',
        margin:'4vh auto',
        fontSize:'1em',
        fontWeight:'bold',
        backgroundColor:'rgba(247, 247, 247, 0.1)',
        borderWidth:3
    },
    typography:{
        margin:'4vh auto',
        fontWeight:'bold'
    },
    title:{
        alignSelf:'center',
        color:'#F7F7F7',
        position:'absolute',
        top:0
    },
    firebaseUI:{
       
    }
})

export interface Props{
    classes:{
        paper:string;
        textField:string;
        textFieldInput:string;
        button:string;
        typography:string;
        title:string;
        firebaseUI:string;
    }
    location:{
        search:string;
    },
    LinkButton:any
}

export interface State{
    dialogIsOpen:boolean;
    anonymousLogin:boolean;
}



class Login extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            dialogIsOpen:false,
            anonymousLogin:false
        }

        
    }
    

    componentDidMount(){
        console.log(this.props);
        if(this.props.location.search === '?mode=select'){
            this.setState({dialogIsOpen:true})
        }
    }
    
    toggleDialog(){
        const {dialogIsOpen} = this.state;
        this.setState({dialogIsOpen:!dialogIsOpen});
    }

    signInAnonymously(){
        firebase.auth().signInAnonymously().then(() => {
            this.setState({anonymousLogin:true})
        })
    }

    render(){
        const {classes} = this.props;
        const {dialogIsOpen, anonymousLogin} = this.state;
        
        return(
            
            <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>
                <Typography component='h2' variant='h2' className={classes.title}>Well Tread</Typography>
                <div>
                <Button className={classes.button} color='secondary' variant='outlined' onClick={()=>this.toggleDialog()}>Sign in / Register</Button>
                <Button className={classes.button} color='secondary' variant='outlined' onClick={()=>this.signInAnonymously()}>Continue without account</Button>
                </div>


                <Dialog open={dialogIsOpen}>
                <FirebaseAuth className={classes.firebaseUI} uiConfig={emailConfig} firebaseAuth={firebase.auth()} />
                <Button className={classes.button} color='secondary' variant='outlined' onClick={()=>this.toggleDialog()}>Close</Button>
                </Dialog>

                {
                    anonymousLogin ? <Redirect to='/account' /> : <div />
                }

            </Paper>
            </MuiThemeProvider>
            
        )
    }
}

export default withStyles(styles)(Login);