import React from 'react';
import './Tabs.css';

function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'For You' ? 'tab active' : 'tab'}
        onClick={() => onTabChange('For You')}
      >
        For You
      </button>
      <button
        className={activeTab === 'Top Tracks' ? 'tab active' : 'tab'}
        onClick={() => onTabChange('Top Tracks')}
      >
        Top Tracks
      </button>
    </div>
  );
}

export default Tabs;
