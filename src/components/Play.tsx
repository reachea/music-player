import React from "react";
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
  setSongInfo: any;
  songInfo: any;
  audioRef: any;
}

const Play: React.FC<PlayProps> = ({
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  audioRef,
  currentSong,
}): any => {
  //Ref

  //Event Handlers
  const playSongHandler = () => {
    if (audioRef && audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
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
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={(e) => dragHandler(e)}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : getTime(0)}</p>
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
    </Player>
  );
};

export default Play;
