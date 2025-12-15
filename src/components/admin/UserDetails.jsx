import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useOrder } from '../context/OrderContext';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getUserById } = useUser();
  const { orders } = useOrder();

  const user = getUserById(userId || '');

  const userOrders = orders
    .filter(order => order.userId === `user${userId}` || order.userId === userId)
    .slice(0, 10)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Usuario no encontrado</h4>
          <p>El usuario con ID #{userId} no existe en el sistema.</p>
          <p className="text-muted">
            <small>Posibles causas: El usuario fue eliminado o hay un error en el ID.</small>
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/admin-panel')}>
            Volver al panel admin
          </button>
        </div>
      </div>
    );
  }

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

  const toggleUserStatus = () => {
    if (window.confirm(`¿Estás seguro de que quieres ${user.isActive ? 'desactivar' : 'activar'} a ${user.fullName}?`)) {
      alert(`Usuario ${user.isActive ? 'desactivado' : 'activado'} correctamente`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button 
                className="btn btn-outline-secondary btn-sm me-3"
                onClick={() => navigate('/admin-panel')}
              >
                ← Volver al panel
              </button>
              <h2 className="d-inline-block mb-0">Detalle del Usuario</h2>
            </div>
            <div className="text-end">
              <div className="text-muted">User ID</div>
              <strong>#{user.id}</strong>
            </div>
          </div>

          <div className="row">
            {/* Columna izquierda - Información del usuario */}
            <div className="col-lg-4">
              {/* Tarjeta de información personal */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">👤 Información Personal</h6>
                </div>
                <div className="card-body text-center">
                  <img 
                    src={user.avatar} 
                    alt={user.fullName}
                    className="rounded-circle mb-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <h5>{user.fullName}</h5>
                  <p className="text-muted">@{user.nickname}</p>
                  
                  <div className="text-start small">
                    <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                    <p className="mb-1"><strong>Registro:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
                    <p className="mb-1"><strong>Último login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Nunca'}</p>
                    <p className="mb-0">
                      <strong>Estado:</strong> 
                      <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta de estadísticas */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">📊 Estadísticas</h6>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <div className="row">
                      <div className="col-6">
                        <div className="border-end">
                          <h4 className="text-primary mb-0">{user.totalOrders}</h4>
                          <small className="text-muted">Órdenes</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <h4 className="text-success mb-0">${user.totalSpent}</h4>
                        <small className="text-muted">Total Gastado</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h6 className="mb-0">⚡ Acciones</h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button 
                      className={`btn btn-sm ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                      onClick={toggleUserStatus}
                    >
                      {user.isActive ? '🚫 Desactivar Usuario' : '✅ Activar Usuario'}
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      ✉️ Enviar Email
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      📊 Ver Estadísticas Completas
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Historial de órdenes */}
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">📦 Órdenes Recientes (Máximo 10)</h6>
                  <span className="badge bg-primary">{userOrders.length} órdenes</span>
                </div>
                <div className="card-body">
                  {userOrders.length === 0 ? (
                    <div className="text-center py-4">
                      <div className="text-muted mb-2">📭</div>
                      <p>Este usuario no tiene órdenes aún.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-sm table-hover">
                        <thead>
                          <tr>
                            <th>Orden ID</th>
                            <th>Fecha</th>
                            <th>Productos</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userOrders.map(order => (
                            <tr key={order.id}>
                              <td>
                                <small className="text-muted">#{order.id}</small>
                              </td>
                              <td>
                                <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                              </td>
                              <td>
                                <small>{order.items.length} producto(s)</small>
                              </td>
                              <td>
                                <strong>${order.total.toFixed(2)}</strong>
                              </td>
                              <td>
                                {getStatusBadge(order.currentStatus)}
                              </td>
                              <td>
                                <button 
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => navigate(`/order-details/${order.id}`)}
                                >
                                  Ver
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Información adicional */}
              <div className="card shadow-sm mt-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">ℹ️ Información Adicional</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Promedio por orden:</strong>
                      <br />
                      <span className="text-success">
                        ${user.totalOrders > 0 ? (user.totalSpent / user.totalOrders).toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="col-md-6">
                      <strong>Miembro desde:</strong>
                      <br />
                      <span className="text-muted">
                        {Math.floor((new Date().getTime() - new Date(user.registrationDate).getTime()) / (1000 * 3600 * 24))} días
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserDetails;