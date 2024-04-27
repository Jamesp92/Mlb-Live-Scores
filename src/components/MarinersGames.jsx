import React from 'react';
import { Box } from '@chakra-ui/react';
import LiveGameView from './LiveGameView'; // Import without braces for default export
import UpcomingGamesView from './UpcomingGamesView'; // Same as above

import { useGamesData } from '../hooks/useGamesData';

const MarinersGames = () => {
  const { games, liveGame, currentGameIndex } = useGamesData();

  return (
    <Box position="fixed" bottom="0" left="0" width="100%" p={4}>
      {liveGame ? <LiveGameView game={liveGame} /> : <UpcomingGamesView games={games} currentGameIndex={currentGameIndex} />}
    </Box>
  );
};

export default MarinersGames;
