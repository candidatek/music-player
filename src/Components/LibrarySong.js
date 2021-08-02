//import { library } from "@fortawesome/fontawesome-svg-core";
import React, { useRef } from "react";

const LibrarySong = ({songs, song , setCurrentSong ,id, audioRef, isPlaying,setSongs , libraryStatus ,setFocus}) => {
    const libraryFocusRef = useRef(null);
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

    const keyPressHandler = (e) => {
        if(e.code === "Enter"){
            songSelectHandler();
        }
    };

    return (
        <div className={`library-song ${song.active ? "selected" : ""}`} 
        id={`library-song ${song.active ? "selected" : ""}`} 
        tabIndex={`${libraryStatus && song.active ? "0" : "-1"}`}
        ref = {libraryFocusRef}        
        onLoad={(libraryStatus && song.active) ? setFocus(libraryFocusRef) : null}
        onKeyPress = {keyPressHandler}
        onClick={songSelectHandler} >   

        <img alt={"image " + song.name} src={song.cover}></img>
        <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
        </div>
    );
}

export default LibrarySong;