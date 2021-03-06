import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import DullMapMarker from './DullMapMarker/DullMapMarker';
import googleMapKey from '../../../googleMapKey';
import Button from '@material-ui/core/Button';

//materialUI imports
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    mapDiv: {
      height: '80vh',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      border: '2px solid #757575'
    },
    aTag: {
      textDecoration: 'none',
      color: '#FF5722'
    }
  });

export interface Props {
  classes: {
    mapDiv: string;
    aTag: string;
  };
  longitude: number;
  latitude: number;
}

export interface State {}

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, longitude, latitude } = this.props;
    return (
      <div
        style={{
          width: '100vw',
          backgroundColor: '#F7F7F7',
          alignContent: 'center'
        }}
      >
        <div className={classes.mapDiv}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: googleMapKey.key }}
            defaultCenter={{ lat: latitude, lng: longitude }}
            defaultZoom={8}
            options={{ mapTypeId: 'terrain' }}
          >
            <DullMapMarker lat={latitude} lng={longitude} />
          </GoogleMapReact>
        </div>
        <Button style={{ margin: '0 auto', width: '100%' }}>
          <a
            className={classes.aTag}
            target='_blank'
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          >
            Open in Google Maps
          </a>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Map);
