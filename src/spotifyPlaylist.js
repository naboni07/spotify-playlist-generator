import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import createPlaylist from "../hooks/createPlaylist";

function SpotifyPlaylist({ playlistArray }) {
  return (
    <div>
      <button
        onClick={() => createPlaylist({ playlistArray })}>
        Create Playlist
        <FaPlus />
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>  
       {playlistArray.map((song,index )=> {
                      return <tr key={index}>
                        <td>{song.id}</td>
                        <td>{song.title}<br/>{song.artist}</td>
                        <td>{song.album}</td>
                        <td>{song.duration}</td>
                        </tr>;
                  })} 
        </tbody>
      </table>
    </div>
  );
}

export default SpotifyPlaylist;