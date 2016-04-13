import React from 'react';
import path from 'path';
import store from '../store';


const ActiveSong = ({ song }) => {
  if (!song) { return <div className="active-song">Please select a song.</div> }
  const songName = path.basename(song.songName);

  return (
    <div className="active-song">
      <h3>{songName}</h3>
      <button onClick={ () => store.play( song ) }>Play</button>
      <button onClick={ () => store.stop() }>Stop</button>
    </div>
  );
};

module.exports = ActiveSong;
