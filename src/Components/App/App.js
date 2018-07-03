import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Track from '../Track/Track';
import TrackList from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
constructor(props){
  super(props);
  this.state = { searchResults: {}};
  this.state.searchResults = [
    {
      name: 'Heart Shaped Box',
      artist: 'Nirvana',
      album: 'In Utero',
      id: 1
    }
    ];
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
}

addTrack(track){
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
  }this.state.playlistTracks.push(track);
}

removeTrack(track){
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
    this.state.playlistTracks.remove(track);
  }
}

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
