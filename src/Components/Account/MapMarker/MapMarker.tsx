import React,{Component} from 'react';
import TrailPage from '../../TrailPage/TrailPage';

//Material UI imports
import PlaceIcon from '@material-ui/icons/Place';

export interface Props{
    trail?:any;
    trailtype:string;
    lat:number;
    lng:number;
    favorite:boolean;
}

export interface State{
    isDialogOpen:boolean
}

class MapMarker extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            isDialogOpen:false
        }
    }

    render(){
        const {favorite, trail, trailtype} = this.props;
        const {isDialogOpen} = this.state;
        return(
            <div>
            {
                favorite ? <PlaceIcon onClick={()=> this.setState({isDialogOpen:true})} color='secondary' style={{position: 'absolute', transform: 'translate(-50%, -70%)'}}/> : <PlaceIcon onClick={()=> this.setState({isDialogOpen:true})} color='primary' style={{position: 'absolute', transform: 'translate(-50%, -50%)'}}/>
            }
            
            <TrailPage trail={trail} trailtype={trailtype} isDialogOpen={isDialogOpen} closeDialog={()=>this.setState({isDialogOpen:false})}/>
            </div>
        )
    }
}

export default MapMarker;