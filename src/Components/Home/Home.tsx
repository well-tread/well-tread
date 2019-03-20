import React, { Component } from 'react';
import axios from 'axios';

export interface Props {}

export interface State {
  popularBikingTrails: any;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      popularBikingTrails: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=200&minStars=4&maxResults=5&key=200430946-fc66551e94fef44057cb0cc88316bbec`
      )
      .then(res => {
        const response = res.data;
        console.log(res.data.trails);
        this.setState({
          popularBikingTrails: response.trails
        });
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.popularBikingTrails);
    return <div>Best Home Page</div>;
  }
}

export default Home;
