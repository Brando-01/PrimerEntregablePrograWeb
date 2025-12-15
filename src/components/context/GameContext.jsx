import React, { createContext, useContext, useState, useEffect } from 'react';
import API_BASE from '../../config/api';

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
    } catch (error) {
      console.error('❌ Error cargando poderes:', error);
    }
    // start empty and fetch from backend on mount (do not bundle static data)
    return [];
  });

  // Fetch games from backend on mount
  useEffect(() => {
    let mounted = true;
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/games`);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setGames(data);
          try { localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
          console.log('✅ Juegos cargados desde backend');
        }
      } catch (err) {
        console.warn('⚠️ No se pudo cargar juegos desde backend, usando datos locales', err.message);
      }
    };
    fetchGames();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(games));
      console.log('💾 Poderes guardados en localStorage:', games.length);
    } catch (error) {
      console.error('❌ Error guardando poderes:', error);
    }
  }, [games]);

  const addGame = async (gameData) => {
    try {
      const res = await fetch(`${API_BASE}/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      if (!res.ok) throw new Error('Failed to create on backend');
      const created = await res.json();
      setGames(prev => [created, ...prev]);
      try { localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify([created, ...games])); } catch (e) {}
      console.log('✨ Nuevo poder agregado (backend):', created.title);
      return created;
    } catch (err) {
      console.error('❌ Error creando poder en backend:', err.message);
      // fallback: create locally
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
      setGames(prev => [newGame, ...prev]);
      return newGame;
    }
  };

  const updateGame = async (id, gameData) => {
    // Try to update on backend first, fallback to local update
    try {
      const res = await fetch(`${API_BASE}/api/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      if (!res.ok) throw new Error('Backend update failed');
      const updated = await res.json();
      setGames(prev => {
        const updatedGames = prev.map(game => game.id === updated.id ? updated : game);
        try { localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(updatedGames)); } catch (e) {}
        return updatedGames;
      });
      console.log('✏️ Poder actualizado (backend):', id);
      return updated;
    } catch (err) {
      // fallback: update locally and return updated local object
      let updatedLocal = null;
      setGames(prev => {
        const updatedGames = prev.map(game => {
          if (game.id === id) {
            updatedLocal = { ...game, ...gameData };
            return updatedLocal;
          }
          return game;
        });
        try { localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(updatedGames)); } catch (e) {}
        console.log('✏️ Poder actualizado (local fallback):', id, gameData);
        return updatedGames;
      });
      return updatedLocal;
    }
  };

  const deleteGame = async (id) => {
    // Try backend delete first, fallback to local removal
    try {
      const res = await fetch(`${API_BASE}/api/games/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Backend delete failed');
      setGames(prev => {
        const filteredGames = prev.filter(game => game.id !== id);
        try { localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(filteredGames)); } catch (e) {}
        console.log('🗑️ Poder eliminado (backend):', id);
        return filteredGames;
      });
      return true;
    } catch (err) {
      setGames(prev => {
        const filteredGames = prev.filter(game => game.id !== id);
        try { localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(filteredGames)); } catch (e) {}
        console.log('🗑️ Poder eliminado (local fallback):', id);
        return filteredGames;
      });
      return false;
    }
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