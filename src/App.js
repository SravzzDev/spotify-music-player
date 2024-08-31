import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Player from './components/Player';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import MenuIcon from './components/MenuIcon';
const API_URL = 'https://cms.samespace.com/items/songs';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#333'); 
  const [activeTab, setActiveTab] = useState('For You');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get(API_URL);
      setSongs(response.data.data);
      setFilteredSongs(response.data.data);
    };
    fetchSongs();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % filteredSongs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + filteredSongs.length) % filteredSongs.length
    );
  };

  const handleSearch = (query) => {
    const filtered = songs.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };
  useEffect(() => {
    if (filteredSongs[currentSongIndex]) {
      setBackgroundColor(filteredSongs[currentSongIndex].accent);
    }
  }, [currentSongIndex, filteredSongs]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
   
  };
  return (
    <div className="App"  style={{ backgroundColor }}>
       <Sidebar backgroundColor={backgroundColor} />
      <div className="main-content">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBar onSearch={handleSearch} backgroundColor={backgroundColor} />
        <div className={`song-list-container ${isMenuOpen ? 'open' : ''}`}>
        <SongList
          songs={filteredSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
        />
      </div>
      <MenuIcon onClick={toggleMenu} />
      </div>
      <Player
        song={filteredSongs[currentSongIndex]}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}

export default App;
