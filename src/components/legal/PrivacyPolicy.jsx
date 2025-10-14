import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex align-items-center mb-4">
            <button 
              className="btn btn-outline-secondary me-3"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </button>
            <h1 className="mb-0">🔒 Política de Privacidad</h1>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <div className="alert alert-info">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString()}
              </div>

              <section className="mb-4">
                <h3 className="text-primary">1. Información que Recopilamos</h3>
                <p>
                  En RetroGames recopilamos la siguiente información para proporcionar nuestros servicios:
                </p>
                <ul>
                  <li><strong>Información personal:</strong> Nombre, email, dirección de envío</li>
                  <li><strong>Información de pago:</strong> Datos de tarjeta (procesados de forma segura)</li>
                  <li><strong>Datos de uso:</strong> Historial de compras y preferencias</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">2. Uso de la Información</h3>
                <p>Utilizamos tu información para:</p>
                <ul>
                  <li>Procesar tus pedidos y pagos</li>
                  <li>Gestionar tu cuenta de usuario</li>
                  <li>Enviar actualizaciones y ofertas especiales</li>
                  <li>Mejorar nuestros servicios</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">3. Protección de Datos</h3>
                <p>
                  Implementamos medidas de seguridad avanzadas para proteger tu información. 
                  Tus datos de pago son procesados mediante cifrado SSL de 256 bits.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">4. Cookies y Tecnologías Similares</h3>
                <p>
                  Utilizamos cookies para mejorar tu experiencia de compra. Puedes gestionar 
                  tus preferencias de cookies en la configuración de tu navegador.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">5. Tus Derechos</h3>
                <p>Tienes derecho a:</p>
                <ul>
                  <li>Acceder a tus datos personales</li>
                  <li>Rectificar información incorrecta</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tus datos</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">6. Contacto</h3>
                <p>
                  Para ejercer tus derechos o consultas sobre privacidad:
                  <br />
                  📧: privacy@retrogames.com
                  <br />
                  📞: +51 987 654 321
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;