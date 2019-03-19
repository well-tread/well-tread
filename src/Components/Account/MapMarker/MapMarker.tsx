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
            favorite ? <PlaceIcon color='primary' /> : <PlaceIcon color='secondary' />
        }
        </div>
    )
}

export default MapMarker;