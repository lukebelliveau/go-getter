import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import BrandDialog from '../src/BrandDialog';

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

  let brandDialog;
  beforeEach(() => {
    brandDialog = shallow(<BrandDialog { ...props }/>)
  });
  afterEach(() => {
    props.submit.reset();
    props.closeDialog.reset();
  })

  describe('click handlers', () => {
    describe('overlay', () => {
      it('calls closeDialog() callback', () => {
        brandDialog.simulate('click', {target: {id: 'overlay'}});
        expect(props.closeDialog).to.have.been.called;
      });
    });

    describe('cancel button', () => {
      it('calls closeDialog() callback', () => {
        brandDialog.simulate('click', {target: {id: 'cancel'}});

        expect(props.closeDialog).to.have.been.called;
      });
    })
    
    describe('submit button', () => {
      it('calls submit() and closeDialog() callbacks when submit button clicked', () => {
        brandDialog.simulate('click', {target: {id: 'submit'}});

        expect(props.submit).to.have.been.called;
        expect(props.closeDialog).to.have.been.called;
      });
    })

  });
});