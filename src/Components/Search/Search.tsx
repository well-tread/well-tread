import React,{Component} from 'react';

//Material-UI Core Imports
import {createMuiTheme, createStyles, Theme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

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
    paper:{
        marginTop: '150px'
    }
})

export interface Props{
    classes:{
        paper: any
    }
}

export interface State{
    zipInput:any
}

class Search extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            zipInput:''
        }
    }

    handleChange=(e:any)=>{
        this.setState({zipInput:e.target.value})
    }
    
    render(){
        const {classes} = this.props
        return(
            <MuiThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <TextField
                        label='Enter a ZIP'
                        value={this.state.zipInput}
                        onChange={(e)=>this.handleChange(e)}
                        name='zipInput'
                    />
                    <Paper>
                        <Checkbox/>
                        <Checkbox/>
                        <Checkbox/>
                    </Paper>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Search);