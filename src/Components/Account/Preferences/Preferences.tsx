import React,{Component} from 'react';

import firebase from '../../../firebase';
//materialUI imports
import { withStyles, createStyles, Theme , createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

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
    dialog:{
        backgroundColor:'#f7f7f7',
        display:'flex',
        flexDirection:'column',
        textAlign:'center'
    },
    dialogContent:{
        overflow:'hidden',
    },
    dialogActions:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        height:'50vh'
    },
    textField:{

    },
    inputLabel:{
        textAlign:'center',
        border:'1px solid #C4C4C4',
        padding:'5px 1px',
        borderRadius:4,
    },
    button:{
        fontWeight:'bold',
        width:'30%',
        margin:'0px auto',
    },
    buttonDiv:{
        display:'flex'
    }
})


export interface Props{
    classes:{
        dialog:string;
        dialogContent:string;
        dialogActions:string;
        textField:string;
        inputLabel:string;
        button:string;
        buttonDiv:string;
    },
    preferencesIsOpen:boolean,
    displayName:string,
    zipCode:string,
    uid:string,
    togglePreferences:()=>void,
    handleChange:(value:string, id:string)=>void
}

export interface State{
    confirmChangesIsVisible:boolean
}

class Preferences extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            confirmChangesIsVisible:false
        }
    }

    componentDidUpdate(prevProps:Props){
        const {confirmChangesIsVisible} = this.state;
        if(prevProps.displayName !== '' && (prevProps.zipCode !== this.props.zipCode || prevProps.displayName !== this.props.displayName) && !confirmChangesIsVisible){
            this.setState({confirmChangesIsVisible:true})
        }
    }

    confirmChanges(e:any){
        e.preventDefault();
        const {displayName, zipCode, uid} = this.props;
        firebase.database().ref(`users/${uid}/displayName`).set({
            displayName:displayName
        })
        firebase.database().ref(`users/${uid}/zipCode`).set({
            zipCode:zipCode
        })
        this.setState({confirmChangesIsVisible:false})
    }
    
    render(){
        const {confirmChangesIsVisible} = this.state;
        const {classes, preferencesIsOpen, togglePreferences, displayName, zipCode, handleChange} = this.props;

        return(
            <MuiThemeProvider theme={theme}>
            <Dialog open={preferencesIsOpen}>
            <div className={classes.dialog}>
                <DialogTitle>
                    <Typography color='primary' component='h5' variant='h5'>User Preferences</Typography>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <Typography color='primary'component='p'>
                        Update your profile picture, display name, and home zip here.
                    </Typography>
                </DialogContent>

                <DialogActions >

                    <form className={classes.dialogActions} onSubmit={(e)=>this.confirmChanges(e)}>

                    <InputLabel className={classes.inputLabel}>
                        Upload Profile Picture
                        <Input disableUnderline fullWidth type='file' />
                    </InputLabel>

                    <TextField required={true} className={classes.textField} onChange={(e)=>handleChange(e.target.value, 'displayName')} fullWidth variant='outlined' placeholder='Display Name' label='Display Name' value={displayName} />
                    <TextField className={classes.textField} onChange={(e)=>handleChange(e.target.value, 'zipCode')} fullWidth variant='outlined' placeholder='Home ZIP' label='Home ZIP' value={zipCode} />
                    
                    <div className={classes.buttonDiv}>
                    <Button color='secondary' variant='contained' className={classes.button} onClick={()=>togglePreferences()}>Close</Button>
                    {
                    confirmChangesIsVisible ? <Button type='submit' color='secondary' variant='contained' className={classes.button}>Confirm Changes</Button> : <div />
                    }
                    </div>

                    </form>
                </DialogActions>

                
            </div>
            </Dialog>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Preferences);