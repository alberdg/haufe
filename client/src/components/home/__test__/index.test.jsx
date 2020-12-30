import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import moxios from 'moxios';
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import Home from '../';
import Root from '../../../Root';
import CharacterList from '../../character/character-list';

import {
  CHARACTERS_LIST_RESPONSE,
  SIGN_IN_BODY,
  FETCH_CHARACTERS_LIST_ROUTE,
} from '../../../test';

let wrapped;
const initialState = {
  auth: {
    user: SIGN_IN_BODY
  }
};

beforeAll(async () => {
  moxios.install();
  wrapped = mount(<Root initialState={initialState}><BrowserRouter><Home /></BrowserRouter></Root>);
  moxios.stubRequest(FETCH_CHARACTERS_LIST_ROUTE, {
    status: 200,
    response: CHARACTERS_LIST_RESPONSE
  })

  await act(async () => {
    await Promise.resolve(wrapped);
    await new Promise(resolve => setImmediate(resolve));
    wrapped.update();
  });
});

afterAll( () => {
  moxios.uninstall();
  wrapped.unmount();
})

describe('Home tests', () => {
  it('Renders a header', () => {
    expect(wrapped.find('#haufe-header').length).toEqual(1);
  });

  it('Renders load more characters button', () => {
    expect(wrapped.find('#load-more-characters').length).toEqual(1);
  });

  it('Renders character list component', () => {
    expect(wrapped.find(CharacterList).length).toEqual(1);
  })

})
