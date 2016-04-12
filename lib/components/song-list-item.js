import React from 'react';
import store from '../store';
import path from 'path';

const SongListItem = (song) => {
  const songName = path.basename(song);

  return (
    <div className="song-list-item">
      <h3 className="song-list-item-title">{song.songName}</h3>
      <button onClick={ () => store.remove(song.songName) }>Remove</button>
      <button onClick={ () => store.select(song.songName) }>Select</button>
    </div>
  );
};

module.exports = SongListItem;
