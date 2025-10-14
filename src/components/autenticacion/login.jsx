import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../assets/estilos4.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { users } = useUser();

  // Autocompletar si viene de verificación
  useEffect(() => {
    if (location.state && location.state.username && location.state.password) {
      setUsername(location.state.username);
      setPassword(location.state.password);
    }
  }, [location.state]);

  // Base de datos de usuarios mágicos
  const validUsers = [
    { username: 'archimago', password: 'hechizo123', role: 'admin' },
    { username: 'mago', password: 'poder456', role: 'user' },
    { username: 'aprendiz', password: 'magia789', role: 'user' },
    { username: 'andresaurio', password: 'dino123', role: 'user' },
    { username: 'domazdack', password: 'domo456', role: 'user' },
    { username: 'jep365', password: 'jep789', role: 'user' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validar campos vacíos
    if (!username.trim() || !password.trim()) {
      setError('🔮 Completa todos los campos del pergamino mágico');
      return;
    }

    // Buscar primero en usuarios del contexto (usuarios registrados)
    let user = null;
    try {
      user = users.find(u => (u.nickname && u.nickname.toLowerCase() === username.toLowerCase()) && u.password === password);
    } catch (err) {
      user = null;
    }

    // Si no está en contexto, buscar en usuarios predefinidos
    if (!user) {
      user = validUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );
    }

    console.log('🔍 Buscando usuario:', username.toLowerCase());
    console.log('📋 Usuarios predefinidos:', validUsers.map(u => u.username));

    // ✅ NUEVO: Si no se encuentra, buscar en usuarios creados dinámicamente
    if (!user) {
      try {
        const magicUsers = JSON.parse(localStorage.getItem('magicUsers') || '[]');
        console.log('📋 Usuarios dinámicos:', magicUsers.map(u => u.username));
        user = magicUsers.find(
          u => (u.username && u.username.toLowerCase() === username.toLowerCase()) && u.password === password
        );
        console.log('✅ Usuario encontrado en dinámicos:', user ? 'SÍ' : 'NO');
        if (user && user.isActive === false) {
          setError('❌ Usuario desactivado. No puedes iniciar sesión.');
          return;
        }
      } catch (error) {
        console.error('Error cargando usuarios dinámicos:', error);
      }
    } else {
      console.log('✅ Usuario encontrado en predefinidos');
    }

    if (user) {
      // Si el usuario tiene isActive === false, bloquear login
      if (user.isActive === false) {
        setError('❌ Usuario desactivado. Si intentas ingresar de nuevo, no podrás acceder.');
        return;
      }
      // Forzar rol admin si el usuario es archimago
      const forcedRole = user.username.toLowerCase() === 'archimago' ? 'admin' : user.role;
      // Guardar sesión
      const userSession = {
        username: user.username,
        role: forcedRole,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        magicLevel: forcedRole === 'admin' ? 'Archimago' : (user.magicLevel || 'Mago'),
        fullName: user.fullName || user.username,
        country: user.country || '',
        avatar: user.avatar || '/img/default-avatar.png'
      };
      localStorage.setItem('userSession', JSON.stringify(userSession));
      console.log('✅ Sesión guardada:', userSession);
      alert(`✨ ¡Bienvenido ${userSession.magicLevel} ${username}!`);
      // Redirigir siempre a principal
      navigate('/');
    } else {
      setError('❌ Runa o contraseña arcana incorrectos');
    }
  };

  // Función para acceso rápido (solo desarrollo)
  const quickLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="bg-light min-vh-100">
      <header className="d-flex align-items-center p-3">
        <div className="logo">
          <img
            src="/img/logo.png"
            alt="Logo PowerStore"
            style={{ cursor: 'pointer', maxWidth: '80px' }}
            onClick={() => navigate('/')}
          />
        </div>
        <div className="brand ms-2">
          <h2 className="mb-1">PowerStore</h2>
        </div>
      </header>

      <main className="d-flex align-items-center justify-content-center main-background" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="login-box text-center">
          <h2 className="mb-4">
            Acceder al
            <br />
            Círculo de Magos
          </h2>

          {/* Mostrar error si existe */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">🔮 Runa de Identificación:</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre mágico"
                required 
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">✨ Contraseña Arcana:</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu conjuro secreto"
                required 
              />
            </div>

            <button type="submit" className="btn btn-light w-100 btn-custom mb-2">
              🧙‍♂️ Invocar Portal
            </button>

            <div className="d-flex justify-content-between">
              <Link to="/recuperar" className="forgot-password">¿Olvide mi password?</Link>
              <Link to="/admin-panel" className="forgot-password">¿Eres el Archimago?</Link>
            </div>
          </form>

          {/* Accesos rápidos para testing */}
          {import.meta.env.DEV && (
            <div className="mt-3 p-3 bg-dark text-light rounded">
              <h6>⚡ Accesos Rápidos (Solo Desarrollo):</h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <button 
                  className="btn btn-sm btn-outline-light"
                  onClick={() => quickLogin('archimago', 'hechizo123')}
                >
                  Archimago
                </button>
                <button 
                  className="btn btn-sm btn-outline-light"
                  onClick={() => quickLogin('mago', 'poder456')}
                >
                  Mago
                </button>
                <button 
                  className="btn btn-sm btn-outline-light"
                  onClick={() => quickLogin('andresaurio', 'dino123')}
                >
                  Andresaurio
                </button>
              </div>
            </div>
          )}

          <p className="mt-3 create-account">
            ¿Nuevo en el reino mágico? <Link to="/crear-cuenta">Únete al Círculo</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;