import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { CircularProgress } from 'material-ui';

import Results, { ResultList } from '../src/Results';
import { LOADING_RESULTS } from '../src/App';

describe('Results Component', () => {
  chai.use(chaiEnzyme());
  chai.use(sinonChai);

  it('should display a loading icon when results are loading', () => {
    const results = shallow(<Results results={ LOADING_RESULTS } />);

    const loadingSpinner = results.find(CircularProgress);

    expect(loadingSpinner).to.exist;
  });

  it('should call onClick handler when brand button is clicked', () => {
    const onClick = sinon.spy();
    const brands = {
      0: 'Brand 1',
    };
    const result = shallow(<ResultList results={ brands } onClick={ onClick } style={{}}/>).find({ name: brands[0] });

    result.simulate('click');

    expect(onClick).to.have.been.calledWith(brands[0]);
  })
});
