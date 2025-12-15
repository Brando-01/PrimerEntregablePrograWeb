import { getUserSession } from './session';

const GUEST_KEY = 'saved-items';

export function getSavedKeyForCurrentUser() {
  try {
    const session = getUserSession();
    if (session && (session.username || session.fullName)) {
      return `saved-items:${session.username || session.fullName}`;
    }
  } catch (err) {}
  return GUEST_KEY;
}

export function getSavedItemsRaw(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) { return []; }
}

export function getSavedItemsForCurrentUser() {
  const key = getSavedKeyForCurrentUser();
  return getSavedItemsRaw(key);
}

export function setSavedItemsForCurrentUser(items) {
  const key = getSavedKeyForCurrentUser();
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving saved-items for key', key, err);
  }
}

export function mergeGuestSavedIntoUser() {
  try {
    const session = getUserSession();
    if (!session || !(session.username || session.fullName)) return;
    const userKey = `saved-items:${session.username || session.fullName}`;
    const guest = getSavedItemsRaw(GUEST_KEY);
    const user = getSavedItemsRaw(userKey);
    if (guest.length === 0) return;
    const merged = [...user];
    guest.forEach(g => { if (!merged.some(u => u.id === g.id)) merged.push(g); });
    localStorage.setItem(userKey, JSON.stringify(merged));
  } catch (err) {
    console.error('Error merging guest saved items', err);
  }
}