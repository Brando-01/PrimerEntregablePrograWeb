import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../types';

const UserContext = createContext();

const USERS_STORAGE_KEY = 'retrogames-admin-users';

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('👥 Usuarios cargados desde localStorage:', parsed.length);
        return parsed;
      }
      return mockUsers;
    } catch (error) {
      console.error('❌ Error cargando usuarios:', error);
      return mockUsers;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      console.log('💾 Usuarios guardados:', users.length);
    } catch (error) {
      console.error('❌ Error guardando usuarios:', error);
    }
  }, [users]);

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: (users.length + 1).toString(),
      totalOrders: 0,
      totalSpent: 0,
      registrationDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString()
    };

    setUsers(prev => [newUser, ...prev]);
    console.log('✅ Usuario agregado:', newUser.nickname);
    return newUser;
  };

  const updateUser = (id, userData) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    );
    console.log('✏️ Usuario actualizado:', id);
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    console.log('🗑️ Usuario eliminado:', id);
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => {
      const updated = prev.map(user => user.id === id ? { ...user, isActive: !user.isActive } : user);

      // Also sync with magicUsers stored in localStorage (credentials)
      try {
        const magicUsers = JSON.parse(localStorage.getItem('magicUsers') || '[]');
        const changedUser = updated.find(u => u.id === id);
        if (changedUser) {
          const muUpdated = magicUsers.map(mu => {
            // match by id or by username/email
            if (String(mu.id) === String(changedUser.id) || (mu.username && changedUser.nickname && mu.username === changedUser.nickname) || (mu.email && changedUser.email && mu.email === changedUser.email)) {
              return { ...mu, isActive: changedUser.isActive };
            }
            return mu;
          });
          localStorage.setItem('magicUsers', JSON.stringify(muUpdated));
        }
      } catch (e) {
        console.error('❌ Error sincronizando magicUsers en localStorage:', e);
      }

      return updated;
    });
    console.log('🔄 Estado cambiado para usuario:', id);
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getUserById
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};