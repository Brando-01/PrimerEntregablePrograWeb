import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import '../../assets/estiloAdminNoticias.css';

const AdminGameModal = ({ visible, onClose, initialData }) => {
  const { addGame, updateGame, games } = useGame();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    platform: 'Arcana', // usado como "Tipo de Magia" (mantener campo platform para compatibilidad)
    elements: [],
    stock: 10,
    sku: '',
    discount: 0,
    featured: false,
    isActive: true
  });

  const [images, setImages] = useState(['/img/default-game.jpg']);
  const [trailer, setTrailer] = useState('');

  // Resetear form cuando se abre/cierra el modal o cambian los datos iniciales
  useEffect(() => {
    if (visible) {
      if (initialData) {
        // Modo edición
        setFormData({
          title: initialData.title,
          description: initialData.description,
          price: initialData.price,
          platform: initialData.platform || 'Arcana',
          elements: initialData.elements || [],
          stock: initialData.stock,
          sku: initialData.sku,
          discount: initialData.discount || 0,
          featured: initialData.featured || false,
          isActive: initialData.isActive
        });
        setImages(initialData.images);
        setTrailer(initialData.trailer || '');
      } else {
        // Modo creación
        setFormData({
          title: '',
          description: '',
          price: 0,
          platform: 'Arcana',
          elements: [],
          stock: 10,
          sku: `SKU-${Date.now()}`,
          discount: 0,
          featured: false,
          isActive: true
        });
        setImages(['/img/default-game.jpg']);
        setTrailer('');
      }
    }
  }, [visible, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const gameData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      // Guardamos el tipo de magia en el campo `platform` para mantener compatibilidad
      platform: formData.platform,
      elements: formData.elements || [],
      images: images,
      trailer: trailer || undefined,
      rating: 0,
      reviews: [],
      stock: formData.stock,
      isActive: formData.isActive,
      sku: formData.sku,
      discount: formData.discount,
      featured: formData.featured
    };

    if (initialData) {
      // Actualizar juego existente
      updateGame(initialData.id, gameData);
      alert('✅ Poder actualizado correctamente');
    } else {
      // Agregar nuevo juego
      addGame(gameData);
      alert('✅ Poder invocado correctamente');
    }

    onClose();
  };

  const handleImageAdd = (url) => {
    if (url.trim() && !images.includes(url)) {
      setImages(prev => [...prev, url]);
    }
  };

  const handleImageRemove = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!visible) return null;

  return (
    <div className="modal d-block" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            {/* Encabezado */}
                <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">
                {initialData ? '✏️ Editar Poder' : '➕ Invocar Nuevo Poder'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} />
            </div>

            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              
              {/* Información básica */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre del Poder *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                {/* Categoría eliminada (no usar) */}
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
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
                </div>
                <div className="col-12 mt-2">
                  <label className="form-label">Elementos (selección múltiple)</label>
                  <div className="d-flex flex-wrap gap-2">
                    {['Fuego','Agua','Tierra','Aire','Luz','Oscuridad','Éter'].map(el => (
                      <div className="form-check" key={el} style={{ minWidth: '110px' }}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`element-${el}`}
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
                        <label className="form-check-label" htmlFor={`element-${el}`}>{el}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-3">
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
                <div className="col-md-3">
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

              {/* Stock y SKU */}
              <div className="row mb-3">
                <div className="col-md-6">
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
                <div className="col-md-6">
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

              {/* Descripción */}
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

              {/* Imágenes */}
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
                <div className="d-flex flex-wrap gap-2">
                  {images.map((img, index) => (
                    <div key={index} className="position-relative d-inline-block">
                      <img src={img} alt={`Preview ${index}`} style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="rounded" />
                      <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0"
                        style={{ fontSize: '0.5rem' }}
                        onClick={() => handleImageRemove(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trailer */}
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

              {/* Opciones */}
              <div className="row mb-3">
                <div className="col-md-6">
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
                <div className="col-md-6">
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
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {initialData ? '💾 Guardar Cambios' : '➕ Agregar Juego'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminGameModal;