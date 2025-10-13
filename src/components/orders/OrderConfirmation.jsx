import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderConfirmation = ({ onContinueShopping }) => {
  const navigate = useNavigate();
  const { currentOrder, orders, clearCurrentOrder } = useOrder();

  // ✅ USAR LA ORDEN ACTUAL DEL CONTEXTO (no mock data)
  const order = currentOrder;

  const handleContinueShopping = () => {
    clearCurrentOrder();
    onContinueShopping();
  };

  if (!order) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-info">
          <h4>🚀 ¡Bienvenido al Sistema Real de Órdenes!</h4>
          <p>Para ver una confirmación de pedido, primero completa un checkout real.</p>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={() => navigate('/')}>
              Ir a Comprar
            </button>
            <button className="btn btn-outline-primary" onClick={() => navigate('/order-history')}>
              Ver Historial
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header de éxito */}
          <div className="text-center mb-5">
            <div className="display-1 text-success mb-3">🎉</div>
            <h1 className="text-success">¡Pedido Confirmado EXITOSAMENTE!</h1>
            <p className="lead">Esta es una confirmación REAL con datos de tu compra</p>
            <p className="text-muted">Número de orden: <strong>{order.id}</strong></p>
          </div>

          {/* Resumen del pedido REAL */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">📦 Resumen del Pedido Real</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>📍 Dirección de Envío</h6>
                  <p><strong>{order.shippingAddress.fullName}</strong></p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  <p>📧 {order.shippingAddress.email}</p>
                  <p>📞 {order.shippingAddress.phone || 'No proporcionado'}</p>
                </div>
                <div className="col-md-6">
                  <h6>💳 Información de Pago</h6>
                  <p><strong>
                    {order.paymentMethod.type === 'credit-card' ? 'Tarjeta de Crédito' : 
                     order.paymentMethod.type === 'qr' ? 'Código QR' : 'PayPal'}
                  </strong></p>
                  <p>Total: <strong>${order.total.toFixed(2)}</strong></p>
                  <p>Estado: <span className="badge bg-success">Confirmado</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ PRODUCTOS REALES DEL CARRITO (no siempre GTA V) */}
          <div className="card shadow-sm mb-4">
            <div className="card-header">
              <h5 className="mb-0">🛒 Productos Comprados</h5>
            </div>
            <div className="card-body">
              {order.items.map((item, index) => (
                <div key={index} className="d-flex align-items-center border-bottom pb-3 mb-3">
                  <img 
                    src={item.game.images[0]} 
                    alt={item.game.title}
                    className="rounded me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.game.title}</h6>
                    <small className="text-muted">
                      Plataforma: {item.game.platform} | 
                      Categoría: {item.game.category}
                    </small>
                    <br />
                    <small className="text-success">Precio: ${item.price.toFixed(2)}</small>
                  </div>
                  <span className="badge bg-secondary">Cantidad: {item.quantity}</span>
                </div>
              ))}
              
              <div className="row mt-3">
                <div className="col-6 text-end">
                  <p>Subtotal:</p>
                  <p>Envío:</p>
                  <p><strong>Total:</strong></p>
                </div>
                <div className="col-6 text-end">
                  <p>${order.subtotal.toFixed(2)}</p>
                  <p>${order.shippingCost.toFixed(2)}</p>
                  <p><strong>${order.total.toFixed(2)}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-primary me-3" onClick={() => navigate('/order-history')}>
              📋 Ver Mi Historial Real
            </button>
            <button className="btn btn-success" onClick={handleContinueShopping}>
              🏪 Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;