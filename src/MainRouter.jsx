// MainRouter.jsx - VERSIÓN CORREGIDA
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import LoginForm from './components/autenticacion/login';
import CreateAccount from './components/autenticacion/CreateAccount';
import EmailVerification from './components/autenticacion/EmailVerification';
import ResetPassword from './components/autenticacion/ResetPassword';
import VerifyIdentity from './components/autenticacion/VerifyIdentity';
import EditProfile from './components/autenticacion/EditProfile';
import AdminPanel from './components/admin/AdminPanel';
import ProtectedRoute from './components/common/ProtectedRoute';
// import { isAdminSession } from './utils/session';
import OrderConfirmation from './components/orders/OrderConfirmation';
import OrderHistory from './components/orders/OrderHistory';
import OrderDetails from './components/orders/OrderDetails';
import TermsOfService from './components/legal/TermsOfService';
import UserDetails from './components/admin/UserDetails';

// Componentes temporales para las rutas que faltan
const PrivacyPolicy = () => (
  <div className="container mt-5">
    <h1>🔒 Política de Privacidad</h1>
    <p>Página en desarrollo...</p>
    <a href="/">Volver al inicio</a>
  </div>
);

const ShippingReturns = () => (
  <div className="container mt-5">
    <h1>🚚 Envíos y Devoluciones</h1>
    <p>Página en desarrollo...</p>
    <a href="/">Volver al inicio</a>
  </div>
);

const Contact = () => (
  <div className="container mt-5">
    <h1>📞 Contacto</h1>
    <p>Página en desarrollo...</p>
    <a href="/">Volver al inicio</a>
  </div>
);

// Wrapper para EmailVerification que maneja los datos del estado
const EmailVerificationWrapper = () => {
  const [userData, setUserData] = React.useState(null);
  const [verificationCode, setVerificationCode] = React.useState('');

  React.useEffect(() => {
    // Obtener datos del localStorage si no están en el estado
    const tempUserData = localStorage.getItem('tempUserData');
    const storedCode = localStorage.getItem('verificationCode');
    
    if (tempUserData && storedCode) {
      setUserData(JSON.parse(tempUserData));
      setVerificationCode(storedCode);
    }
  }, []);

  if (!userData || !verificationCode) {
    return (
      <div className="container mt-5 text-center">
        <h1>❌ Error</h1>
        <p>No se encontraron datos de verificación.</p>
        <a href="/crear-cuenta" className="btn btn-primary">Volver al registro</a>
      </div>
    );
  }

  return <EmailVerification userData={userData} verificationCode={verificationCode} />;
};

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/crear-cuenta" element={<CreateAccount />} />
        <Route path="/verificar-email" element={<EmailVerificationWrapper />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/recuperar" element={<ResetPassword />} />
        <Route path="/verificar" element={<VerifyIdentity />} />
        <Route path="/admin-panel" element={
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/order-confirmation" element={<OrderConfirmation onContinueShopping={() => window.location.href = '/'} />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/admin/user-details/:userId" element={<UserDetails />} />
        {/* Rutas legales */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/shipping" element={<ShippingReturns />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;