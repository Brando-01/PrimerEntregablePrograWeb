import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import '../../assets/estiloAdminNoticias.css';

const GameModalAdmin = ({ visible, onClose, game }) => {
  const { updateGame, deleteGame } = useGame();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    platform: 'Arcana',
    elements: [],
    stock: 0,
    sku: '',
    discount: 0,
    featured: false,
    isActive: true
  });

  const [images, setImages] = useState([]);
  const [trailer, setTrailer] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  // Cargar datos del juego cuando se abre el modal
  useEffect(() => {
    if (visible && game) {
      setFormData({
        title: game.title,
        description: game.description,
        price: game.price,
        platform: game.platform,
        elements: game.elements || [],
        stock: game.stock,
        sku: game.sku,
        discount: game.discount || 0,
        featured: game.featured || false,
        isActive: game.isActive
      });
      setImages(game.images);
      setTrailer(game.trailer || '');
    }
  }, [visible, game]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!game) return;

    const updatedGame = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      platform: formData.platform,
      elements: formData.elements || [],
      images: images,
      trailer: trailer || undefined,
      stock: formData.stock,
      isActive: formData.isActive,
      sku: formData.sku,
      discount: formData.discount,
      featured: formData.featured
    };

    updateGame(game.id, updatedGame);
    alert('✅ Producto actualizado correctamente');
    onClose();
  };

  const handleDelete = () => {
    if (!game) return;
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${game.title}"? Esta acción no se puede deshacer.`)) {
      deleteGame(game.id);
      alert('🗑️ Producto eliminado correctamente');
      onClose();
    }
  };

  const handleImageAdd = (url) => {
    if (url.trim() && !images.includes(url)) {
      setImages(prev => [...prev, url]);
    }
  };

  const handleImageRemove = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Calcular estadísticas (simuladas)
  const getProductStats = () => {
    return {
      totalSales: Math.floor(Math.random() * 1000),
      totalRevenue: (Math.random() * 10000).toFixed(2),
      averageRating: game?.reviews.length ? 
        (game.reviews.reduce((sum, r) => sum + r.stars, 0) / game.reviews.length).toFixed(1) : '0.0',
      lastSale: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
  };

  const stats = getProductStats();

  if (!visible || !game) return null;

  return (
    <div className="modal d-block" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">
              🎮 Gestión Avanzada: {game.title}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} />
          </div>

          {/* Tabs de navegación */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
                        <button 
                className={`nav-link ${activeTab === 'edit' ? 'active' : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                ✏️ Editar Poder
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                📊 Estadísticas
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                ⭐ Reseñas ({game.reviews.length})
              </button>
            </li>
          </ul>

          <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            
            {/* Pestaña: Editar Producto */}
            {activeTab === 'edit' && (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Columna izquierda - Información básica */}
                  <div className="col-md-6">
                    <h6>📝 Información Básica</h6>
                    
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">Nombre del Poder *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      {/* Categoría eliminada (no usar) */}
                      <div className="col-6">
                        <label className="form-label">Tipo de Magia *</label>
                        <select
                          className="form-select"
                          value={formData.platform}
                          onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                          required
                        >
                          <option value="Arcana">Arcana</option>
                          <option value="Elemental">Elemental</option>
                          <option value="Divina">Divina</option>
                          <option value="Sombras">Sombras</option>
                          <option value="Naturaleza">Naturaleza</option>
                          <option value="Tecnomancia">Tecnomancia</option>
                        </select>
                        <div className="mt-2">
                          <label className="form-label">Elementos</label>
                          <div className="d-flex flex-wrap gap-2">
                            {['Fuego','Agua','Tierra','Aire','Luz','Oscuridad','Éter'].map(el => (
                              <div className="form-check" key={el} style={{ minWidth: '100px' }}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`elem-${game?.id}-${el}`}
                                  checked={(formData.elements || []).includes(el)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setFormData(prev => {
                                      const next = new Set(prev.elements || []);
                                      if (checked) next.add(el); else next.delete(el);
                                      return { ...prev, elements: Array.from(next) };
                                    });
                                  }}
                                />
                                <label className="form-check-label" htmlFor={`elem-${game?.id}-${el}`}>{el}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label">Precio ($) *</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Descuento (%)</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="100"
                          value={formData.discount}
                          onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label">Stock *</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          value={formData.stock}
                          onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">SKU *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.sku}
                          onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Descripción *</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Columna derecha - Multimedia y opciones */}
                  <div className="col-md-6">
                    <h6>🖼️ Multimedia</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Imágenes URLs</label>
                      <div className="input-group mb-2">
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://ejemplo.com/imagen.jpg"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleImageAdd(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling;
                            handleImageAdd(input.value);
                            input.value = '';
                          }}
                        >
                          Agregar
                        </button>
                      </div>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {images.map((img, index) => (
                          <div key={index} className="position-relative d-inline-block">
                            <img src={img} alt={`Preview ${index}`} style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="rounded" />
                            <button
                              type="button"
                              className="btn-close position-absolute top-0 end-0 bg-white"
                              style={{ fontSize: '0.5rem' }}
                              onClick={() => handleImageRemove(index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">URL del Trailer (YouTube)</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://www.youtube.com/embed/..."
                        value={trailer}
                        onChange={(e) => setTrailer(e.target.value)}
                      />
                    </div>

                    <h6>⚙️ Opciones</h6>
                    <div className="row mb-3">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.featured}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          />
                          <label className="form-check-label">Producto destacado</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                          />
                          <label className="form-check-label">Activo en tienda</label>
                        </div>
                      </div>
                    </div>

                    {/* Vista previa rápida */}
                    <div className="card mt-3">
                      <div className="card-header">
                        <h6 className="mb-0">👀 Vista Previa Rápida</h6>
                      </div>
                      <div className="card-body">
                        <img src={images[0] || '/img/default-game.jpg'} alt="Preview" className="img-fluid rounded mb-2" />
                        <h6>{formData.title || 'Título del juego'}</h6>
                        <p className="text-muted small">{formData.description.substring(0, 100)}...</p>
                        <div className="d-flex justify-content-between">
                          <span className={formData.discount ? 'text-danger text-decoration-line-through' : 'fw-bold'}>
                            ${formData.price.toFixed(2)}
                          </span>
                          {formData.discount > 0 && (
                            <span className="fw-bold text-success">
                              ${(formData.price * (1 - formData.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Pestaña: Estadísticas */}
            {activeTab === 'stats' && (
              <div>
                <h6>📊 Estadísticas de Rendimiento</h6>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <div className="card text-center bg-primary text-white">
                      <div className="card-body">
                        <h4>{stats.totalSales}</h4>
                        <small>Ventas Totales</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card text-center bg-success text-white">
                      <div className="card-body">
                        <h4>${stats.totalRevenue}</h4>
                        <small>Ingresos Generados</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card text-center bg-warning text-white">
                      <div className="card-body">
                        <h4>{stats.averageRating}/5</h4>
                        <small>Rating Promedio</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card text-center bg-info text-white">
                      <div className="card-body">
                        <h4>{game.stock}</h4>
                        <small>Stock Actual</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <h6>📈 Historial de Ventas (Últimos 7 días)</h6>
                  <div className="bg-light p-3 rounded text-center">
                    <p className="text-muted">Gráfico de ventas simuladas</p>
                    <div style={{ height: '150px', background: 'linear-gradient(to top, #28a745, #dc3545)' }} className="rounded"></div>
                    <small className="text-muted">Visualización de tendencias de ventas</small>
                  </div>
                </div>
              </div>
            )}

            {/* Pestaña: Reseñas */}
            {activeTab === 'reviews' && (
              <div>
                <h6>⭐ Reseñas de Usuarios ({game.reviews.length})</h6>
                {game.reviews.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">Este producto no tiene reseñas aún.</p>
                  </div>
                ) : (
                  <div className="reviews-list">
                    {game.reviews.map((review, index) => (
                      <div key={index} className="card mb-2">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <strong>{review.name}</strong>
                            <span className="text-warning">{'★'.repeat(review.stars)}</span>
                          </div>
                          <p className="mb-1">{review.comment}</p>
                          <small className="text-muted">{review.date}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <div className="d-flex justify-content-between w-100">
              <div>
                {activeTab === 'edit' && (
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    🗑️ Eliminar Producto
                  </button>
                )}
              </div>
              <div>
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancelar
                </button>
                {activeTab === 'edit' && (
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    💾 Guardar Cambios
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModalAdmin;