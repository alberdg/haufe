import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import moxios from 'moxios';
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import CharacterDetail from '../';
import CharacterCard from '../../character-card';
import Root from '../../../../Root';
import {
  FETCH_CHARACTER_DETAIL_ROUTE,
  SIGN_IN_BODY,
  CHARACTER_DETAIL_RESPONSE,
} from '../../../../test';

let wrapped;
const initialState = {
  auth: {
    user: SIGN_IN_BODY
  }
};

beforeAll(async () => {
  moxios.install();
  wrapped = mount(<Root initialState={initialState}><BrowserRouter><CharacterDetail match={{ params: { id: 1 }}} /></BrowserRouter></Root>);
  moxios.stubRequest(FETCH_CHARACTER_DETAIL_ROUTE, {
    status: 200,
    response: CHARACTER_DETAIL_RESPONSE
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

describe('Character details tests', () => {
  it('Renders character card', () => {
    expect(wrapped.find(CharacterCard).length).toEqual(1);
  });

  it('Renders favourite switch', () => {
    expect(wrapped.find('#character-detail-switch').length).toEqual(1);
  });

  it('Renders favourite switch text', () => {
    expect(wrapped.find('#character-detail-switch-text').length).toEqual(1);
  })
})
