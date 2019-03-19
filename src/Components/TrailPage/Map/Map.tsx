import React, { Component } from "react";

export interface Props {}

export interface State {}

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Map</div>;
  }
}

export default Map;
