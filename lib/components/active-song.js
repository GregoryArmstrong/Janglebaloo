import React from 'react';
import path from 'path';


const ActiveSong = ({ song }) => {
  if (!song) { return <div className="active-song">Please select a song.</div> }
  const songName = path.basename(song.songName);

  return (
    <div className="active-song">
      <h3>{songName}</h3>
    </div>
  );
};

module.exports = ActiveSong;
