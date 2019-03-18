import React,{Component} from 'react';

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
    },
    preferencesIsOpen:boolean,
    togglePreferences:()=>void
}

export interface State{
    
}

class Preferences extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            
        }
    }
    
    render(){
        const {classes, preferencesIsOpen, togglePreferences} = this.props;

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

                <DialogActions className={classes.dialogActions}>

                    <InputLabel className={classes.inputLabel}>
                        Upload Profile Picture
                        <Input disableUnderline fullWidth type='file' />
                    </InputLabel>

                    <TextField className={classes.textField} fullWidth variant='outlined' placeholder='Display Name' label='Display Name' />
                    <TextField className={classes.textField} fullWidth variant='outlined' placeholder='Home ZIP' label='Home ZIP' />

                    <Button color='secondary' variant='contained' className={classes.button} onClick={()=>togglePreferences()}>Close</Button>
                </DialogActions>

                
            </div>
            </Dialog>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Preferences);