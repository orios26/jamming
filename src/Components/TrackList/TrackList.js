import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render(){
    return (
      <div class="TrackList">
    {this.props.tracks.map(track =>
    <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>)}
    {this.props.track.name}
    {this.props.track.artist}
    {this.props.track.album}
      </div>
    );
  }
}

export default TrackList;
