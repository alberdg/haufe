import React from 'react';
import { shallow } from 'enzyme';
import CharacterList from '../';
import CharacterCard from '../../character-card';

import {
  CHARACTERS_LIST_RESPONSE,
} from '../../../../test';

let wrapped;

beforeAll(async () => {
  wrapped = shallow(<CharacterList characters={CHARACTERS_LIST_RESPONSE.results}/>);
});

describe('Characters list tests', () => {
  it('Renders a character list', () => {
    expect(wrapped.find('#character-list').length).toEqual(1);
  });

  it('Renders a correct amount of character cards', () => {
    expect(wrapped.find(CharacterCard).length).toEqual(CHARACTERS_LIST_RESPONSE.results.length);
  })
})
