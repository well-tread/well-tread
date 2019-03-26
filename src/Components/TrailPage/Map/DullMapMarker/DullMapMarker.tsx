import React,{Component} from 'react';
import PlaceIcon from '@material-ui/icons/Place';

export interface Props{
    lat:number,
    lng:number
}

function DullMapMarker(props:Props){
    return(
        <PlaceIcon style={{color:'#FF5722'}} />
    )
}
export default DullMapMarker;