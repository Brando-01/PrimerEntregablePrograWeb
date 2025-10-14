import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';
import { useUser } from '../context/UserContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { users, updateUser } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      const sessionRaw = localStorage.getItem('userSession');
      if (sessionRaw) {
        const s = JSON.parse(sessionRaw);
        setFirstName(s.fullName || s.username || '');
        setEmail(s.email || s.username || '');
        // split name if contains space
        if (s.fullName && s.fullName.includes(' ')) {
          const parts = s.fullName.split(' ');
          setFirstName(parts[0]);
          setLastName(parts.slice(1).join(' '));
        }
      }
    } catch (err) {
      console.error('Error cargando sesión de usuario:', err);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const sessionRaw = localStorage.getItem('userSession');
      const session = sessionRaw ? JSON.parse(sessionRaw) : null;

      const newFullName = (firstName + (lastName ? ' ' + lastName : '')).trim();

      // Update session
      if (session) {
        const updatedSession = { ...session, fullName: newFullName, email };
        localStorage.setItem('userSession', JSON.stringify(updatedSession));

        // Try to find and update user in admin users store
        const matched = users.find(u => (u.nickname && u.nickname.toLowerCase() === (session.username || session.fullName || '').toLowerCase()) || (u.fullName && u.fullName.toLowerCase() === (session.username || session.fullName || '').toLowerCase()));
        if (matched) {
          updateUser(matched.id, { fullName: newFullName, email });
        }
      } else {
        // No session: persist into magicUsers so user can login later
        try {
          const raw = localStorage.getItem('magicUsers') || '[]';
          const mu = JSON.parse(raw);
          const idx = mu.findIndex(u => (u.email && u.email.toLowerCase() === email.toLowerCase()) || (u.username && u.username.toLowerCase() === email.toLowerCase()));
          if (idx !== -1) {
            mu[idx] = { ...mu[idx], fullName: newFullName, email };
          } else {
            mu.push({ username: email, email, password: 'changeme', fullName: newFullName, role: 'user' });
          }
          localStorage.setItem('magicUsers', JSON.stringify(mu));
        } catch (err) {
          console.error('Error guardando magicUsers:', err);
        }
      }

      alert('✨ Datos de registro guardados con éxito');
      navigate('/');
    } catch (err) {
      console.error('Error guardando perfil:', err);
      alert('Ocurrió un error al guardar tus datos');
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Panel izquierdo */}
      <div className="left-panel d-flex flex-column justify-content-between p-4">
        <div className="d-flex align-items-center">
          <div className="logo">
            <img
              src="/img/logo.png"
              alt="Logo PowerStore"
              style={{ cursor: 'pointer', maxWidth: '80px' }}
              onClick={() => navigate('/')}
            />
          </div>
          <div className="brand ms-2">PowerStore</div>
        </div>
        <div className="mt-3">
          <h2>Actualiza tu grimorio</h2>
          <p>Mantén tu información mágica actualizada para mejores hechizos</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right-panel p-4 d-flex flex-column justify-content-center">
        <div className="text-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => navigate('/')}
          ></button>
        </div>
        <div className="form-container mx-auto">
          <h3 className="text-center mb-4">📜 Datos de Registro de usuario</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre(s):</label>
              <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido(s):</label>
              <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button
              type="submit"
              className="btn btn-light w-100 btn-custom mb-2"
            >
              <span>✨ Guardar Datos</span>
            </button>
          </form>
          <p className="btn btn-light w-100 btn-custom mb-2">
            <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              ↩️ Volver al Santuario
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;