import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchCharacterDetail, resetCharacterDetail, setFavouriteCharacter } from '../../../actions/characters';
import Header from '../../header';
import Spinner from '../../spinner';
import CharacterCard from '../character-card';


import '../character.css';

const CharacterDetail = ({ match }) => {
  const [ loading, setLoading ] = useState(true);
  const [ updating, setUpdating] = useState(false);
  const [ fetchDetailError, setFetchDetailError ] = useState(false);
  const [ updateFavouriteCharacterError, setUpdateFavouriteCharacterError ] = useState(false);
  const { characterDetail, favouriteCharacter } = useSelector(state => state.characters);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { id } = match.params;

  const handleSetFavouriteCharacter = favourite => {
    setUpdating(true);
    setUpdateFavouriteCharacterError(false);
    dispatch(setFavouriteCharacter(id, favourite,() => {
      setUpdating(false);
    }, () => {
      setUpdating(false);
      setUpdateFavouriteCharacterError(true);
    }))
  }

  const loadCharacterDetail = id => {
    dispatch(fetchCharacterDetail(id, () => {
      setLoading(false);
    }, () => {
      setLoading(false);
      setFetchDetailError(true);
    }));
  }

  useEffect(() => {
    if (user) {
      dispatch(resetCharacterDetail());
      if (id) {
        loadCharacterDetail(id);
      }
    }
  }, [ id, user ]);

  if (!user) {
    return <Redirect to='/' />
  }

  const renderUpdateFavouriteCharacterError = () => {
    if (loading || !updateFavouriteCharacterError) return null;
    return (
      <div className="row" id="update-character-favourite-error">
        <div className="alert alert-error">
          Error updating favourites list
        </div>
      </div>
    )
  }
  const renderFetchDetailError = () => {
    if (loading || !fetchDetailError) return null;
    return (
      <div className="row" id="fetch-detail-error">
        <div className="alert alert-error">
          Error fetching character's detail with id: {id}
        </div>
      </div>
    )
  }

  const renderDetail = () => {
    if (loading || fetchDetailError || !characterDetail) return null;
    return (
      <div id="character-detail">
        {renderUpdateFavouriteCharacterError()}
        {renderSpinner(updating, '#FFF')}
        {renderToggleInFavorites()}
        <CharacterCard character={characterDetail} />
      </div>
    );
  }

  const renderSpinner = (renderFlag, color = null) => {
    if (!renderFlag) return null;
    return <Spinner color={color} />
  }

  const renderDetailSpinner = () => {
    return renderSpinner(loading);
  }

  const renderToggleInFavorites = () => {
    if (updating) return null;
    const message = favouriteCharacter ? 'In favourites list' : 'Not in favourites list';
    return (
      <div className="row" id="character-detail-switch">
        <label className="switch">
          <input type="checkbox" checked={favouriteCharacter}
            onChange={(event) => handleSetFavouriteCharacter(event.target.checked)}/>
          <span className="slider round"></span>
        </label>
        <span id="character-detail-switch-text">{message}</span>
      </div>
    );
  }
  const renderCharacterDetail = () => {
    return (
      <>
        <Header />
          {renderDetail()}
          <div id="detail-spinner">
            {renderDetailSpinner()}
          </div>
          {renderFetchDetailError()}
      </>
    )
  }
  return renderCharacterDetail();
}
export default connect(null, { resetCharacterDetail, setFavouriteCharacter})(CharacterDetail);
