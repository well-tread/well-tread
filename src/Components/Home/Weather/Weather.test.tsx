import React from 'react';
import Weather from './Weather';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../../ducks/store';

test('Checking if Weather component is rendering correctly', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Weather />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
describe('unit test for Weather', () => {});
