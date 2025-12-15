// Central API base URL for the frontend
// Use Vite env `VITE_API_BASE` if defined, or fall back to `VITE_API_URL`,
// otherwise default to the common backend dev URL `http://localhost:4000`.
const API_BASE = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default API_BASE;
