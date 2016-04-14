import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let songs = [];

const store = new EventEmitter();
const audio = new Audio();
audio.isPlaying = false;

store.once('song-ended', () => {
  store.next();
});

store.previous = () => {
  audio.isPlaying = false;
  var lastSong = songs.findIndex(isActive);
  store.deselect();
  songs[lastSong - 1].active = true;
  store.play();
};

store.next = () => {
  audio.isPlaying = false;
  var lastSong = songs.findIndex(isActive);
  store.deselect();
  songs[lastSong + 1].active = true;
  store.play();
};

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

store.play = () => {
  if (audio.isPlaying) { return; }

  var activeSong = songs.filter(song => song.active)[0];

  audio.src = activeSong.songName;
  audio.play();
  audio.isPlaying = true;

  audio.addEventListener('timeupdate', () => {
    store.emit('song-timer', audio.currentTime);
  });
  audio.addEventListener('ended', () => {
    store.emit('song-ended');
  });
};

store.pause = () => {
  audio.pause();
  audio.isPlaying = false;
};

store.deselect = () => {
  songs = songs.map(song => Object.assign({}, song, { active: false }));
  store.emit('change', songs);
};

store.currentTime = () => {
  if (!audio.isPlaying) { return '0:00'; }

  return audio.currentTime();
};

store.audio = () => {
  return audio;
};

ipcRenderer.on('song-opened', (event, song) => {
  store.add(song);
});

function isActive(element) {
  return element.active;
}

export default store;
