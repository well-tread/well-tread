import React,{Component} from 'react';

//Material-UI Core Imports
import {createMuiTheme, createStyles, Theme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

//Material-UI Icon Imports
import DirectionWalk from '@material-ui/icons/DirectionsWalk'
import DirectionBike from '@material-ui/icons/DirectionsBike'
import Terrain from '@material-ui/icons/Terrain'
import SearchIcon from '@material-ui/icons/Search'

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
    container:{
        marginTop: '50px',
        // padding:'50px 0',
        // height: '500px',
        // display: 'flex',
        // alignItems:'center',
        // justifyContent:'center',
        width:'90%',
        margin: 'auto'
    },
    formGroup:{
        paddingBottom: theme.spacing.unit * 3
    },
    button:{
        marginBottom: theme.spacing.unit * 3,
        padding:'15px 0',
        width: '80%',
        margin: 'auto'
    },
    btnIcon:{
        marginLeft: theme.spacing.unit * 2
    },
    textField:{
        paddingBottom:'25px'
    },
    quote:{
        paddingBottom: theme.spacing.unit * 1
    }
})

export interface Props{
    classes:{
        container: string,
        formGroup: string,
        btnIcon: any,
        textField: string,
        button: string,
        quote: string
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
                <div className={classes.container}>
                    <div>
                        <TextField
                            label='Enter a ZIP'
                            value={this.state.zipInput}
                            onChange={(e)=>this.handleChange(e)}
                            name='zipInput'
                            className={classes.textField}
                        />
                        <FormGroup>
                            <div className={classes.formGroup}>
                                <FormControlLabel
                                    control={
                                       <Checkbox
                                            icon={<DirectionWalk color='primary'/>}
                                            checkedIcon={<DirectionWalk color='secondary'/>}
                                       /> 
                                    }
                                    label='Hiking'
                                    labelPlacement='bottom'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<DirectionBike color='primary'/>}
                                            checkedIcon={<DirectionBike color='secondary'/>}
                                        />
                                    }
                                    label='Biking'
                                    labelPlacement='bottom'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<Terrain color='primary'/>}
                                            checkedIcon={<Terrain color='secondary'/>}
                                        />
                                    }
                                    label='Climbing'
                                    labelPlacement='bottom'
                                />
                            </div>
                            <Button color='secondary' variant='outlined' className={classes.button}>
                                Search Trails
                                <SearchIcon className={classes.btnIcon}/>
                            </Button>
                        </FormGroup>
                        <Typography variant='caption' className={classes.quote}>
                                Look deep into nature, and then you will understand everything better.
                        </Typography>
                        <Typography variant='caption'>
                                -Albert Einstein 
                        </Typography>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Search);