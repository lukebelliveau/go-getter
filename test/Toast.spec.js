import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import Toast from '../src/Toast';

describe('Toast', () => {
  chai.use(chaiEnzyme());
  it('should display message when show prop is true', () => {
    const message = "Congrats!";
    const toast = shallow(<Toast show={ true } message={ message } />);

    expect(toast.html()).to.contain(message);
  });

  it('should not render when show prop is false', () => {
    const toast = shallow(<Toast show={ false } message="" />)

    expect(toast.html()).to.be.null;
  })
});