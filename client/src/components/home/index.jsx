import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, resetCharactersList } from '../../actions/characters';
import { Redirect } from 'react-router-dom';
import Header from '../header';
import Spinner from '../spinner';
import CharacterList from '../character/character-list';

const Home = () => {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);
  const [ fetchCharactersError, setFetchCharactersError ] = useState(false);
  const [ page, setPage ] = useState(1);
  const { user } = useSelector(state => state.auth);
  const { characters, info } = useSelector(state => state.characters);


  const handleFetchCharacters = () => {
    setLoading(true);
    dispatch(fetchCharacters(page, () => {
      setLoading(false);
    }, () => {
      setLoading(false);
      setFetchCharactersError(true);
    }));
  }

  const handleLoadMoreCharacters = () => {
    if (fetchCharactersError) {
      setFetchCharactersError(false);
      handleFetchCharacters();
      return;
    }
    setPage(page => page + 1);
  }

  useEffect(() => {
    if (page === 1) {
      dispatch(resetCharactersList());
    }
    if (user) {
      handleFetchCharacters();
    }
  }, [ user, page ]);

  if (!user) {
    return <Redirect to="/" />
  }

  const renderCharacterList = () => {
    if (loading) return null;
    return <CharacterList characters={characters}
      fetchCharacters={() => handleLoadMoreCharacters()}
      hasMore={characters.length < info.count}
      totalCount={info.count}
    />
  }

  const renderSpinner = () => {
    if (!loading) return null;
    return <Spinner />
  }

  const renderFetchCharactersError = () => {
    if (!fetchCharactersError) return null;
    return (
      <div className="row error-message">
        <div className="alert alert-error">Error loading characters, please try again</div>
      </div>
    )
  }

  const renderLoadMoreCharacters = () => {
    if (loading) return null;
    return (
      <div className="row mb-3">
        <button id="load-more-characters" className="btn btn-primary" onClick={() => handleLoadMoreCharacters()}>
          Load more characters
        </button>
      </div>
    )
  }
  const renderHome = () => {
    return (
      <>
        <Header />
        {renderSpinner()}
        {renderCharacterList()}
        {renderFetchCharactersError()}
        {renderLoadMoreCharacters()}
      </>
    )
  }

  return renderHome();
}

export default connect(null, { resetCharactersList })(Home);
