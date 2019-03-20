import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import MapMarker from '../../Account/MapMarker/MapMarker';

//materialUI imports
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  mapDiv:{
    height:'80vh',
    width:'90vw',
    marginLeft:'auto',
    marginRight:'auto',
    border:'2px solid #757575'
  }
})

export interface Props {
  classes:{
    mapDiv:string;
  }
}

export interface State {}

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes} = this.props;
    return (
    <div className={classes.mapDiv}>
      <GoogleMapReact
                bootstrapURLKeys={{ key: ''}}
                defaultCenter={{lat:38.4855, lng: -109.232}}
                defaultZoom={8}
                options={{mapTypeId:'terrain'}}
            >   
                <MapMarker lat={38.4855} lng={-109.232} favorite={false} />
            </GoogleMapReact>
    </div>
    );
  }
}

export default withStyles(styles)(Map);
