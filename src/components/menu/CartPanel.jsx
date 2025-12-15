import React from 'react';
import '../../assets/juego.css';

const CartPanel = ({ 
  visible, 
  onClose, 
  items, 
  savedItems,
  onRemove, 
  onRemoveSaved,
  onSaveForLater,
  onMoveToCart,
  onClearSaved,
  onBuy,
  onIncrementQuantity,
  onDecrementQuantity
}) => {
  if (!visible) return null;

  const total = items.reduce((sum, item) => {
    const discount = Number(item.discount) || 0;
    const unitPrice = Number(item.price) * (1 - (discount / 100));
    return sum + (unitPrice * (item.quantity || 1));
  }, 0);

  return (
    <div className="cart-panel" style={{ width: '520px', maxWidth: '95%' }}>
      <div className="card shadow-lg border-0">
        <div className="card-header bg-dark text-white">
          <h5 className="card-title mb-0">📜 Grimorio de Hechizos</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={onClose}
            aria-label="Cerrar"
          ></button>
        </div>
        
        <div className="card-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* Sección: Hechizos en el Grimorio */}
          <div className="mb-4">
            <h6 className="text-primary mb-3">
              🔮 Poderes Listos para Invocar 
              {items.length > 0 && <span className="badge bg-primary ms-2">{items.length}</span>}
            </h6>
            
            {items.length === 0 ? (
              <div className="text-center py-3">
                <div className="text-muted mb-2">✨</div>
                <p className="text-muted small mb-0">Tu grimorio está vacío</p>
                <small className="text-muted">Agrega poderes mágicos para comenzar</small>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {items.map((item) => (
                  <div key={item.id} className="list-group-item px-0 py-3 border-bottom">
                    <div className="d-flex align-items-start">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="rounded me-3 flex-shrink-0"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold">{item.title}</h6>
                        <p className="text-muted small mb-1">Tipo: {item.platform}{item.elements && item.elements.length > 0 ? ` • ${item.elements.join(', ')}` : ''}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            {(() => {
                              const discount = Number(item.discount) || 0;
                              const unitPrice = Number(item.price) * (1 - (discount / 100));
                              return (
                                <>
                                  <strong className="text-success">${unitPrice.toFixed(2)}</strong>
                                  {discount > 0 && <span className="badge bg-danger ms-2">{discount}% OFF</span>}
                                </>
                              );
                            })()}
                            <div className="input-group input-group-sm" style={{ width: '120px' }}>
                              <button className="btn btn-outline-secondary" type="button" onClick={() => (onDecrementQuantity ? onDecrementQuantity(item.id) : null)}>-</button>
                              <input type="text" readOnly className="form-control text-center" value={item.quantity || 1} />
                              <button className="btn btn-outline-secondary" type="button" onClick={() => (onIncrementQuantity ? onIncrementQuantity(item.id) : null)}>+</button>
                            </div>
                          </div>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-warning"
                              onClick={() => onSaveForLater(item)}
                              title="Guardar para después"
                            >
                              💾
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => onRemove(item.id)}
                              title="Eliminar del grimorio"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sección: Guardado para Despues */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="text-warning mb-0">
                💾 Guardado para Despues
                {savedItems.length > 0 && <span className="badge bg-warning ms-2">{savedItems.length}</span>}
              </h6>
              {savedItems.length > 0 && (
                <button 
                  className="btn btn-outline-warning btn-sm"
                  onClick={onClearSaved}
                  title="Limpiar todos los guardados"
                >
                  🧹
                </button>
              )}
            </div>
            
            {savedItems.length === 0 ? (
              <p className="text-muted small">No tienes Guardado para Despues</p>
            ) : (
              <div className="list-group list-group-flush">
                {savedItems.map((item) => (
                  <div key={item.id} className="list-group-item px-0 py-2 border-bottom">
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="rounded me-2 flex-shrink-0"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <small className="fw-bold d-block">{item.title}</small>
                        {(() => {
                          const discount = Number(item.discount) || 0;
                          const unitPrice = Number(item.price) * (1 - (discount / 100));
                          return <small className="text-success">${unitPrice.toFixed(2)}{discount > 0 ? ` • ${discount}% OFF` : ''}</small>;
                        })()}
                      </div>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-success btn-sm"
                          onClick={() => onMoveToCart(item)}
                          title="Mover al grimorio"
                        >
                          🔮
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onRemoveSaved(item.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total y Botones de Acción */}
          {items.length > 0 && (
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <strong className="fs-5">Total del Ritual:</strong>
                <strong className="fs-5 text-success">${total.toFixed(2)}</strong>
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-success btn-lg" 
                  onClick={onBuy}
                >
                  🚀 Iniciar Ritual de Invocación
                </button>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={onClose}
                >
                  ↩️ Seguir Explorando
                </button>
              </div>
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center">
              <button 
                className="btn btn-primary" 
                onClick={onClose}
              >
                🔍 Explorar Poderes Mágicos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;