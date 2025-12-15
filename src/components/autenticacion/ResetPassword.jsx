import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailOrUser = form.elements[0].value.trim();
    const newPass = form.elements[1].value;
    const confirmPass = form.elements[2].value;

    if (!emailOrUser) {
      alert('Por favor ingresa tu correo o nombre de usuario');
      return;
    }
    if (!newPass || newPass.length < 4) {
      alert('La nueva contraseña debe tener al menos 4 caracteres');
      return;
    }
    if (newPass !== confirmPass) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const raw = localStorage.getItem('magicUsers') || '[]';
      const users = JSON.parse(raw);

      // buscar por email o username
      const idx = users.findIndex(u => (u.email && u.email.toLowerCase() === emailOrUser.toLowerCase()) || (u.username && u.username.toLowerCase() === emailOrUser.toLowerCase()));

      if (idx !== -1) {
        users[idx].password = newPass;
        localStorage.setItem('magicUsers', JSON.stringify(users));
        alert('Contraseña restablecida con éxito. Ahora puedes iniciar sesión.');
        navigate('/login');
        return;
      }

      // Si no existe en magicUsers, crear un registro con ese username/email para permitir login (no sobrescribe mocks)
      const newUser = { username: emailOrUser, email: emailOrUser, password: newPass, role: 'user' };
      users.push(newUser);
      localStorage.setItem('magicUsers', JSON.stringify(users));
      alert('Contraseña restablecida. Se creó una cuenta temporal para permitir el acceso.');
      navigate('/login');
    } catch (err) {
      console.error('Error restableciendo contraseña:', err);
      alert('Ocurrió un error al restablecer la contraseña. Intenta nuevamente.');
    }
  };

  return (
    <div className="main-background d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
      {/* Logo */}
      <div className="logo mb-4">
        <img src="/img/logo.png" alt="Logo GameStore" />
      </div>

      {/* Botón de cierre */}
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close"
        onClick={() => navigate('/')}
      ></button>

      {/* Formulario */}
      <div className="login-box">
        <h3 className="text-center mb-4">Recuperar contraseña</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input type="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Nueva contraseña:</label>
            <input type="password" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar nueva contraseña:</label>
            <input type="password" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-light w-100 btn-custom mb-2">
            Restablecer contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;