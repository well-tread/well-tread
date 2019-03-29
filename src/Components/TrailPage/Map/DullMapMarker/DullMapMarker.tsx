import React, { Component } from 'react';
import PlaceIcon from '@material-ui/icons/Place';

export interface Props {
  lat: number;
  lng: number;
}

function DullMapMarker(props: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(-50% -70%)'
      }}
    >
      <PlaceIcon
        style={{
          color: '#FF5722'
        }}
      />
    </div>
  );
}
export default DullMapMarker;
