import React, { useRef, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

//import data
import data from "./utils";

//components
import Song from "./components/Song";
import Play from "./components/Play";
import Library from "./components/Library";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;

    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.5) transparent;
  }

  *::-webkit-scrollbar {
    width: 5px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(155,155,155,0.5);
    border-radius: 20px;
    border: transparent;
  }

  body {
    font-family: 'Lato', sans-serif;
  }

  h1,h2,h3 {
    color: rgb(54,54,54);
  }

  h3,h4 {
    color: rgb(100,100,100);
    font-weight: 400;
  }
`;

function App() {
  //Ref
  const audioRef = useRef<HTMLAudioElement>(null);

  //States
  const [songs, setSongs] = useState(data());

  const [currentSong, setCurrentSong] = useState(songs[0]);

  const [isPlaying, setIsPlaying] = useState(false);

  const Theme = {};

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  //Event
  const timeUpdateHandler = (e: any) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const autoPlayHandler = () => {
    if (isPlaying) {
      if (audioRef && audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyle />
        <div>
          <Song currentSong={currentSong} />
          <Play
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            audioRef={audioRef}
          />
          <Library
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            setSongs={setSongs}
          />
        </div>
      </>
      <audio
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </ThemeProvider>
  );
}

export default App;
