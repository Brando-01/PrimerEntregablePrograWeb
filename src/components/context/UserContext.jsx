import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../types';
import API_BASE from '../../config/api';

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
    // Try creating user on backend, fallback to local creation
    try {
      const create = async () => {
        const res = await fetch(`${API_BASE}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Create user failed');
        const created = await res.json();
        setUsers(prev => [created, ...prev]);
        return created;
      };
      return create();
    } catch (err) {
      const newUser = {
        ...userData,
        id: (users.length + 1).toString(),
        totalOrders: 0,
        totalSpent: 0,
        registrationDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString()
      };
      setUsers(prev => [newUser, ...prev]);
      console.log('✅ Usuario agregado (local):', newUser.nickname);
      return newUser;
    }
  };

  const updateUser = (id, userData) => {
    // Try backend update first, fallback to local
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Update user failed');
        const updated = await res.json();
        setUsers(prev => prev.map(user => user.id === updated.id ? updated : user));
        console.log('✏️ Usuario actualizado (backend):', id);
        return;
      } catch (err) {
        setUsers(prev => prev.map(user => user.id === id ? { ...user, ...userData } : user));
        console.log('✏️ Usuario actualizado (local fallback):', id);
      }
    })();
  };

  const deleteUser = (id) => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        setUsers(prev => prev.filter(user => user.id !== id));
        console.log('🗑️ Usuario eliminado (backend):', id);
      } catch (err) {
        setUsers(prev => prev.filter(user => user.id !== id));
        console.log('🗑️ Usuario eliminado (local):', id);
      }
    })();
  };

  const toggleUserStatus = (id) => {
    (async () => {
      try {
        const existing = users.find(u => u.id === id);
        if (!existing) return;
        const payload = { ...existing, isActive: !existing.isActive };
        const res = await fetch(`${API_BASE}/api/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Toggle failed');
        const updated = await res.json();
        setUsers(prev => prev.map(u => u.id === id ? updated : u));
        console.log('🔄 Estado cambiado para usuario (backend):', id);
      } catch (err) {
        setUsers(prev => {
          const updated = prev.map(user => user.id === id ? { ...user, isActive: !user.isActive } : user);
          try {
            const magicUsers = JSON.parse(localStorage.getItem('magicUsers') || '[]');
            const changedUser = updated.find(u => u.id === id);
            if (changedUser) {
              const muUpdated = magicUsers.map(mu => {
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
        console.log('🔄 Estado cambiado para usuario (local fallback):', id);
      }
    })();
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  // Load users from backend on mount
  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users`);
        if (!res.ok) throw new Error('Fetch users failed');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setUsers(data);
          try { localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
          console.log('✅ Usuarios cargados desde backend');
          return;
        }
      } catch (err) {
        console.warn('⚠️ No se pudieron cargar usuarios desde backend:', err.message);
      }
      // fallback: already initialized from localStorage/mockUsers
    };
    fetchUsers();
    return () => { mounted = false; };
  }, []);

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
