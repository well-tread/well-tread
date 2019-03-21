import React,{Component} from 'react';

//Material UI imports
import PlaceIcon from '@material-ui/icons/Place';

export interface Props{
    lat:number;
    lng:number;
    favorite:boolean;
}

function MapMarker(props:Props){
    const {favorite} = props;
    return(
        <div>
        {
            favorite ? <PlaceIcon color='primary' style={{position: 'absolute', transform: 'translate(-50%, -50%)'}}/> : <PlaceIcon color='secondary' style={{position: 'absolute', transform: 'translate(-50%, -50%)'}}/>
        }
        </div>
    )
}

export default MapMarker;