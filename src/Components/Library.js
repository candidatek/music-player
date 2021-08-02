import React from 'react';
import LibrarySong from "./LibrarySong";

const Library = ({songs , setCurrentSong, audioRef,isPlaying,setSongs , libraryStatus , setFocusApp}) => {
    const setFocus = (libRef) => {
        setFocusApp(libRef);
    }
    const onKeyDown = (e) => {
        console.log(e);
    
    }

    return (
        <div className={`library ${libraryStatus ? "active-library": ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                <LibrarySong 
                setSongs={setSongs}
                id={song.id} 
                setFocus = {setFocus}
                libraryStatus={libraryStatus}
                isPlaying ={ isPlaying}
                key={song.id}
                onKeyPress={onKeyDown}
                audioRef={audioRef}
                songs={songs}
                setCurrentSong={setCurrentSong} 
                song={song}/>)}
            </div>
        </div>
    );
}

export default Library;