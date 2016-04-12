import React, { Component } from 'react';
import store from '../store';
import SongList from './song-list';
import { remote } from 'electron';
import ActiveSong from './active-song';

const { openSong } = remote.require(`${__dirname}/../main`);

store.on('change', () => console.log('CHANGED', store.all()));

class Application extends Component {
  constructor() {
    super();
    this.state = { songs: [] };
  }

  componentDidMount() {
    store.on('change', songs => {
      this.setState({ songs });
    });
  }

  render() {
    let activeSong = this.state.songs.find(song => song.active);

    return (
      <div>
        <div className="controls">
          <button className="controls-open-song" onClick={() => openSong()}>Open Song</button>
          <button className="controls-deselect" onClick={() => store.deselect()}>Close Current Song</button>
        </div>
        <div className="songs">
          <SongList songs={this.state.songs} />
          <ActiveSong song={activeSong} />
        </div>
      </div>
    );
  }
}

export default Application;
