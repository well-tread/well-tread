import React,{Component} from 'react';
import Result from './Result/Result';

//MaterialUI imports
import DirectionWalk from '@material-ui/icons/DirectionsWalk'
import DirectionBike from '@material-ui/icons/DirectionsBike'
import Terrain from '@material-ui/icons/Terrain'

export interface Props{
    hikingArr:any;
    bikingArr:any;
    climbingArr:any;
}

export interface State{
    
}

class TrailResults extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            
        }
    }
    
    render(){
        const {hikingArr, bikingArr, climbingArr} = this.props;
        return(
            <div style={{width:'100%'}}>
                {
                    hikingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionWalk />} type='hiking' />
                    })
                }

                {
                    bikingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionBike />} type='biking'/>
                    })
                }

                {
                    climbingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<Terrain />} type='climbing'/>
                    })
                }
            </div>
        )
    }
}

export default TrailResults;