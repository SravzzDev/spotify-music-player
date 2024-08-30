import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Sidebar.css';
import userAvatar from '../assests/profile.jpeg'; // Adjust the path as necessary

function Sidebar({ backgroundColor }) {
  return (
    <div className="sidebar" style={{ backgroundColor }}>
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
        <h1>Spotify</h1>
      </div>
      <div className="user-avatar">
        <img src={userAvatar} alt="User Avatar" className="user-icon" />
      </div>
    </div>
  );
}

export default Sidebar;
