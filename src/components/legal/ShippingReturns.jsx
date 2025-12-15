import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingReturns = () => {
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
            <h1 className="mb-0">🚚 Envíos y Devoluciones</h1>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <div className="alert alert-info">
                <strong>Política actualizada:</strong> {new Date().toLocaleDateString()}
              </div>

              <section className="mb-4">
                <h3 className="text-primary">📦 Política de Envíos</h3>
                <h5>Áreas de Cobertura</h5>
                <p>Realizamos envíos a todo Perú. Los tiempos de entrega varían según la ubicación:</p>
                <ul>
                  <li><strong>Lima Metropolitana:</strong> 1-2 días hábiles</li>
                  <li><strong>Provincias:</strong> 3-7 días hábiles</li>
                  <li><strong>Zonas rurales:</strong> 5-10 días hábiles</li>
                </ul>

                <h5>Costos de Envío</h5>
                <ul>
                  <li><strong>Envío estándar:</strong> $5.00</li>
                  <li><strong>Envío express:</strong> $10.00 (entrega en 24h)</li>
                  <li><strong>Envío gratuito:</strong> En compras mayores a $50.00</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">🔄 Política de Devoluciones</h3>
                <div className="alert alert-warning">
                  <strong>⚠️ Importante:</strong> Debido a la naturaleza digital de nuestros productos, 
                  no aceptamos devoluciones una vez que la clave del juego ha sido entregada.
                </div>

                <h5>Casos Excepcionales para Reembolso</h5>
                <ul>
                  <li>Clave de juego no funciona o es inválida</li>
                  <li>Error en la descripción del producto</li>
                  <li>Compra duplicada por error del sistema</li>
                </ul>

                <h5>Proceso de Reembolso</h5>
                <ol>
                  <li>Contactar a soporte dentro de las 48 horas posteriores a la compra</li>
                  <li>Proporcionar evidencia del problema</li>
                  <li>El reembolso se procesará en 5-10 días hábiles</li>
                </ol>
              </section>

              <section className="mb-4">
                <h3 className="text-primary">📞 Soporte y Contacto</h3>
                <p>
                  Para consultas sobre envíos o devoluciones:
                  <br />
                  📧: shipping@retrogames.com
                  <br />
                  📞: +51 987 654 321
                  <br />
                  🕒 Horario: Lun-Vie 9:00 - 18:00
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;