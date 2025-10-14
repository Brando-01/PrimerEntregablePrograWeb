import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Columna 1: Logo y descripción - TRANSFORMADO */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img 
                src="/img/logo.png" 
                alt="PowerStore Logo" 
                width="40" 
                height="40"
                className="me-2"
              />
              <h5 className="mb-0 text-warning">PowerStore</h5>
            </div>
            <p className="text-muted">
              Tu tienda de poderes y hechizos. Descubre poderes elementales, 
              artifacts legendarios y magia ancestral para dominar el universo.
            </p>
            <div className="social-links">
              <a href="#" className="text-light me-3" title="Círculo Mágico">
                <i className="bi bi-stars"></i>
              </a>
              <a href="#" className="text-light me-3" title="Grimorio">
                <i className="bi bi-book"></i>
              </a>
              <a href="#" className="text-light me-3" title="Oráculo">
                <i className="bi bi-eye"></i>
              </a>
              <a href="#" className="text-light" title="Portal">
                <i className="bi bi-share"></i>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos - TRANSFORMADO */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-warning mb-3">Atajos Mágicos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    window.scrollTo(0, 0);
                  }}
                >
                  🏰 Santuario
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('.main-content');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  ⚡ Poderes Destacados
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin-panel');
                  }}
                >
                  🔮 Panel del Archimago
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/order-history');
                  }}
                >
                  📜 Mis Órdenes Mágicas
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces legales - TRANSFORMADO */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-warning mb-3">Grimorio Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/terms');
                  }}
                >
                  📜 Pactos y Hechizos
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/privacy');
                  }}
                >
                  🔒 Protección Mágica
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/shipping');
                  }}
                >
                  🧙‍♂️ Encantamientos de Entrega
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-light  text-decoration-none hover-text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                >
                  🔮 Oráculo de Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto y newsletter - TRANSFORMADO */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-warning mb-3">Contacto Mágico</h6>
            <ul className="list-unstyled text-light ">
              <li className="mb-2">📧 info@powerstore.com</li>
              <li className="mb-2">🔮 +51 987 654 321</li>
              <li className="mb-2">🏰 Torre del Archimago, Reino Mágico</li>
              <li className="mb-2">🕒 Lun-Vie: 9:00 - 18:00</li>
            </ul>
            
            {/* Newsletter - TRANSFORMADO */}
            <div className="mt-4">
              <h6 className="text-warning mb-2">Pergamino Mágico</h6>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control form-control-sm" 
                  placeholder="Tu email mágico" 
                />
                <button className="btn btn-warning btn-sm" type="button">
                  Suscribir
                </button>
              </div>
              <small className="text-muted">
                Recibe hechizos exclusivos y revelaciones místicas
              </small>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-4 bg-secondary" />

        {/* Copyright - TRANSFORMADO */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              &copy; {currentYear} PowerStore. Todos los hechizos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="payment-methods">
              <span className="text-muted me-2">Métodos de pago:</span>
              <span className="me-2">🧿</span>
              <span className="me-2">🔮</span>
              <span className="me-2">⚡</span>
              <span>✨</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-text-white:hover {
          color: #fff !important;
          transition: color 0.3s ease;
        }
        .social-links a {
          transition: transform 0.3s ease;
        }
        .social-links a:hover {
          transform: translateY(-2px);
          color: #ffc107 !important;
        }
        .payment-methods span {
          font-size: 1.2em;
        }
      `}</style>
    </footer>
  );
};

export default Footer;