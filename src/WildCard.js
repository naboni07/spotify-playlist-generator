import React, { useState } from 'react';
import { ImArrowRight2 } from 'react-icons/im';
import axios from 'axios';
import LoadingBar from './loadingBar';
import SpotifyPlaylist from './spotifyPlaylist';

const WildCard = () => {

    const [input, setInput] = useState("");
    const [length, setLength] = useState(10);
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const generatePlaylist = () => {
    setLoading(true);
    setLoaded(false);

    const payload = ({
      temperature: 0,
      max_tokens: 3000,
      model: "text-davinci-003",
      prompt: `You are an assistant that only responds in JSON. 
      Create a list of ${length} unique songs based off the following 
      statement: "${input}". Include "id", "title", "artist", "album" 
      in your response. An example response is: "
      [
        {
            "id": 1,
            "title": "Hey Jude",
            "artist": "The Beatles",
            "album": "The Beatles (White Album)",
            "duration": "4:56"
        }
      ]".`
    });

    console.log(`Payload: ${payload.prompt}`)
    
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
      }
    })
      .then((res) => {
         if (res.status === 200) {
          setLoaded(true)
          setLoading(false);
          //Parse the reponse from OpenAI
          const songs = JSON.parse(res.data.choices[0].text);
          setSongs(songs)
        }else{
          console.log(res.status);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
    };
    
  return (
    <div>
       <p className='spotifyHeader'>Wild Card - Good Luck</p>
       <div className='d-flex'> 
       <input type='text' className='w500 inputField' onChange={(e) => 
        setInput(e.target.value)} placeholder='Eg: Game soundtracks similar 
        to "Crypt of the Necrodancer"'/> 
       <select className='inputField' onChange={(e) => 
        setLength(e.target.value)}>
       <option value={10}>10 songs</option>
        <option value={30}>30 songs</option>
        <option value={50}>50 songs</option>
       </select>
       </div>
       <div>
       <button onClick={()=>generatePlaylist()}>Generate <ImArrowRight2 /></button> 
       {loading ? <LoadingBar /> : null}
       {loaded ? <SpotifyPlaylist playlistArray={songs} /> : null}
       </div>
    </div>
  )
}

export default WildCard