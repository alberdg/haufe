import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Login from '../';
import Root from '../../../Root';

let wrapped;
beforeEach(() => {
  wrapped = mount(<Root><BrowserRouter><Login/></BrowserRouter></Root>);
})

afterEach(() => {
  wrapped.unmount();
})

describe('Login tests', () => {
  it('Renders a title', () => {
    expect(wrapped.find('#login-title').length).toEqual(1);
  });

  it('Renders a subtitle', () => {
    expect(wrapped.find('#login-subtitle').length).toEqual(1);
  });

  it('Renders an email input', () => {
    expect(wrapped.find('#email-input').length).toEqual(1);
  });

  it('Renders a password input', () => {
    expect(wrapped.find('#password-input').length).toEqual(1);
  });

  it('Renders a submit button', () => {
    expect(wrapped.find('#login-submit').length).toEqual(1);
  });

  it('Renders a create account link', () => {
    expect(wrapped.find('a#create-account').length).toEqual(1);
  });
});
