import React from 'react';
import CharacterCard from '../character-card';
import '../character.css';

const CharacterList = ({ characters, fetchCharacters, hasMore, totalCount, ready }) => {


  const renderCharacter = character => {
    return <CharacterCard character={character} key={`character-${character.id}`} ready={ready}/>
  }

  const renderCharacters = () => {
    return characters.map(character => renderCharacter(character));
  }

  const renderCharacterList = () => {
    return (
      <div id="character-list">
        {renderCharacters()}
      </div>
    )
  }
  if (!Array.isArray(characters) || characters.length === 0) {
    return null;
  }
  return renderCharacterList();
}

export default CharacterList;
