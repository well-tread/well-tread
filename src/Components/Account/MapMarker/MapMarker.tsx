import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

//Material UI imports
import PlaceIcon from '@material-ui/icons/Place';

export interface Props{
    trail?:any;
    trailtype?:string;
    lat:number;
    lng:number;
    favorite:boolean;
}

export interface State{
    isRedirecting:boolean
}

class MapMarker extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            isRedirecting:false
        }
    }

    render(){
        const {favorite, trail, trailtype} = this.props;
        const {isRedirecting} = this.state;
        return(
            <div>
            {
                favorite ? <PlaceIcon onClick={()=> this.setState({isRedirecting:true})} color='secondary' style={{position: 'absolute', transform: 'translate(-50%, -70%)'}}/> : <PlaceIcon onClick={()=> this.setState({isRedirecting:true})} color='primary' style={{position: 'absolute', transform: 'translate(-50%, -50%)'}}/>
            }
            {
                isRedirecting ? <Redirect to={`/trails/${trailtype}/${trail.id}`} /> : <div />
            }
            </div>
        )
    }
}

export default MapMarker;