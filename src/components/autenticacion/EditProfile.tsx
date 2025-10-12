// components/autenticacion/EditProfile.tsx - VERSIÓN MÁGICA
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✨ Grimorio actualizado con éxito');
    navigate('/');
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
          <h3 className="text-center mb-4">📜 Editar Grimorio Personal</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre Mágico:</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido Ancestral:</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Pergamino Electrónico:</label>
              <input type="email" className="form-control" required />
            </div>
            <button
              type="submit"
              className="btn btn-light w-100 btn-custom mb-2"
            >
              <span>✨ Guardar Cambios Mágicos</span>
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