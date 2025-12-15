// utils/session.js
// Utilidad para manejar la sesión de usuario de forma segura

export function getUserSession() {
  try {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  } catch {
    localStorage.removeItem('userSession');
    return null;
  }
}

export function isAdminSession() {
  const session = getUserSession();
  return session && session.role === 'admin';
}

export function isLoggedIn() {
  const session = getUserSession();
  return session && session.isLoggedIn;
}