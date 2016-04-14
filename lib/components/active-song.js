import React from 'react';
import path from 'path';
import store from '../store';

const ActiveSong = ( state ) => {
  if (!state.song) { return <div className="active-song">Please select a song.</div>; }
  const songName = path.basename(state.song.songName);

  return (
    <div className="active-song">
      <h3>{songName}</h3>
      <h4>{ formatTime(state.currentTime) }</h4>
      <button onClick={ () => store.previous() }>Previous</button>
      <button onClick={ () => store.play() }>Play</button>
      <button onClick={ () => store.stop() }>Stop</button>
      <button onClick={ () => store.next() }>Next</button>
    </div>
  );
};

function formatTime(currentTime) {
  let minutes = Math.floor(currentTime / 59);
  if (!Number.isInteger(minutes)) { return "0:00"; }

  let seconds = (currentTime % 59).toFixed();
  if ( seconds <= 9 ) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

module.exports = ActiveSong;
