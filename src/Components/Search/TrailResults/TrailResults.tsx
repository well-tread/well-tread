import React,{Component} from 'react';
import Result from './Result/Result';

//MaterialUI imports
import DirectionWalk from '@material-ui/icons/DirectionsWalk'
import DirectionBike from '@material-ui/icons/DirectionsBike'
import Terrain from '@material-ui/icons/Terrain'
import DirectionRun from '@material-ui/icons/DirectionsRun'

export interface Props{
    hikingArr:any;
    bikingArr:any;
    runningArr:any;
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
        const {hikingArr, bikingArr, runningArr} = this.props;
        return(
            <div style={{width:'100%', marginTop:'20px'}}>
                {
                    hikingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionWalk style={{width:'35px', height:'35px'}}/>} type='hiking' />
                    })
                }

                {
                    bikingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionBike style={{width:'35px', height:'35px'}}/>} type='biking'/>
                    })
                }

                {
                    runningArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionRun style={{width:'35px', height:'35px'}}/>} type='running'/>
                    })
                }
            </div>
        )
    }
}

export default TrailResults;