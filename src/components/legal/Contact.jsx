import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            <h1 className="mb-0">📞 Contáctanos</h1>
          </div>

          <div className="row">
            {/* Información de contacto */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="text-primary">Información de Contacto</h5>
                  
                  <div className="mb-3">
                    <h6>📧 Email</h6>
                    <p className="mb-1">ventas@retrogames.com</p>
                    <p className="mb-1">soporte@retrogames.com</p>
                  </div>

                  <div className="mb-3">
                    <h6>📞 Teléfonos</h6>
                    <p className="mb-1">+51 987 654 321 (Ventas)</p>
                    <p className="mb-1">+51 987 654 322 (Soporte)</p>
                  </div>

                  <div className="mb-3">
                    <h6>📍 Dirección</h6>
                    <p>Av. Ejemplo 123, Lima 15001<br />Lima, Perú</p>
                  </div>

                  <div className="mb-3">
                    <h6>🕒 Horario de Atención</h6>
                    <p>Lun - Vie: 9:00 - 18:00<br />Sáb: 9:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="text-primary">Envíanos un Mensaje</h5>
                  <p className="text-muted">¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!</p>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Nombre completo *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required 
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Asunto *</label>
                      <select 
                        className="form-select" 
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="soporte">Soporte técnico</option>
                        <option value="ventas">Consulta de ventas</option>
                        <option value="devolucion">Devolución/reembolso</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Mensaje *</label>
                      <textarea 
                        className="form-control" 
                        id="message" 
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      📤 Enviar Mensaje
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;