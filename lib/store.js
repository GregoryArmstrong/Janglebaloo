import EventEmitter from 'events';
import { ipcRenderer } from 'electron';
var Player = require('player');

let songs = [];

const store = new EventEmitter();
// const player = new Player();
const audio = new Audio();


store.all = () => songs.concat([]);

store.add = ({ songName }) => {
  // player.add( songName );
  songs = songs.concat({ songName, active: false });
  store.emit('change', songs);
};

store.remove = (songName) => {
  songs = songs.filter(song => song.songName !== songName);
  store.emit('change', songs);
};

store.select = (songName) => {
  songs = songs.map( song => {
    if ( song.songName === songName ) {
      return Object.assign({}, song, { active: true });
    }
    return Object.assign({}, song, { active: false });
  });
  store.emit('change', songs);
};

store.play = ({ songName }) => {
  if (audio.isPlaying) { return; }

  audio.src = songName;
  audio.play();
  audio.isPlaying = true;

  // if (player.isPlaying) { return; }
  //
  // while (player.list[0] !== songName) {
  //   var removedSong = player.list.shift();
  //   player.add(removedSong);
  // }
  //
  // player.play();
  // player.isPlaying = true;
};

store.stop = () => {
  audio.pause();
  audio.isPlaying = false;
};

store.deselect = () => {
  songs = songs.map(song => Object.assign({}, song, { active: false }));
  store.emit('change', songs);
};

ipcRenderer.on('song-opened', (event, song) => {
  store.add(song);
});

export default store;
