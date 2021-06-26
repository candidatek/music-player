import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";

const LibrarySong = ({songs, song , setCurrentSong ,id, audioRef, isPlaying,setSongs , libraryStatus}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        // add active state
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return {
                    ...song,
                    active: true,
                };
            }
            else{
                return {
                    ...song,
                    active: false
                };
            }
        }) 
        setSongs(newSongs);
        //playAudio(isPlaying, audioRef);
        if(isPlaying) audioRef.current.play();
      
    }
    return (
        <button tabIndex={`${libraryStatus ? "0" : "-1"}`}>
        <div className={`library-song ${song.active ? "selected" : ""}`} 

        onClick={songSelectHandler} >   
        <img alt={"image " + song.name} src={song.cover}></img>
        <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
        </div>
        </button>
    );
}

export default LibrarySong;