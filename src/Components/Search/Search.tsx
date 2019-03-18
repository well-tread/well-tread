import React,{Component} from 'react';

//Material-UI Core Imports
import {createMuiTheme, createStyles, Theme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'

const styles = (theme:Theme) => createStyles({

})

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

export interface Props{

}

export interface State{
    zipInput:any
}

class Search extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            zipInput:'jhgkjg'
        }
    }

    handleChange=(e:any)=>{
        this.setState({zipInput:e.target.value})
    }
    
    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <TextField
                    label='Enter a ZIP'
                    // value={this.state.zipInput}
                    onChange={(e)=>this.handleChange(e.target.value)}
                    name='zip'
                />
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Search);