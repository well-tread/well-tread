import React from 'react'
import Navbar from './Navbar'
import renderer from 'react-test-renderer'

it('renders the navbar correctly', () =>{
    const tree = renderer
    .create(<Navbar/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

