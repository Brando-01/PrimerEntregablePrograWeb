// components/autenticacion/EmailVerification.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../../assets/estilos4.css';

interface EmailVerificationProps {
  userData: {
    fullName: string;
    email: string;
    nickname: string;
    password: string;
    country: string;
  };
  verificationCode: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ userData, verificationCode }) => {
  const navigate = useNavigate();
  const { addUser } = useUser();
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos en segundos
  const [isResending, setIsResending] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!inputCode.trim()) {
      setError('🔮 Ingresa el código de verificación');
      return;
    }

    // Simulación: solo acepta el código 123456
    if (inputCode !== '123456') {
      setError('❌ Código de verificación incorrecto');
      return;
    }

    // ✅ CREAR USUARIO EN EL CONTEXTO
    const newUser = addUser({
      fullName: userData.fullName,
      email: userData.email,
      nickname: userData.nickname,
      avatar: '/img/default-avatar.png',
      isActive: true,
      country: userData.country
    });

    // ✅ GUARDAR CREDENCIALES PARA LOGIN
    const magicUsers = JSON.parse(localStorage.getItem('magicUsers') || '[]');
    const userCredentials = {
      id: newUser.id,
      username: userData.nickname,
      email: userData.email,
      password: userData.password,
      fullName: userData.fullName,
      role: 'user',
      registrationDate: new Date().toISOString(),
      isActive: true,
      magicLevel: 'Mago Verificado',
      country: userData.country,
      avatar: '/img/default-avatar.png',
      emailVerified: true
    };

    // ✅ AGREGAR A LA BASE DE DATOS DE LOGIN
    const updatedUsers = [...magicUsers, userCredentials];
    localStorage.setItem('magicUsers', JSON.stringify(updatedUsers));

    // ✅ REDIRIGIR AL LOGIN Y AUTOCOMPLETAR CAMPOS
    alert('✅ ¡Verificación completada! Ahora puedes iniciar sesión.');
    navigate('/login', {
      state: {
        username: userData.nickname,
        password: userData.password
      }
    });
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');
    
    try {
      // Simular envío de nuevo código (en producción sería una llamada al backend)
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Aquí en una aplicación real, llamarías a tu API para reenviar el código
      console.log('🔄 Reenviando código:', newCode);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('📧 Nuevo código enviado a tu email');
      setTimeLeft(600); // Reset timer
    } catch (error) {
      setError('❌ Error reenviando código');
    } finally {
      setIsResending(false);
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
          <h2>Verificación Mágica</h2>
          <p>Completa tu iniciación verificando tu pergamino electrónico</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right-panel p-4 d-flex flex-column justify-content-center">
        <div className="text-end">
          <button className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
        </div>
        <div className="form-container mx-auto">
          <h3 className="text-center mb-4">🔮 Verificación de Email</h3>
          
          <div className="alert alert-info mb-4" role="alert">
            <h6>📧 Código enviado a:</h6>
            <strong>{userData.email}</strong>
            <br />
            <small className="text-muted">
              Revisa tu bandeja de entrada y spam
            </small>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Código de Verificación:</label>
              <input 
                type="text" 
                className="form-control text-center" 
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                style={{ fontSize: '24px', letterSpacing: '3px' }}
                required 
              />
              <div className="form-text">
                Ingresa el código de 6 dígitos que recibiste por email
              </div>
            </div>

            <div className="mb-3 text-center">
              {timeLeft > 0 ? (
                <div className="text-warning">
                  ⏰ Tiempo restante: <strong>{formatTime(timeLeft)}</strong>
                </div>
              ) : (
                <div className="text-danger">
                  ⚠️ El código ha expirado
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-light w-100 btn-custom mb-2"
              disabled={timeLeft === 0}
            >
              <span>Verificar Código</span>
              <span>✨</span>
            </button>
          </form>

          <div className="text-center mt-3">
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleResendCode}
              disabled={isResending}
            >
              {isResending ? '⏳ Enviando...' : '📧 Reenviar Código'}
            </button>
          </div>

          <p className="mt-3 text-center create-account">
            ¿Problemas con la verificación?{' '}
            <span style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => navigate('/crear-cuenta')}>
              Volver al registro
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;