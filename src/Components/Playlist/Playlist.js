import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

handleNameChange(e){
  const name = e.target.value;
  this.props.onNameChange(name);
}


  render() {
    return (
      <div class="Playlist">
      <input defaultValue ={'New Playlist'} onChange={this.handleNameChange}/>
      <TrackList tracks = {this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
      <a class="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    );
  }
}

export default Playlist;
