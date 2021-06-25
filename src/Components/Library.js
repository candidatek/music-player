import React from 'react';
import LibrarySong from "./LibrarySongs";

const Library = ({songs , setCurrentSong, audioRef,isPlaying,setSongs , libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? "active-library": ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                <LibrarySong 
                setSongs={setSongs}
                id={song.id} 
                isPlaying ={ isPlaying}
                key={song.id}
                audioRef={audioRef}
                songs={songs}
                setCurrentSong={setCurrentSong} 
                song={song}/>)}
            </div>
        </div>
    );
}

export default Library;