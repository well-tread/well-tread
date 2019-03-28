import React from 'react';
import Login from './Login';
import renderer from 'react-test-renderer';

it('login dialog renders correctly', ()=>{
    const tree = renderer
    .create(<Login location={{search:'/'}} LinkButton='' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})