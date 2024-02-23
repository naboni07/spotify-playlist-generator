import React from "react";
import axios from "axios";

function createPlaylist({ playlistArray }) {
  const access_token = window.localStorage.getItem("token");
  const user_id = window.localStorage.getItem("user_id");
  const playlist_name = "New Spotify AI Playlist";
  const playlist_description = "Some groovy songs found with the help of AI";

  axios
    .post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        name: playlist_name,
        //description: playlist_description,
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // Get the ID of the newly created playlist
      const playlist_id = response.data.id;

      //Initialise array for track_uris to be added 
      const track_uris = [];
      const requests = playlistArray.map((song) => {
        // Search for the songs on Spotify
        return axios
          .get(
            `https://api.spotify.com/v1/search?q=name:${encodeURIComponent(song.title)}album:${encodeURIComponent(song.album)}artist:${encodeURIComponent(song.artist)}&type=track`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // Get the URI of the first search result
            const track_uri = response.data.tracks.items[0].uri;
            track_uris.push(track_uri);
          });
      });

      // Wait for all the search requests to finish, then add the tracks to the new playlist
      Promise.all(requests).then(() => {
        axios
          .post(
            `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            {
              uris: track_uris,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(`New Spotify Playlist ${playlist_name} created!`)    
          });
      });
    });
}

export default createPlaylist;