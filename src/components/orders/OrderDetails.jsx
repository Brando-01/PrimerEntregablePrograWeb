import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrder();
  
  // ✅ Buscar en las órdenes REALES del contexto
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Orden no encontrada</h4>
          <p>La orden #{orderId} no existe o no tienes permisos para verla.</p>
          <button className="btn btn-primary" onClick={() => navigate('/order-history')}>
            Volver al historial
          </button>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status) => {
    const statusInfo = {
      pending: { 
        class: 'bg-warning', 
        text: 'Pendiente de confirmación',
        icon: '⏳',
        description: 'Tu pedido está siendo procesado. Espera la confirmación del pago.'
      },
      confirmed: { 
        class: 'bg-info', 
        text: 'Pago confirmado',
        icon: '✅',
        description: 'Tu pago ha sido confirmado. Estamos preparando tu pedido.'
      },
      shipped: { 
        class: 'bg-primary', 
        text: 'Enviado',
        icon: '🚚',
        description: 'Tu pedido ha sido enviado. ¡Estará en camino pronto!'
      },
      delivered: { 
        class: 'bg-success', 
        text: 'Entregado',
        icon: '🎁',
        description: '¡Tu pedido ha sido entregado! Esperamos que lo disfrutes.'
      },
      cancelled: { 
        class: 'bg-danger', 
        text: 'Cancelado',
        icon: '❌',
        description: 'Este pedido ha sido cancelado.'
      }
    };
    
    return statusInfo[status] || statusInfo.pending;
  };

  const statusInfo = getStatusInfo(order.currentStatus);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button 
                className="btn btn-outline-secondary btn-sm me-3"
                onClick={() => navigate('/order-history')}
              >
                ← Volver al historial
              </button>
              <h2 className="d-inline-block mb-0">Detalles del Pedido</h2>
            </div>
            <div className="text-end">
              <div className="text-muted">Orden #</div>
              <strong>{order.id}</strong>
            </div>
          </div>

          {/* Estado actual */}
          <div className={`card text-white ${statusInfo.class} mb-4`}>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="card-title mb-2">
                    {statusInfo.icon} {statusInfo.text}
                  </h4>
                  <p className="card-text mb-0">{statusInfo.description}</p>
                </div>
                <div className="col-md-4 text-end">
                  {order.estimatedDelivery && (
                    <div>
                      <strong>Entrega estimada:</strong>
                      <br />
                      {new Date(order.estimatedDelivery).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Columna izquierda - Información principal */}
            <div className="col-lg-8">
              {/* ✅ PRODUCTOS REALES DEL PEDIDO */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0">🛒 Productos del Pedido</h5>
                </div>
                <div className="card-body">
                  {order.items.map((item, index) => (
                    <div key={index} className="d-flex align-items-center border-bottom pb-3 mb-3">
                      <img 
                        src={item.game.images[0]} 
                        alt={item.game.title}
                        className="rounded me-3"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.game.title}</h6>
                        <p className="text-muted mb-1 small">
                          {item.game.description.substring(0, 120)}...
                        </p>
                        <div className="d-flex gap-3 small text-muted">
                          <span>🔮 Tipo de Magia: {item.game.platform}</span>
                          {/* Categoría eliminada */}
                          <span>⭐ Rating: {item.game.rating}/5</span>
                          {item.game.elements && item.game.elements.length > 0 && (
                            <span> | Elementos: {item.game.elements.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="mb-1">
                          <span className="badge bg-secondary">Cantidad: {item.quantity}</span>
                        </div>
                        <strong className="text-success">${item.price.toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}

                  {/* Totales */}
                  <div className="row mt-4 pt-3 border-top">
                    <div className="col-6 text-end">
                      <p className="mb-2">Subtotal ({order.items.length} productos):</p>
                      <p className="mb-2">Costo de envío:</p>
                      <p className="mb-0 fw-bold fs-5">Total:</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-2">${order.subtotal.toFixed(2)}</p>
                      <p className="mb-2">${order.shippingCost.toFixed(2)}</p>
                      <p className="mb-0 fw-bold fs-5 text-success">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline de estados */}
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">📊 Historial del Pedido</h5>
                </div>
                <div className="card-body">
                  <div className="timeline">
                    {order.statusHistory.map((status, index) => (
                      <div key={index} className="timeline-item d-flex mb-3">
                        <div className="timeline-marker flex-shrink-0">
                          <div className={`status-dot ${
                            status.status === 'pending' ? 'bg-warning' :
                            status.status === 'confirmed' ? 'bg-info' :
                            status.status === 'shipped' ? 'bg-primary' :
                            status.status === 'delivered' ? 'bg-success' : 'bg-danger'
                          }`}></div>
                        </div>
                        <div className="timeline-content ms-3 flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <strong>{status.description}</strong>
                              <br />
                              <small className="text-muted">
                                {new Date(status.timestamp).toLocaleDateString('es-ES', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </small>
                            </div>
                            {index === 0 && <span className="badge bg-light text-dark">Actual</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Información adicional */}
            <div className="col-lg-4">
              {/* Información de envío */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">📦 Dirección de Envío</h6>
                </div>
                <div className="card-body">
                  <p className="mb-2"><strong>{order.shippingAddress.fullName}</strong></p>
                  <p className="mb-2">{order.shippingAddress.address}</p>
                  <p className="mb-2">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  <p className="mb-2">{order.shippingAddress.zipCode}</p>
                  <p className="mb-1">
                    <small className="text-muted">
                      📧 {order.shippingAddress.email}
                    </small>
                  </p>
                  <p className="mb-0">
                    <small className="text-muted">
                      📞 {order.shippingAddress.phone || 'No proporcionado'}
                    </small>
                  </p>
                </div>
              </div>

              {/* Información de pago */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">💳 Información de Pago</h6>
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>
                      {order.paymentMethod.type === 'credit-card' ? '💳 Tarjeta de Crédito' : 
                       order.paymentMethod.type === 'qr' ? '📱 Código QR' : '🔵 PayPal'}
                    </strong>
                  </p>
                  {order.paymentMethod.cardNumber && (
                    <p className="mb-2">
                      <small>Terminada en: •••• {order.paymentMethod.cardNumber}</small>
                    </p>
                  )}
                  {order.paymentMethod.cardHolder && (
                    <p className="mb-2">
                      <small>Titular: {order.paymentMethod.cardHolder}</small>
                    </p>
                  )}
                  <p className="mb-0">
                    <small>Fecha del pedido: {new Date(order.createdAt).toLocaleDateString()}</small>
                  </p>
                </div>
              </div>

              {/* Seguimiento */}
              {order.trackingNumber && (
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">🚚 Información de Seguimiento</h6>
                  </div>
                  <div className="card-body">
                    <p className="mb-2">
                      <strong>Número de tracking:</strong>
                    </p>
                    <code className="bg-light p-2 rounded d-block mb-3 text-center fw-bold">
                      {order.trackingNumber}
                    </code>
                    <button className="btn btn-outline-primary btn-sm w-100">
                      📱 Rastrear envío
                    </button>
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h6 className="mb-0">⚡ Acciones</h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      📄 Descargar factura
                    </button>
                    <button className="btn btn-outline-success btn-sm">
                      🔄 Volver a comprar
                    </button>
                    {order.currentStatus === 'confirmed' && (
                      <button className="btn btn-outline-danger btn-sm">
                        ❌ Cancelar pedido
                      </button>
                    )}
                    {order.currentStatus === 'delivered' && (
                      <button className="btn btn-outline-warning btn-sm">
                        ⭐ Dejar reseña
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Resumen rápido */}
              <div className="card shadow-sm mt-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">📋 Resumen Rápido</h6>
                </div>
                <div className="card-body">
                  <div className="small">
                    <p className="mb-1"><strong>Productos:</strong> {order.items.length}</p>
                    <p className="mb-1"><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="mb-1"><strong>Estado:</strong> {statusInfo.text}</p>
                    <p className="mb-0"><strong>Total:</strong> <span className="text-success">${order.total.toFixed(2)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-item {
          position: relative;
          padding-left: 20px;
        }
        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 6px;
        }
        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 18px;
          bottom: -15px;
          width: 2px;
          background-color: #dee2e6;
        }
        .timeline-content {
          margin-left: 15px;
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;