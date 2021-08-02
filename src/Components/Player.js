import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay ,faAngleLeft , faAngleRight ,faPause} from '@fortawesome/free-solid-svg-icons';


const Player = ({currentSong,songs ,setSongs, isPlaying ,setIsPlaying, audioRef, songInfo, setSongInfo , setCurrentSong}) => {
    
    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const _onKeyDown = (e) => {
        console.log(e);
        e.stopPropogation();
    }
    //Event handlers
    const playSongHandler = () => {
        audioRef.current.play();
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    const dragHandler= (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
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
        }) ;
        setSongs(newSongs);
    }
    const skipTrackHandler = async (direction) => {
        let totalSongs = songs.length ;
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-fordward'){
            await setCurrentSong(songs[(currentIndex + 1) % totalSongs ]);
            activeLibraryHandler(songs[(currentIndex + 1) % totalSongs ]);
        }

        if(direction === 'skip-back'){
            if((currentIndex -1) % totalSongs === -1){
                await setCurrentSong(songs[totalSongs - 1]);
                activeLibraryHandler(songs[(totalSongs - 1)]);
                if(isPlaying) audioRef.current.play();
                audioRef.current.focus();
                return;
            }
            await setCurrentSong(songs[Math.abs((currentIndex - 1)) % totalSongs ])
            activeLibraryHandler(songs[(currentIndex - 1) % totalSongs ]);
        }
        if(isPlaying) audioRef.current.play();
    };
    const _onKeyPressSkipBack =(e) => {
        if(e.code === "Enter"){
            skipTrackHandler('skip-back');
        }
    }
    const _onKeyPressSkipFrodward= (e) => {
        if(e.code === "Enter"){
            skipTrackHandler('skip-fordward');
        }
    }
    const playPauseKeyHandler= (e) => {
        if(e.code === "Enter"){
            playSongHandler();
        }
    }
// add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };
    return (
        <div className="player">   
            <div className="time-control">
                <p>{songInfo.duration ? getTime(songInfo.currentTime) : '0:00'}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input 
                    min={0} 
                    max={songInfo.duration || 0}
                    onChange={dragHandler}
                    value={songInfo.currentTime} type="range"/>
                        <div style={trackAnim} className="animate-track">
                        </div>
                    </div>
                    
                <p>{getTime(songInfo.duration)}</p>
            </div>

       <div className="play-control">
           <div tabIndex="0" 
           onKeyPress={_onKeyPressSkipBack}
           aria-label="skip back"
           role="button">
                <FontAwesomeIcon 
                className="skip-back"  
                size="2x" 
                onClick={() => skipTrackHandler('skip-back')}
                icon={faAngleLeft}/>   
            </div>
            <div tabIndex="0" 
            onKeyPress={playPauseKeyHandler}
            aria-label={`${isPlaying ? "Pause" : "Play"}`} 
            role="button">
                <FontAwesomeIcon 
                onClick={playSongHandler}
                onKeyPress={_onKeyDown}
                className="play" 
                size="2x" 
                icon={isPlaying ? faPause : faPlay}/>
            </div>

            <div tabIndex="0" 
            aria-label="skip-fordward" 
            onKeyPress={_onKeyPressSkipFrodward}
            role="button">
                <FontAwesomeIcon 
                className="skip-fordward"  
                onClick={() => skipTrackHandler('skip-fordward')}
                size="2x" 
                icon={faAngleRight}/>
            </div>
            </div>
        </div>
    );
}

export default Player;