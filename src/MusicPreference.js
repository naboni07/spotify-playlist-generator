import React, { useState } from 'react';
import axios from 'axios';

function MusicPreference() {
  const [activity, setActivity] = useState("");
  const [playlist, setPlaylist] = useState([]);

  const generatePlaylist = async () => {
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'codellama',
        prompt: `Generate a playlist for ${activity}`
      });
      setPlaylist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="What are you about to do?" />
      <button onClick={generatePlaylist}>Generate Playlist</button>
      {playlist.map((song, index) => <p key={index}>{song}</p>)}
    </div>
  );
}

export default MusicPreference;
