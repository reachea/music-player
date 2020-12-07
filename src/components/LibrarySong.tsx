import React from "react";
import styled from "styled-components";

const LibrarySongContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
  cursor: pointer;

  img {
    width: 30%;
  }

  &:hover {
    background-color: rgb(222, 222, 255);
  }
`;

const SongDescription = styled.div`
  padding-left: 1rem;

  h3 {
    font-size: 1rem;
  }

  h4 {
    font-size: 0.7rem;
  }
`;

interface SongProps {
  song: any;
}

const LibrarySong: React.FC<SongProps> = ({ song }): any => {
  return (
    <LibrarySongContainer>
      <img alt={song.name} src={song.cover}></img>
      <SongDescription>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </SongDescription>
    </LibrarySongContainer>
  );
};

export default LibrarySong;
