import React from "react";
const Song = ({currentSong}) => {
    return (
        <div className="song-container">   
        <img style={{boxShadow: `3px 3px 100px ${currentSong.color[1]}`}}  alt={currentSong.name} src={currentSong.cover}></img>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
        </div>
    );
}

export default Song;