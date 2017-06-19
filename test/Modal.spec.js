import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Modal from '../src/Modal';

const props = {
  brand: 'a brand',
  city: 'a city',
  show: true,
  submit: sinon.spy(),
  closeDialog: sinon.spy(),
};

describe('BrandDialog', () => {
  chai.use(chaiEnzyme());
  chai.use(sinonChai);

  let modal;
  beforeEach(() => {
    modal = shallow(<Modal { ...props }/>)
  });
  afterEach(() => {
    props.submit.reset();
    props.closeDialog.reset();
  })

  it('should not display if show is false', () => {
    modal = shallow(<Modal show={ false } />);

    expect(modal.html()).to.be.null;
  });

  describe('click handlers', () => {
    describe('overlay', () => {
      it('calls closeDialog() callback', () => {
        modal.simulate('click', {target: {id: 'overlay'}});
        expect(props.closeDialog).to.have.been.called;
      });
    });

    describe('cancel button', () => {
      it('calls closeDialog() callback', () => {
        modal.simulate('click', {target: {id: 'cancel'}});

        expect(props.closeDialog).to.have.been.called;
      });
    })
    
    describe('submit button', () => {
      it('calls submit() and closeDialog() callbacks when submit button clicked', () => {
        modal.simulate('click', {target: {id: 'submit'}});

        expect(props.submit).to.have.been.called;
        expect(props.closeDialog).to.have.been.called;
      });
    })
  });
});
