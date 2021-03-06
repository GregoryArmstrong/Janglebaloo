const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const fs = require('fs');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 900});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

const openSong = () => {
  const songs = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'MP3 Files', extensions: ['mp3'] }
    ]
  });

  if (!songs) { return; }

  const songName = songs[0];

  app.addRecentDocument(songName);

  mainWindow.webContents.send('song-opened', { songName } );
};

exports.openSong = openSong;
