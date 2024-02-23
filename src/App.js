import './App.css';
import React, { useState, useEffect } from 'react';
import { BsSpotify } from 'react-icons/bs';
import ChatGpt from './components/chatGpt';
import MusicPreference from './MusicPreference';


function App() {

const [token, setToken] = useState("")

useEffect(() => {
  const hash = window.location.hash
  let token = window.localStorage.getItem("token")
  if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
  }
  setToken(token)
}, [])

useEffect(() => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");
  if (!token && hash) {
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
    window.location.hash = "";
    window.localStorage.setItem("token", token);
  }
  setToken(token);

  // Call getUserId after setting the token
  if (token) {
    getUserId(token);
  }
}, []);

const getUserId = async (access_token) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });
  const res = await response.json();
  if(res.error){
    setToken("")
    window.localStorage.removeItem("token")
    return;
  }
  window.localStorage.setItem("user_id", res.id)
};

const spotifyLogin = () => {
  const clientId = "39c21cdf6d234a48a434e7c62690ba0c";
  const redirectUri = "http://localhost:3000"
  const scopes = ['playlist-modify-public'];
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  window.location = url;
};

function App() {
  // ...existing code...

  const [token, setToken] = useState("");


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify AI <BsSpotify /></h1>
        {token ? 
          <>
            <ChatGpt />
            <MusicPreference />
          </>
        : <button onClick={spotifyLogin}>Login To Start</button>}
      </header>
    </div>
  );
}

  return (
    <div className="App">
      <header className="App-header">
      <h1>Spotify AI <BsSpotify /></h1>
                {token ? 
                  <ChatGpt />
                : <button onClick={spotifyLogin}>Login To Start</button>  }
      </header>
    </div>
  );
}}

export default App;