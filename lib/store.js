import EventEmitter from 'events';
import { ipcRenderer } from 'electron';
import $ from 'jquery';

let songs = [];

const store = new EventEmitter();
const audio = new Audio();
audio.isPlaying = false;

store.once('song-ended', () => {
  store.next();
});
store.on('render-song', () => {
  $('.song-list-item').fadeTo(1000, 1);
});

store.previous = () => {
  toggleAudio();
  var lastSong = songs.findIndex(isActive);
  toggleSelect(lastSong, -1);
};

store.next = () => {
  toggleAudio();
  var lastSong = songs.findIndex(isActive);
  toggleSelect(lastSong, 1);
};

store.all = () => songs.concat([]);

store.add = ({ songName }) => {
  songs = songs.concat({ songName, active: false });
  emitSongChange();
  store.emit('render-song');
};

store.remove = (songName) => {
  songs = songs.filter(song => song.songName !== songName);
  emitSongChange();
};

store.select = (songName) => {
  songs = songs.map( song => {
    if ( song.songName === songName ) {
      return Object.assign({}, song, { active: true });
    }
    return Object.assign({}, song, { active: false });
  });
  emitSongChange();
};

store.play = () => {
  if (audio.isPlaying) { return; }

  var activeSong = songs.filter(song => song.active)[0];

  audio.src = activeSong.songName;
  audio.play();
  toggleAudio();

  audio.addEventListener('timeupdate', () => {
    store.emit('song-timer', audio.currentTime);
  });
  audio.addEventListener('ended', () => {
    store.emit('song-ended');
  });
};

store.stop = () => {
  audio.pause();
  audio.isPlaying = false;
};

store.deselect = () => {
  songs = songs.map(song => Object.assign({}, song, { active: false }));
  emitSongChange();
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

function toggleSelect(lastSong, arrayModifier) {
  store.deselect();
  songs[lastSong + arrayModifier].active = true;
  store.play();
}

function toggleAudio() {
  audio.isPlaying = !audio.isPlaying;
}

function emitSongChange() {
  store.emit('change', songs);
}

export default store;
