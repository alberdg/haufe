import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import moxios from 'moxios';
import { act } from "react-dom/test-utils";
import Signup from '../../components/signup';
import Root from '../../Root';
import { BASE_URL } from '../../constants';

const SIGN_UP_REQUEST = `${BASE_URL}/api/users/signup`;
let wrapped;
beforeEach(() => {
  wrapped = mount(<Root><BrowserRouter><Signup/></BrowserRouter></Root>);
  moxios.install();
  moxios.stubRequest(SIGN_UP_REQUEST, {
    status: 400,
    response: {}
  });
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall();
});

it('Displays a signup error', async ()=> {
  wrapped.find('#signup-submit').simulate('click');
  await act(async () => {
    await Promise.resolve(wrapped);
    await new Promise(resolve => setImmediate(resolve));
    wrapped.update();
    await expect(wrapped.find('.alert-error').length).toEqual(1);
  });

});
