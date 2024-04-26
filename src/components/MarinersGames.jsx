import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const MarinersGames = () => {
  const [games, setGames] = useState([]);
  const [liveGame, setLiveGame] = useState(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const fetchGames = () => {
    const endpoint = 'https://us-central1-mariners-live-scores.cloudfunctions.net/fetchNextMarinersGames';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        if (data && data.events) {
          // Find a live game, if any
          const newLiveGame = data.events.find(game => game.strStatus !== "NS" && game.strStatus !== "FT");
          // If there's a live game, set it and return
          if (newLiveGame) {
            setLiveGame(newLiveGame);
            setGames([]); // Clear upcoming games
            return;
          }
          // If no live game, filter out concluded games
          const upcomingGames = data.events.filter(game => game.strStatus === "NS");
          setGames(upcomingGames);
        } else {
          console.error('Events data is missing or undefined', data);
        }
      })
      .catch(error => console.error('Error fetching games:', error));
  };
  
  // Fetch games on initial render
  useEffect(() => {
    fetchGames();
  }, []);
  
  // Fetch games every minute
  useEffect(() => {
    const interval = setInterval(fetchGames, 60000); // 60000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);
  
  // If there's no live game, rotate through the upcoming games
  useEffect(() => {
    if (games.length > 0) {
      const interval = setInterval(() => {
        setCurrentGameIndex(prevIndex => (prevIndex + 1) % games.length);
      }, 5000); // 5000 ms = 5 seconds
      return () => clearInterval(interval);
    }
  }, [games.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatTimeToLocal = (timeString, dateString) => {
    const dateTimeString = `${dateString}T${timeString}Z`;
    const date = new Date(dateTimeString);
    const options = {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleTimeString('en-US', options).replace(/^0/, ''); 
  };
  const renderLiveGameView = (game) => (
    <MotionBox
        key={game.idEvent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        height="100vh" // Take up the entire screen height
        width="100vw" // Take up the entire screen width
        position="fixed" // Fix the position to ensure overlay
        top="0" // Align to the top
        left="0" // Align to the left
        display="flex" // Use flexbox for centering
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically
        flexDirection="column" // Stack items vertically
        bg="black" // Assuming a dark background, adjust as necessary
    >
        <Flex justifyContent="center" alignItems="center" gap="4">
            <Image src={game.strAwayTeamBadge} boxSize="50px" objectFit="cover" alt={`${game.strAwayTeam} Logo`} />
            <Text fontSize="lg" fontWeight="bold">{`${game.intAwayScore} - ${game.intHomeScore}`}</Text>
            <Image src={game.strHomeTeamBadge} boxSize="50px" objectFit="cover" alt={`${game.strHomeTeam} Logo`} />
        </Flex>
        <Text textAlign="center" fontSize="md">{game.strEventAlternate}</Text>
    </MotionBox>
);
const renderNextGamesView = () => (
  games.length > 0 && games.map((game, index) => (
    index === currentGameIndex && (
      <MotionBox
        key={game.idEvent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        height="100vh" // Take up the entire screen height
        width="100vw" // Take up the entire screen width
        position="fixed" // Fix the position to ensure overlay
        top="0" // Align to the top
        left="0" // Align to the left
        display="flex" // Use flexbox for centering
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically
        flexDirection="column" // Stack items vertically
        bg="black" // Assuming a dark background, adjust as necessary
        color="white" // Set text color to white
      >
        <Flex justifyContent="center" alignItems="center" gap="4">
          <Image src={game.strAwayTeamBadge} boxSize="50px" objectFit="cover" alt={`${game.strAwayTeam} Logo`} marginRight="5" />
          <Text fontSize="3xl" fontWeight="bold">@</Text>
          <Image src={game.strHomeTeamBadge} boxSize="50px" objectFit="cover" alt={`${game.strHomeTeam} Logo`} marginLeft="5" />
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="4">
          <Text textAlign="center" fontSize="md" marginTop="4">{game.strAwayTeam}</Text>
          <Text textAlign="center" fontSize="md" marginTop="4">{game.strHomeTeam}</Text>
        </Flex>
        <Text fontSize="lg" fontWeight="bold" marginTop="2">First Pitch: {formatTimeToLocal(game.strTime, game.dateEvent)}</Text>
        <Text fontSize="md" marginTop="2">{formatDate(game.dateEvent)}</Text>
      </MotionBox>
    )
  ))
);
  return (
    <Box position="fixed" bottom="0" left="0" width="100%" p={4}>
      {liveGame ? renderLiveGameView(liveGame) : renderNextGamesView()}
    </Box>
  );
};

export default MarinersGames;
