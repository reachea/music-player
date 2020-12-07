import React from "react";
import styled from "styled-components";

import LibrarySong from "./LibrarySong";

const LibraryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  background-color: white;
  box-shadow: 2px 2px 50px rgb(204, 204, 204);
  overflow: scroll;

  h2 {
    padding: 2rem;
  }
`;

const LibrarySongs = styled.div``;

interface LibraryProps {
  songs: any;
}

const Library: React.FC<LibraryProps> = ({ songs }): any => {
  return (
    <LibraryContainer>
      <h2>Library</h2>
      <LibrarySongs>
        {songs.map((song: {}) => (
          <LibrarySong song={song} />
        ))}
      </LibrarySongs>
    </LibraryContainer>
  );
};

export default Library;
