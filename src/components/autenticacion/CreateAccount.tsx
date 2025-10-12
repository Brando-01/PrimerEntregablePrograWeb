// components/autenticacion/CreateAccount.tsx - VERSIÓN MÁGICA CON VERIFICACIÓN
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext'; // Se usará después de la verificación
import { generateVerificationCode, sendVerificationEmail } from '../../services/emailService';
import '../../assets/estilos4.css';

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  // const { addUser } = useUser(); // Se usará después de la verificación

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    nickname: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validaciones básicas
    if (formData.password.length < 6) {
      setError('El conjuro debe tener al menos 6 símbolos');
      setIsLoading(false);
      return;
    }

    // Validar si el email o nickname ya existen
    const magicUsers = JSON.parse(localStorage.getItem('magicUsers') || '[]');
    const validUsers = [
      { username: 'archimago', email: 'archimago@magos.com' },
      { username: 'mago', email: 'mago@magos.com' },
      { username: 'aprendiz', email: 'aprendiz@magos.com' },
      { username: 'andresaurio', email: 'andresaurio@magos.com' },
      { username: 'domazdack', email: 'domazdack@magos.com' },
      { username: 'jep365', email: 'jep365@magos.com' }
    ];
    const exists = magicUsers.some((u: any) => u.email === formData.email || u.username === formData.nickname)
      || validUsers.some((u: any) => u.email === formData.email || u.username === formData.nickname);
    if (exists) {
      setError('❌ Ya existe un usuario con ese correo o nombre de mago.');
      setIsLoading(false);
      return;
    }

    try {
      // ✅ GENERAR CÓDIGO DE VERIFICACIÓN
      const verificationCode = generateVerificationCode();
      
      // ✅ ENVIAR EMAIL DE VERIFICACIÓN
      const emailSent = await sendVerificationEmail(
        formData.email, 
        verificationCode, 
        formData.fullName
      );

      if (emailSent) {
        // ✅ GUARDAR DATOS TEMPORALES PARA VERIFICACIÓN
        const tempUserData = {
          fullName: formData.fullName,
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
          country: formData.country
        };

        // Guardar datos temporales en localStorage
        localStorage.setItem('tempUserData', JSON.stringify(tempUserData));
        localStorage.setItem('verificationCode', verificationCode);

        // ✅ REDIRIGIR A VERIFICACIÓN
        navigate('/verificar-email', { 
          state: { 
            userData: tempUserData, 
            verificationCode 
          } 
        });
      } else {
        setError('❌ Error enviando email de verificación. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      setError('❌ Error en el proceso de registro. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
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
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </div>
          <div className="brand ms-2">PowerStore</div>
        </div>
        <div className="mt-3">
          <h2>Comienza tu viaje mágico</h2>
          <p>Descubre poderes ancestrales y domina los elementos del universo</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right-panel p-4 d-flex flex-column justify-content-center">
        <div className="text-end">
          <button className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
        </div>
        <div className="form-container mx-auto">
          <h3 className="text-center mb-4">🧙‍♂️ Ritual de Iniciación</h3>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre Mágico Completo:</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pergamino Electrónico:</label>
              <input 
                type="email" 
                className="form-control" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Conjuro Secreto:</label>
              <input 
                type="password" 
                className="form-control" 
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required 
              />
              <div className="form-text">
                El conjuro debe tener al menos 6 símbolos de poder.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre de Mago:</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.nickname}
                onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                required 
              />
              <div className="form-text">
                Este será tu nombre para iniciar sesión. Puedes usar letras, números o símbolos arcanos.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Reino de Origen:</label>
              <select 
                className="form-select" 
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                required
              >
                <option value="">Escoge tu reino...</option>
                <option value="Reino Mágico">Reino Mágico</option>
                <option value="Tierra Media">Tierra Media</option>
                <option value="Narnia">Narnia</option>
                <option value="Hogwarts">Hogwarts</option>
              </select>
              <div className="form-text">
                Por razones de alineación mágica, debemos conocer tu reino de origen.
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-light w-100 btn-custom mb-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>⏳ Enviando Código...</span>
                  <span>✨</span>
                </>
              ) : (
                <>
                  <span>Completar Iniciación</span>
                  <span>⚡</span>
                </>
              )}
            </button>
          </form>
          <p className="mt-3 text-center create-account">
            ¿Ya eres miembro del círculo?{' '}
            <span style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => navigate('/login')}>
              Accede al portal aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;