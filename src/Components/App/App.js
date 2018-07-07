import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Track from '../Track/Track';
import TrackList from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
constructor(props){
  super(props);
  //creating states for searchResults playlistName and playlistTracks
  //setting playistTracks and searchResults to an array of track objects
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
  this.updatePlayListName = this.updatePlayListName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
}

//method to add a track to playlist if it is not already present
addTrack(track){
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
  }let currentTracks = this.state.playlistTracks;
  currentTracks.push(track);
  this.setState({playlistTracks: currentTracks});
}

//method to remove a track from the playlist
removeTrack(track){
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
    let currentTracks = this.state.playlistTracks;
    currentTracks.remove(track);
    this.setState({playlistTracks: currentTracks});
  }
}

//method to updatePlaylist className
updatePlayListName(name){
  this.setState({playlistName: name});
}

//saveplaylist function
savePlaylist(){
  let trackURIs = [];
  this.state.playlistTracks.forEach(track => {
    trackURIs.push(track.uri);
  });
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
    this.setState({playlistTracks: [], playlistName: ''});
  });
}

//search method
search(term){
  Spotify.search(term).then(tracks => {
    this.setState({searchResults: tracks});
  });
}

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlayListName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
