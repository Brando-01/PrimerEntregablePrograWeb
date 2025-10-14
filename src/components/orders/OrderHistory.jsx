import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orders } = useOrder(); // ✅ Usar órdenes reales del contexto
  const session = JSON.parse(localStorage.getItem('userSession') || 'null');
  const isAdmin = session?.role === 'admin';
  const [filterStatus, setFilterStatus] = useState('all');

  // Filtrar por estado y por usuario si no es admin
  const filteredOrders = orders.filter(order => {
    const statusOk = filterStatus === 'all' || order.currentStatus === filterStatus;
    // A userSession may contain username and/or fullName and/or email.
    // Match the order.userId against any of those to avoid mismatches when
    // different parts of the app prefer username vs fullName.
    const userOk = isAdmin
      ? true
      : (session
          ? (
              order.userId === session.username ||
              order.userId === session.fullName ||
              order.userId === session.email
            )
          : false
        );
    return statusOk && userOk;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning', text: 'Pendiente' },
      confirmed: { class: 'bg-info', text: 'Confirmado' },
      shipped: { class: 'bg-primary', text: 'Enviado' },
      delivered: { class: 'bg-success', text: 'Entregado' },
      cancelled: { class: 'bg-danger', text: 'Cancelado' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>📋 Mis Pedidos Reales</h2>
            <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
              ← Volver a la tienda
            </button>
          </div>

          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <label className="form-label">Filtrar por estado:</label>
                </div>
                <div className="col-md-6">
                  <select 
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Todos los estados</option>
                    <option value="pending">Pendientes</option>
                    <option value="confirmed">Confirmados</option>
                    <option value="shipped">Enviados</option>
                    <option value="delivered">Entregados</option>
                    <option value="cancelled">Cancelados</option>
                  </select>
                </div>
                <div className="col-md-3 text-end">
                  <span className="text-muted">
                    {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de pedidos REALES */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-3">📦</div>
              <h4>No hay pedidos para mostrar</h4>
              <p className="text-muted">
                {filterStatus === 'all' 
                  ? "Aún no has realizado ningún pedido."
                  : `No hay pedidos con estado "${filterStatus}".`
                }
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                Comenzar a comprar
              </button>
            </div>
          ) : (
            <div className="row">
              {filteredOrders.map(order => (
                <div key={order.id} className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Orden #{order.id}</h6>
                      {getStatusBadge(order.currentStatus)}
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      
                      <div className="mb-3">
                        <strong>Productos ({order.items.length}):</strong>
                        <div className="mt-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                              <img 
                                src={item.game.images[0]} 
                                alt={item.game.title}
                                className="rounded me-2"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                              <div className="flex-grow-1">
                                <small className="fw-bold">{item.game.title}</small>
                                <br />
                                <small className="text-muted">
                                  ${item.price.toFixed(2)} • {item.game.platform}
                                </small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Total: ${order.total.toFixed(2)}</strong>
                        </div>
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate(`/order-details/${order.id}`)}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;