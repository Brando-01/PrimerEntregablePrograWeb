import React, { createContext, useContext, useState, useEffect } from 'react';
import { games as initialGames } from '../data/games';

const GameContext = createContext();

const GAMES_STORAGE_KEY = 'powermagic-games-data';

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem(GAMES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('🔮 Poderes cargados desde localStorage:', parsed.length);
        return parsed;
      }
      console.log('✨ Cargando poderes iniciales desde datos mágicos');
      return initialGames;
    } catch (error) {
      console.error('❌ Error cargando poderes:', error);
      return initialGames;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(games));
      console.log('💾 Poderes guardados en localStorage:', games.length);
    } catch (error) {
      console.error('❌ Error guardando poderes:', error);
    }
  }, [games]);

  const addGame = (gameData) => {
    const newGame = {
      ...gameData,
      id: Math.max(...games.map(g => g.id), 0) + 1,
      reviews: gameData.reviews || [],
      rating: gameData.rating || 0,
      stock: gameData.stock || 10,
      isActive: gameData.isActive !== undefined ? gameData.isActive : true,
      sku: gameData.sku || `PODER-${Date.now()}`,
      featured: gameData.featured || false
    };

    setGames(prev => {
      const newGames = [newGame, ...prev];
      console.log('✨ Nuevo poder agregado:', newGame.title);
      return newGames;
    });
  };

  const updateGame = (id, gameData) => {
    setGames(prev => {
      const updatedGames = prev.map(game => 
        game.id === id ? { ...game, ...gameData } : game
      );
      console.log('✏️ Poder actualizado:', id, gameData);
      return updatedGames;
    });
  };

  const deleteGame = (id) => {
    setGames(prev => {
      const filteredGames = prev.filter(game => game.id !== id);
      console.log('🗑️ Poder eliminado:', id);
      return filteredGames;
    });
  };

  const toggleGameStatus = (id) => {
    setGames(prev => {
      const updatedGames = prev.map(game => 
        game.id === id ? { ...game, isActive: !game.isActive } : game
      );
      console.log('🔄 Estado cambiado para poder:', id);
      return updatedGames;
    });
  };

  const getGameById = (id) => {
    return games.find(game => game.id === id);
  };

  const value = {
    games,
    addGame,
    updateGame,
    deleteGame,
    toggleGameStatus,
    getGameById
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};