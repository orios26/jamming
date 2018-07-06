//variables used to gain access to spotify api
let accessToken = '';
let expiresIn = '';
const client_id = '97efc41bb195402ebdbf5afcb0bd9562';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {



  getAccessToken(){
    //if access token exist simply return it
    if(accessToken){
      return accessToken;
    }
    //access token does not exist. Redircet user and get new token and expiration information
    else{
      const url = 'https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123';
      window.location.href=url;
      const newToken = url.match(/access_token=([^&]*)/);
      const newExpire = url.match(/expires_in=([^&]*)/);

      //get the new token and expiration information and pass it in
      if(newToken && newExpire){
        accessToken = newToken[1];
        expiresIn = newExpire[1];
        //wipe token and expiration
        window.setTimeOUT(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }
      //access token is empty and not in the URL
      else{
        const urlstring = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location.href=urlstring;
      }
    }
  },


  search(term){
    let searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(searchURL, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(
      response => { //used to check if we got a response and then convert response to JSON format
      if (response.ok) {
        return response.json();
      }
        throw new Error('Request failed!');
    },
    networkError => {
      console.log(networkError.message);
    })
        .then(jsonResponse => {
          //if the JSON response returns no tracks we wish to return an empty array
          if(!jsonResponse.tracks){
            return [];
          }
          //otherwise we need to map the tracks to the appropriate properties
          else{
            return jsonResponse.tracks.items.map(track => {
              return {
              id: track.id,
              name: track.name,
              artist: track.artist[0].name,
              album: track.album.name,
              uri: track.uri
            };
            });
          }
        });
  },

savePlaylist(playlistName, trackURIs){
  const token = this.getAccessToken();
  const headers = {Authorization: `Bearer ${token}`};
  let user_id = '';
  if(!playlistName&&!trackURIs){
    return;
  }
  else{
    //make request to spotify API
    return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response =>{
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => {
      console.log(networkError.message);
    })//we now convert response to JSON format and get user ID
    .then(jsonResponse =>{
      user_id = jsonResponse.id;
      console.log(user_id);
      //use the userID to create a playlist and return a PlaylistID
      return fetch(`https://api.spotify.com/v1users/${user_id}/playlist`, {
        header: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      })
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request Failed');
      }, networkError => {
        console.log(networkError.message);
      })//we now need to retrieve the playlistID
      .then(jsonResponse =>{
        let playListID = jsonResponse.id;
        console.log(playListID);
        //we will now use the acquired playListID and user_id to add track to the playList
        fetch(`https://api.spotify.com/v1/users/${user_id}/playlist/${playListID}/tracks`,{
          headers: headers,
          method: 'POST',
          body: JSON.strigify({uris: trackURIs})
        })
        .then(response =>{
          if(response.ok){
            return response.json();
          }
          throw new Error('Request Failed');
        }, networkError => {
          console.log(networkError.message);
        });
      })
    });

  }

  }


};

export default Spotify;
