import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <button 
              className="btn btn-outline-secondary me-3"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </button>
            <h1 className="mb-0">📄 Términos y Condiciones</h1>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <div className="alert alert-info">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString()}
              </div>

              {/* Contenido de Términos y Condiciones */}
              <section className="mb-4">
                <h3 className="text-primary">1. Aceptación de los Términos</h3>
                <p>
                  Al acceder y utilizar RetroGames, aceptas cumplir con estos términos y condiciones. 
                  Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">2. Uso del Servicio</h3>
                <h5>2.1. Elegibilidad</h5>
                <p>
                  Debes tener al menos 18 años o la mayoría de edad legal en tu jurisdicción para realizar compras.
                </p>

                <h5>2.2. Cuenta de Usuario</h5>
                <p>
                  Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. 
                  Todas las actividades realizadas bajo tu cuenta son de tu responsabilidad.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">3. Compras y Pagos</h3>
                <h5>3.1. Precios</h5>
                <p>
                  Todos los precios están expresados en dólares americanos (USD) e incluyen impuestos aplicables.
                </p>

                <h5>3.2. Métodos de Pago</h5>
                <p>
                  Aceptamos tarjetas de crédito/débito, PayPal y otros métodos de pago electrónico.
                </p>

                <h5>3.3. Licencias Digitales</h5>
                <p>
                  Al comprar un juego, adquieres una licencia para su uso personal. No se permite la reventa.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">4. Política de Devoluciones</h3>
                <p>
                  Debido a la naturaleza digital de nuestros productos, no aceptamos devoluciones una vez 
                  que la clave del juego ha sido entregada. Solo procesamos reembolsos en casos excepcionales.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">5. Propiedad Intelectual</h3>
                <p>
                  Todos los juegos son propiedad de sus respectivos desarrolladores y editores. 
                  RetroGames actúa como distribuidor autorizado.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">6. Limitación de Responsabilidad</h3>
                <p>
                  No nos hacemos responsables por problemas técnicos de los juegos, 
                  los cuales deben ser reportados directamente a los desarrolladores.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">7. Modificaciones</h3>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Las changes serán efectivas inmediatamente después de su publicación.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">8. Contacto</h3>
                <p>
                  Para preguntas sobre estos términos, contáctanos en:
                  <br />
                  📧: legal@retrogames.com
                  <br />
                  📞: +51 987 654 321
                </p>
              </section>

              <div className="alert alert-warning">
                <strong>⚠️ Importante:</strong> Al realizar una compra en RetroGames, confirmas que has leído, 
                entendido y aceptado estos términos y condiciones en su totalidad.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;