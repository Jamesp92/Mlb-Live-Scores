import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const UpcomingGamesView = ({ games, currentGameIndex }) => (
  games.length > 0 && (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      height="100vh"
      width="100vw"
      position="fixed"
      top="0"
      left="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="black"
    >
      <Flex flexDirection="column" alignItems="center" key={games[currentGameIndex].idEvent}>
        <Flex justifyContent="center" alignItems="center" gap="4">
          <Image src={games[currentGameIndex].strAwayTeamBadge} boxSize="50px" objectFit="cover" alt={`${games[currentGameIndex].strAwayTeam} Logo`} marginRight="5" />
          <Text fontSize="3xl" fontWeight="bold" color="white">@</Text>
          <Image src={games[currentGameIndex].strHomeTeamBadge} boxSize="50px" objectFit="cover" alt={`${games[currentGameIndex].strHomeTeam} Logo`} marginLeft="5" />
        </Flex>
        <Text fontSize="lg" fontWeight="bold" color="white" marginTop="2">{games[currentGameIndex].strEventAlternate}</Text>
      </Flex>
    </MotionBox>
  )
);

export default UpcomingGamesView;  // Change to default export
