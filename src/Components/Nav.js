import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const Nav = ({libraryStatus, setLibraryStatus , audioRef , libraryQueueRef}) => {
    return(
        <nav>
            <h1>Waves</h1>

            <button 
            ref={libraryQueueRef}
            onClick={() => {
                setLibraryStatus(!libraryStatus);
                audioRef.current.focus();
            }}>
                 Library Q 
                <FontAwesomeIcon icon={faMusic}/>
            </button>
    
        </nav>
    );
}

export default Nav;