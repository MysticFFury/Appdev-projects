/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

// Full navigation stack uses animations + InteractionManager; avoid in Jest.
jest.mock('../src/navigations', () => {
  const react = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () => react.createElement(View),
  };
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
