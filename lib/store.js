import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let songs = [];

const store = new EventEmitter();

store.all = () => songs.concat([]);

store.add = ({ songName }) => {
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

store.deselect = () => {
  songs = songs.map(song => Object.assign({}, song, { active: false }));
  store.emit('change', songs);
};

ipcRenderer.on('song-opened', (event, song) => {
  store.add(song);
});

export default store;
