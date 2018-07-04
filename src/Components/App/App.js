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
  this.state = {searchResults: [], playlistName: 'Da Jamz', playlistTracks: []};
  this.state.searchResults = [
    {
      name: 'Heart Shaped Box',
      artist: 'Nirvana',
      album: 'In Utero',
      id: '1'
    },
    {
      name: 'Tiny Dancer',
      artist: 'Tim McGraw',
      album: 'Love Story',
      id: '2'
    },
    {
      name: 'Stronger',
      artist: 'Brittney Spears',
      album: 'Oops! I did it again',
      id: '3'
    }
    ];

    this.state.playlistTracks = [
      {
        name: 'Right This Second',
        artist: 'Deadmau5',
        album: 'Random Album Title Here',
        id: '1'
      },
      {
        name: 'Mad Hatter',
        artist: 'Melanie Martinez',
        album: 'CryBaby',
        id: '2'
      }
    ];

    //binding the methods with this
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
}

addTrack(track){
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
  }let currentTracks = this.state.playlistTracks;
  currentTracks.push(track);
  this.setState(this.state.playlistTracks: currentTracks);
}

removeTrack(track){
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
    let currentTracks = this.state.playlistTracks;
    currentTracks.remove(track);
    this.setState(this.state.playlistTracks: currentTracks);
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
