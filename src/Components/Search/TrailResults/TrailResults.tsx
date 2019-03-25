import React,{Component} from 'react';
import Result from './Result/Result';
import firebase from '../../../firebase';

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
    uid:string,
    favorites:{id:number, trailtype:string, trail:any}[]
}

class TrailResults extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            uid:'',
            favorites:[]
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user: any) => {
            firebase
              .database()
              .ref(`/users/${user.uid}`)
              .once(`value`)
              .then(snapshot => {
                if (snapshot.val()) {
      
                  let favorites = snapshot.val().favorites;
                  if (favorites && favorites.favorites) {
                    favorites = favorites.favorites;
                  } else {
                    favorites = [];
                  }
      
                  this.setState({
                    uid:user.uid,
                    favorites:favorites
                  });
                }
              });
          })
    }
    
    render(){
        const {hikingArr, bikingArr, climbingArr} = this.props;
        const {uid, favorites} = this.state;
        return(
            <div style={{width:'100%', marginTop:'20px'}}>
                {
                    hikingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionWalk style={{width:'35px', height:'35px'}}/>} type='hiking' uid={uid} favorites={favorites} />
                    })
                }

                {
                    bikingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<DirectionBike style={{width:'35px', height:'35px'}}/>} type='biking' uid={uid} favorites={favorites} />
                    })
                }

                {
                    climbingArr.map((trail:any, i:number) => {
                        return <Result key={i} trail={trail} icon={<Terrain style={{width:'35px', height:'35px'}}/>} type='climbing' uid={uid} favorites={favorites} />
                    })
                }
            </div>
        )
    }
}

export default TrailResults;