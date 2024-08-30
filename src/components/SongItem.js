// SongItem.js
import React from 'react';
import './SongItem.css';

const SongItem = ({ name, artist, cover, onClick, isActive, duration }) => {
    return (
        <div
            className={`song-item ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <img src={cover} alt={name} className="song-cover" />
            <div className="song-info">
                <h4 className="song-name">{name}</h4>
                <p className="song-artist">{artist}</p>
            </div>
            <div className="song-duration">
                <p>{duration}</p>
            </div>
        </div>
    );
};

export default SongItem;
