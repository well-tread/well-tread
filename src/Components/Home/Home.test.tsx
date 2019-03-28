import React from 'react';
import Home from './Home';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../ducks/store';

describe('snapshot', () => {
  test('Checking if Home component is rendering correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
