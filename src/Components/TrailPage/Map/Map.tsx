import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import MapMarker from '../../Account/MapMarker/MapMarker';

//materialUI imports
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  mapDiv:{
    height:'80vh',
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    border:'2px solid #757575'
  }
})

export interface Props {
  classes:{
    mapDiv:string;
  },
  longitude:number,
  latitude:number
}

export interface State {}

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes, longitude, latitude} = this.props;
    return (
    <div className={classes.mapDiv}>
      <GoogleMapReact
                bootstrapURLKeys={{ key: ''}}
                yesIWantToUseGoogleMapApiInternals
                center={{lat:latitude, lng: longitude}}
                zoom={8}
                options={{mapTypeId:'terrain'}}
            >   
                <MapMarker lat={latitude} lng={longitude} favorite={false} />
            </GoogleMapReact>
    </div>
    );
  }
}

export default withStyles(styles)(Map);
