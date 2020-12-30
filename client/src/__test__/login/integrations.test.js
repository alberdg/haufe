import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import moxios from 'moxios';
import { act } from "react-dom/test-utils";
import Login from '../../components/login';
import Root from '../../Root';
import { BASE_URL } from '../../constants';

const SIGN_IN_REQUEST = `${BASE_URL}/api/users/signin`;
let wrapped;
beforeEach(() => {
  wrapped = mount(<Root><BrowserRouter><Login/></BrowserRouter></Root>);
  moxios.install();
  moxios.stubRequest(SIGN_IN_REQUEST, {
    status: 400,
    response: {}
  });
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall();
});

it('Displays an invalid credentials alert', async ()=> {
  wrapped.find('#login-submit').simulate('click');
  await act(async () => {
    await Promise.resolve(wrapped);
    await new Promise(resolve => setImmediate(resolve));
    wrapped.update();
    await expect(wrapped.find('.alert-error').length).toEqual(1);
  });

});
