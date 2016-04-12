import React from 'react';

const ActiveSong = ({ song }) => {
  if (!song) { return <div>Please select a song.</div> }

  return (
    <div className="active-song">
      <h3>{song.songName}</h3>
    </div>
  );
};

module.exports = ActiveSong;
