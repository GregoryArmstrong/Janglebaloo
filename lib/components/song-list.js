import React from 'react';
import SongListItem from './song-list-item';

const SongList = ({ songs }) => {
  return (
    <div className="song-list">
      <ul>
        {songs.map(song => <li><SongListItem key={song.songName} {...song} /></li>)}
      </ul>
    </div>
  );
};

module.exports = SongList;
