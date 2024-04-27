import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const LiveGameView = ({ game }) => (
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
    <Flex justifyContent="center" alignItems="center" gap="4">
      <Image src={game.strAwayTeamBadge} boxSize="50px" objectFit="cover" alt={`${game.strAwayTeam} Logo`} />
      <Text fontSize="lg" fontWeight="bold" color="white">{`${game.intAwayScore} - ${game.intHomeScore}`}</Text>
      <Image src={game.strHomeTeamBadge} boxSize="50px" objectFit="cover" alt={`${game.strHomeTeam} Logo`} />
    </Flex>
    <Text textAlign="center" fontSize="md" color="white">{game.strEventAlternate}</Text>
  </MotionBox>
);

export default LiveGameView; 
