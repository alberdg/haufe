import React from 'react';
import { Link } from 'react-router-dom';
import PreloadImage from 'react-preload-image';
const UNKNOWN = 'Unkown';

const CharacterCard = ({ character }) => {
  const { id, name, status, species, location, episode, image } = character;
  const detailUrl = `/detail/${id}`;

  const renderName = () => {
    return (
      <div className="row">
        <Link to={detailUrl}><h2 className="character-name">{name}</h2></Link>
      </div>
    );
  }

  const renderStatus = () => {
    const statusIconClassName = status === 'Alive' ? 'alive-icon' :
      status === 'Dead' ? 'dead-icon' : 'unknown-icon';
    return (
      <span className="status">
        <span className={`status-icon ${statusIconClassName}`}></span>
        <span className="status-info">{status} - {species}</span>
      </span>
    );
  }

  const renderLocation = () => {
    const locationName = location ? location.name : UNKNOWN;
    return (
      <>
        <div className="row character-location">
          <span className="text-gray">Last known location:</span>
        </div>
        <div className="row character-location-value">{locationName}</div>
      </>
    );
  }

  const renderFirstSeenIn = () => {
    const episodeName = episode ? episode.name : UNKNOWN;
    return (
      <div className="character-first-episode">
        <div className="row">
          <span className="text-gray">First seen in:</span>
        </div>
        <div className="row character-first-episode-value">{episodeName}</div>
      </div>
    );
  }

  return (
    <div className="character-card" key={`character-card-${id}`}>
      <div className="column character-img-column">
        <PreloadImage
          className="haufe-preloader"
          src={image}
          lazy
        />
      </div>
      <div className="column character-info-column">
        {renderName()}
        {renderStatus()}
        {renderLocation()}
        {renderFirstSeenIn()}
      </div>
    </div>
  )
}
export default CharacterCard;
