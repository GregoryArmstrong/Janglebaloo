import React from 'react';
import SongListItem from './song-list-item';

const SongList = ({ songs }) => {
  return (
    <div className="song-list">
      {songs.map(song => <SongListItem key={song.songName} {...song} />)}
    </div>
  );
};

module.exports = SongList;
