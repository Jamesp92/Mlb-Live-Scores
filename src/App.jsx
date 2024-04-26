import * as React from 'react';
import { Box,  } from '@chakra-ui/react';
import MarinersGames from './components/MarinersGames';


function App() {
  return (
    <Box bg="gray.800" minH="100vh" color="white">
      <MarinersGames />
    </Box>
  );
}

export default App;
