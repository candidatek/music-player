import Song from "./Components/Song";
import React, { useState, useRef } from "react";
import Player from "./Components/Player";
import "./styles/app.scss";
import data from "./data";
import Library from "./Components/Library";
import Nav from "./Components/Nav";
//import { library } from "@fortawesome/fontawesome-svg-core";
//import { faMusic } from "@fortawesome/free-solid-svg-icons";

function App() {
  //Reference
  const audioRef = useRef(null);
  //const libraryRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[6]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  //state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null,
    animationPercentage: 0,
  });
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let roundedCurrent = Math.round(currentTime);
    let roundedDuration = Math.round(duration);
    let animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      duration,
      animationPercentage,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  // const playPauseHandler = async () => {
  //   console.log(audioRef);
  //   if(audioRef !== null){
  //     audioRef.current.play();
  //   if(isPlaying) audioRef.current.play();
  //   setIsPlaying(!isPlaying);
  //   if(!isPlaying) audioRef.current.pause();
  //   setIsPlaying(!isPlaying);
  //   } optional chaining  null coleasing  npm package prettier
  // }

  const setFocus = (libRef) => {
    console.log("From App.js ");
    libRef.current.focus();
  };

  const _onKeyDown = async (e) => {
    if (e.keyCode === 38) {
      if (libraryStatus) {
        const { target } = e;
        target.previousElementSibling.focus();
        e.preventDefault();
      }
    }
    if (e.keyCode === 40) {
      if (libraryStatus) {
        const { target } = e;
        target.nextElementSibling.focus();
        e.preventDefault();
      }
    }

    if (e.keyCode === 81) {
      setLibraryStatus(!libraryStatus);
      //e.preventDefault();
    } else if (e.keyCode === 27) {
      if (libraryStatus) setLibraryStatus(!libraryStatus);
    }
  };
  document.addEventListener("keydown", _onKeyDown);
  let backgroundStyle = {
    backgroundColor: currentSong.color[0],
    opacity: 1,
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <div>
        <Nav
          libraryStatus={libraryStatus}
          audioRef={audioRef}
          //libraryQueueRef={libraryQueueRef}
          onKeyDown={_onKeyDown}
          setLibraryStatus={setLibraryStatus}
        />

        <Song currentSong={currentSong} />

        <Player
          currentSong={currentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          setIsPlaying={setIsPlaying}
        />

        <Library
          audioRef={audioRef}
          songs={songs}
          setFocusApp={setFocus}
          libraryStatus={libraryStatus}
          isPlaying={isPlaying}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
        />

        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          onEnded={songEndHandler}
          src={currentSong.audio}
        />
      </div>
    </div>
  );
}

export default App;
