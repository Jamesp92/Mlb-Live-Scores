import { useState, useEffect } from 'react';

const fetchGames = async () => {
  const endpoint = 'https://us-central1-mariners-live-scores.cloudfunctions.net/fetchNextMarinersGames';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const useGamesData = () => {
  const [games, setGames] = useState([]);
  const [liveGame, setLiveGame] = useState(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const events = await fetchGames();
      const live = events.find(game => game.strStatus !== "NS" && game.strStatus !== "FT");
      if (live) {
        setLiveGame(live);
        setGames([]);
      } else {
        const upcoming = events.filter(game => game.strStatus === "NS");
        setGames(upcoming);
      }
    };

    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentGameIndex(prevIndex => (prevIndex + 1) % games.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(rotationInterval);
  }, [games.length]);

  return { games, liveGame, currentGameIndex };
};
