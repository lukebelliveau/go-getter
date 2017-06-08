import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import { CircularProgress } from 'material-ui';

import Results from '../src/Results';
import { LOADING_RESULTS } from '../src/App';

describe('Results Component', () => {
  chai.use(chaiEnzyme());
  it('should display a loading icon when results are loading', () => {
    const results = shallow(<Results results={ LOADING_RESULTS } />);

    const loadingSpinner = results.find(CircularProgress);

    expect(loadingSpinner).to.exist;
  });
});
