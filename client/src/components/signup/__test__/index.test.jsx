import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import SignUp from '../';
import Root from '../../../Root';

let wrapped;
beforeEach(() => {
  wrapped = mount(<Root><BrowserRouter><SignUp/></BrowserRouter></Root>);
})

afterEach(() => {
  wrapped.unmount();
})

describe('Signup tests', () => {
  it('Renders a title', () => {
    expect(wrapped.find('#signup-title').length).toEqual(1);
  });

  it('Renders a subtitle', () => {
    expect(wrapped.find('#signup-subtitle').length).toEqual(1);
  });

  it('Renders an name input', () => {
    expect(wrapped.find('#name-input').length).toEqual(1);
  });

  it('Renders an email input', () => {
    expect(wrapped.find('#email-input').length).toEqual(1);
  });

  it('Renders a password input', () => {
    expect(wrapped.find('#password-input').length).toEqual(1);
  });

  it('Renders a submit button', () => {
    expect(wrapped.find('#signup-submit').length).toEqual(1);
  });

  it('Renders a log in link', () => {
    expect(wrapped.find('a#log-in').length).toEqual(1);
  });
});
