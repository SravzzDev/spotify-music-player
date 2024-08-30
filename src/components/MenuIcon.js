import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './MenuIcon.css'; // Create MenuIcon.css for styling

const MenuIcon = ({ onClick }) => {
  return (
    <div className="menu-icon" onClick={onClick}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default MenuIcon;
