import React from 'react';
import './MenuIcon.css'; 

function MenuIcon({ onClick }) {
  return (
    <div className="menu-icon" onClick={onClick}>
      <span>&#9776;</span> 
    </div>
  );
}

export default MenuIcon;
