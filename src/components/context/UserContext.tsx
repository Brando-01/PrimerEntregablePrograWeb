// components/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { mockUsers } from '../types';

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'totalOrders' | 'totalSpent' | 'registrationDate'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'retrogames-admin-users';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
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

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      console.log('💾 Usuarios guardados:', users.length);
    } catch (error) {
      console.error('❌ Error guardando usuarios:', error);
    }
  }, [users]);

  const addUser = (userData: Omit<User, 'id' | 'totalOrders' | 'totalSpent' | 'registrationDate'>) => {
    const newUser: User = {
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

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    );
    console.log('✏️ Usuario actualizado:', id);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    console.log('🗑️ Usuario eliminado:', id);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
    console.log('🔄 Estado cambiado para usuario:', id);
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const value: UserContextType = {
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