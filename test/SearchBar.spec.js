import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SearchBar from '../src/SearchBar';

describe('SearchBar', () => {
  chai.use(chaiEnzyme());
  chai.use(sinonChai);

  it('should call onChange handler when text is changed', () => {
    const onChange = sinon.spy();
    const brand = 'A Brand';
    const searchBar = shallow(<SearchBar onChange={ onChange } />);

    console.log(searchBar.debug());
    searchBar.find('#brand-search').simulate('change', { target: { value: brand }});

    expect(onChange).to.have.been.called;
  })
});