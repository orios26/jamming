import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
  render() {
    return (
      <div class="Playlist">
      <input defaultValue ={'New Playlist'}/>
      <TrackList tracks = {this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
      <a class="Playlist-save">SAVE TO SPOTIFY</a>
</div>
    );
  }
}

export default Playlist;
