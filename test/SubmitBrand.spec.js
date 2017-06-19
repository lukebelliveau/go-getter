import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createWaitForElement } from 'enzyme-wait';

import SubmitBrand from '../src/SubmitBrand';
import Modal, { ids } from '../src/Modal';
import api from '../src/api';

describe('SubmitBrand', () => {
  chai.use(chaiEnzyme());
  chai.use(sinonChai);
  
  const props = {
    brand: 'a brand',
    show: true,
    closeDialog: sinon.spy(),
  }

  let submitBrandComponent;
  let modal;
  beforeEach(() => {
    submitBrandComponent = mount(<SubmitBrand { ...props }/>)
    modal = submitBrandComponent.find(Modal);
  });

  it('should initialize with toast not rendered', () => {
    const toast = submitBrandComponent.find('#toast');

    expect(toast).to.not.exist;
  });

  describe('modal', () => {
    it('should have a header with selected brand name', () => {
      const header = submitBrandComponent.find('#modal-header');

      expect(header.html()).to.contain(props.brand);
    });
  });

  describe('submitting a registration', () => {
    const city = 'New York';
    const responseMessage = 'Response Message';
    const registerBrandInCity = sinon.stub(api, 'registerBrandInCity').resolves(responseMessage)
    beforeEach(() => {
      const input = submitBrandComponent.find(`#input-city`)
      input.simulate('change', {target: {value: city}});

      const submitButton = submitBrandComponent.find('#submit');
      submitButton.simulate('click');
    })
    it('should call API to register brand when Submit button is clicked', () => {
      expect(registerBrandInCity).to.have.been.calledWith(props.brand, city);
    });

    it('should reset and close dialog after submitting registration', () => {
      expect(submitBrandComponent.state('dialog')).to.eql({ city: '' })
      expect(props.closeDialog).to.have.been.called;
    })

    it('should open toast when response received', () => {
      const waitForToast = createWaitForElement('#toast');

      return waitForToast(submitBrandComponent)
        .then(brandComponent => {
          const toast = brandComponent.find('#toast');

          expect(toast.text()).to.equal(responseMessage);
        });
    })
  })
});