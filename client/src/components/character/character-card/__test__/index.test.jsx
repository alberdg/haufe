import React from 'react';
import { shallow } from 'enzyme';
import CharacterCard from '../';

import {
  CHARACTERS_LIST_RESPONSE,
} from '../../../../test';

let wrapped;
const CHARACTER = CHARACTERS_LIST_RESPONSE.results[0];
beforeAll(() => {
  wrapped = shallow(<CharacterCard character={CHARACTER}/>);
});

describe('Character card tests', () => {
  it('Renders a character card', () => {
    expect(wrapped.find('.character-card').length).toEqual(1);
  });

  it('Renders a character image', () => {
    expect(wrapped.find('.haufe-preloader').length).toEqual(1);
  });

  it('Renders a character name', () => {
    expect(wrapped.find('.character-name').length).toEqual(1);
  });

  it('Renders a character status icon', () => {
    expect(wrapped.find('.status-icon').length).toEqual(1);
  });

  it('Renders a character status info', () => {
    expect(wrapped.find('.status-info').length).toEqual(1);
  });

  it('Renders a character location title', () => {
    expect(wrapped.find('.character-location').length).toEqual(1);
  });

  it('Renders a character location value', () => {
    expect(wrapped.find('.character-location-value').length).toEqual(1);
  });

  it('Renders a character episode title', () => {
    expect(wrapped.find('.character-first-episode').length).toEqual(1);
  });

  it('Renders a character episode value', () => {
    expect(wrapped.find('.character-first-episode-value').length).toEqual(1);
  });
})
