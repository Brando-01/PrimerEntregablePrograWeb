import React, { useState } from 'react';
import '../../assets/estiloAdminNoticias.css';

const FilterGamesModal = ({ visible, onClose, onFilter }) => {
  const [fecha, setFecha] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ fecha, precioMin, precioMax });
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-custom" onClick={onClose}>
      <div className="modal-content-custom modal-medium" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Filtrar Juegos</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Fecha */}
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">Fecha</label>
              <input type="date" className="form-control" id="fecha" value={fecha} onChange={e => setFecha(e.target.value)} />
            </div>

            {/* (Categoría eliminada) */}

            {/* Rango de precio */}
            <div className="mb-3">
              <label className="form-label">Rango de Precio</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input type="number" className="form-control" placeholder="Mín" value={precioMin} onChange={e => setPrecioMin(e.target.value)} />
                <span className="input-group-text">-</span>
                <input type="number" className="form-control" placeholder="Máx" value={precioMax} onChange={e => setPrecioMax(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterGamesModal;