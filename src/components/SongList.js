import React, { useState, useEffect } from 'react';
import SongItem from './SongItem';
import './SongList.css';

function SongList({ songs, currentSongIndex, setCurrentSongIndex }) {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    // Fetch duration for each song
    songs.forEach((song) => {
      const audio = new Audio(song.url);
      audio.addEventListener('loadedmetadata', () => {
        setDurations((prevDurations) => ({
          ...prevDurations,
          [song.id]: audio.duration,
        }));
      });
    });
  }, [songs]);

  const formatDuration = (duration) => {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="song-list">
      <ul>
        {songs.map((song, index) => (
          <SongItem
            key={song.id}
            name={song.name}
            artist={song.artist}
            cover={`https://cms.samespace.com/assets/${song.cover}`}
            onClick={() => setCurrentSongIndex(index)}
            isActive={index === currentSongIndex}
            duration={formatDuration(durations[song.id])}
          />
        ))}
      </ul>
    </div>
  );
}

export default SongList;
