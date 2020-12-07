import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TimeControl = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;

  input {
    width: 100%;
    padding: 1rem 0rem;
  }

  p {
    padding: 1rem;
  }
`;

const PlayControl = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  svg {
    cursor: pointer;
  }
`;

const PlayButton = styled(FontAwesomeIcon)``;

const SkipBack = styled(FontAwesomeIcon)``;

const SkipForward = styled(FontAwesomeIcon)``;

interface PlayProps {
  currentSong: any;
  isPlaying: boolean;
  setIsPlaying: (e: any) => void;
}

const Play: React.FC<PlayProps> = ({
  currentSong,
  isPlaying,
  setIsPlaying,
}): any => {
  //Ref
  const audioRef = useRef<HTMLAudioElement>(null);

  //Event Handlers
  const playSongHandler = () => {
    if (audioRef && audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e: any) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e: any) => {
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setSongInfo({ ...songInfo, currentTime: e.target.value });
    }
  };

  return (
    <Player>
      <TimeControl>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={(e) => dragHandler(e)}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </TimeControl>
      <PlayControl>
        <SkipBack size="2x" icon={faAngleLeft}></SkipBack>
        <PlayButton
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        ></PlayButton>
        <SkipForward size="2x" icon={faAngleRight}></SkipForward>
      </PlayControl>

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </Player>
  );
};

export default Play;
