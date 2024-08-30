import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle as faPlay, faPauseCircle as faPause, faVolumeUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons'; 
import { ForwardOutlined, BackwardOutlined } from '@ant-design/icons';
import './Player.css';

function Player({ song, isPlaying, onPlayPause, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.url; // Set the audio source
      audioRef.current.load();
      setProgress(0); // Reset progress on song change
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = audioRef.current.currentTime;
      const songDuration = audioRef.current.duration;
      setProgress((currentTime / songDuration) * 100);
      setDuration(songDuration);
    };

    const handleEnded = () => {
      onNext(); // Automatically move to the next song when the current one ends
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [onNext]);

  const progressBarStyle = {
    width: `${progress}%`,
  };

  return (
    <div className="player">
      <div className="songs-details">
        <h3 className="songs-name">{song?.name || 'No Song Playing'}</h3>
        <p className="songs-artist">{song?.artist || 'Unknown Artist'}</p>
      </div>
      <img src={song?.cover ? `https://cms.samespace.com/assets/${song.cover}` : 'default-cover.jpg'} alt={song?.name} className="songs-image" />
      <div className="progress-bar">
        <div className="progress-bar-filled" style={progressBarStyle} />
      </div>
      <div className="controls">
        <FontAwesomeIcon icon={faEllipsisH} className="control-icon gray-background" />
        <BackwardOutlined className="control-icon" onClick={onPrev} />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className="control-icon"
          style={{fontSize:"30px"}}
          onClick={onPlayPause}
        />
        <ForwardOutlined className="control-icon" onClick={onNext} />
        <FontAwesomeIcon icon={faVolumeUp} className="gray-background" />
      </div>
     
      <audio ref={audioRef} />
    </div>
  );
}

export default Player;
