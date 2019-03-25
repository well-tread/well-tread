import React, { Component } from 'react';
import Result from './Result/Result';

//MaterialUI imports
import DirectionWalk from '@material-ui/icons/DirectionsWalk';
import DirectionBike from '@material-ui/icons/DirectionsBike';
import DirectionRun from '@material-ui/icons/DirectionsRun';

export interface Props {
  hikingArr: any;
  bikingArr: any;
  climbingArr: any;
  popularBikingTrails: any;
  popularHikingTrails: any;
}

export interface State {}

class TrailResults extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      hikingArr,
      bikingArr,
      climbingArr,
      popularBikingTrails,
      popularHikingTrails
    } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {hikingArr.map((trail: any, i: number) => {
          return (
            <Result
              key={i}
              trail={trail}
              icon={<DirectionWalk />}
              type='hiking'
            />
          );
        })}
        {popularBikingTrails.map((trail: any, i: number) => {
          return (
            <Result
              key={i}
              trail={trail}
              icon={<DirectionBike />}
              type='biking'
            />
          );
        })}
        {popularHikingTrails.map((trail: any, i: number) => {
          return (
            <Result
              key={i}
              trail={trail}
              icon={<DirectionBike />}
              type='biking'
            />
          );
        })}

        {bikingArr.map((trail: any, i: number) => {
          return (
            <Result
              key={i}
              trail={trail}
              icon={<DirectionBike />}
              type='biking'
            />
          );
        })}

        {climbingArr.map((trail: any, i: number) => {
          return (
            <Result key={i} trail={trail} icon={<DirectionRun />} type='climbing' />
          );
        })}
      </div>
    );
  }
}

export default TrailResults;
