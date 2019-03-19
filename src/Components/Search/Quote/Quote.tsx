import React,{Component} from 'react';

//Material-UI Core Imports
import {createMuiTheme, createStyles, Theme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

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
    quote:{
        paddingBottom: theme.spacing.unit * 1,
        fontStyle:'italic'
    }
})

export interface Props{
    classes:{
        quote: string
    }
}

export interface State{
    
}

class Quote extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            
        }
    }
    
    render(){
        const {classes} = this.props
        return(
            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography variant='subtitle1' className={classes.quote}>
                            "Look deep into nature, and then you will understand everything better."
                    </Typography>
                    <Typography variant='subtitle2'>
                            -Albert Einstein 
                    </Typography>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Quote);