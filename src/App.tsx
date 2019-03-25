import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import firebase from './firebase';
import axios from 'axios';

import {updateUID, updateTopBiking, updateTopHiking, 
  updateTopRunning, updateDisplayName, updateProfilePicture,
  updateFavorites, updateCompletes, updateIsAnonymous
} from './ducks/reducer';
import {connect} from 'react-redux';

import routes from './routes';
import { withRouter,RouteComponentProps } from 'react-router';
import './App.css';

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
  param1: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
  updateUID:(uid:string)=>void,
  updateTopHiking:(trails:any)=>void,
  updateTopBiking:(trails:any)=>void,
  updateTopRunning:(trails:any)=>void,
  updateDisplayName:(displayName:string)=>void,
  updateProfilePicture:(profilePicture:string)=>void,
  updateCompletes:(completes:any)=>void,
  updateFavorites:(favorites:any)=>void,
  updateIsAnonymous:(isAnonymous:boolean)=>void
}


class App extends React.Component<PropsType> {
  constructor(props:PropsType){
    super(props);
    this.displayLocationInfo = this.displayLocationInfo.bind(this);
  }

  componentDidMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log(user.uid, "UPDATING IN APP")
        this.props.updateUID(user.uid);
        this.props.updateIsAnonymous(user.isAnonymous);

        firebase
        .database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then(snapshot1 => {
          if(snapshot1.val()){
            let displayName = snapshot1.val().displayName;
            if (displayName && displayName.displayName) {
              displayName = displayName.displayName;
            } else {
              displayName = '';
            }

            let profilePicture = snapshot1.val().profilePicture;
            if (profilePicture && profilePicture.profilePicture) {
              profilePicture = profilePicture.profilePicture;
            } else {
              profilePicture = '';
            }

            let favorites = snapshot1.val().favorites;
            if (favorites && favorites.favorites) {
              favorites = favorites.favorites;
            } else {
              favorites = [];
            }

            let completes = snapshot1.val().completes;
            if (completes && completes.completes) {
              completes = completes.completes;
            } else {
              completes = [];
            }

            this.props.updateDisplayName(displayName)
            this.props.updateProfilePicture(profilePicture);
            this.props.updateFavorites(favorites);
            this.props.updateCompletes(completes);
            
          }
        })
      }
      
    })
  }

  // componentDidUpdate(prevProps: Props, prevState: State) {
  //   // // const { hikingArr, bikingArr, runningArr, isResultsBack } = this.state;
  //   // if (
  //   //   !isResultsBack &&
  //   //   (hikingArr.length > 0 || bikingArr.length > 0 || runningArr.length > 0)
  //   // ) {
  //   //   console.log('updating');
  //   //   this.setState({ isResultsBack: true });
  //   // }
  // }

  displayLocationInfo = (position: any) => {
    // this.setState({
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude
    // });
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    // axios.post('/trails/weatherP', {
    //   lat: lat,
    //   lng: lng
    // });



    axios
      .post('/trails/getPopularBTrails', {
        lat: lat,
        lng: lng
      })

      .then(res => {
        const response = res.data;
        console.log('updating top biking in app',response)
        this.props.updateTopBiking(response);
      });
    axios
      .post('/trails/getPopularHTrails', {
        lat: lat,
        lng: lng
      })

      .then(res => {
        const response = res.data;
        
        
        this.props.updateTopHiking(response);
        
      });
      axios
      .post('/trails/getPopularRTrails', {
        lat: lat,
        lng: lng
      })

      .then(res => {
        const response = res.data;
        
        this.props.updateTopRunning(response);
      });

    
  };

  render() {
    return (
      <div className="App">
      {this.props.history.location.pathname === '/login' ? null : <Navbar/>}
      {/* <Navbar/> */}
      {routes}
      </div>
    );
  }
}

const mapStateToProps =(state:any) => {
  return{
      uid:state.uid,
      topHiking:state.topHiking,
      topBiking:state.topBiking,
      topRunning:state.topRunning,
      displayName:state.displayName,
      profilePicture:state.profilePicture
  }
};

export default withRouter(connect(mapStateToProps, 
  {updateUID, updateTopHiking, updateTopBiking, updateTopRunning,
  updateDisplayName, updateProfilePicture, updateFavorites, updateCompletes, updateIsAnonymous})(App));