import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';
import fetchMock from 'fetch-mock';

import App from '../src/App';

describe('App', () => {
  chai.use(chaiEnzyme());

  it('should GET by brand and display on page', () => {
    const waitForSample = createWaitForElement('#searchResults');
    const brands = ['Brand 1', 'Brand 2'];
    fetchMock.get('*', brands);
    const app = mount(<App />);
    const input = app.find({ name: 'brandInput' });

    input.simulate('change', { target: { value: brands[1] } });

    return waitForSample(app)
      .then((app) => {
        const results = app.find('#searchResults');
        expect(results.text()).to.include('Brand 1');
        expect(results.text()).to.include('Brand 2');
      });
  });
});
