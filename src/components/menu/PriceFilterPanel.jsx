import React, { useState } from 'react';
import '../../assets/juego.css';

const PriceFilterPanel = ({ visible, onChange, min, max }) => {
  const [selectedPrice, setSelectedPrice] = useState(max); // valor inicial

  if (!visible) return null;

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedPrice(value);
    onChange(value); // esto llama al filtro externo
  };

  return (
    <div className="search-panel position-absolute p-3" style={{ top: '80px', right: '20px' }}>
      <h6 className="mb-3">Filtrar por precio</h6>
      <div>
        <div className="d-flex justify-content-between mb-2">
          <span>${min}</span>
          <span>${max}</span>
        </div>

        {/* Valor actual mostrado en el centro */}
        <div className="text-center mb-2">
          <strong>Precio seleccionado: ${selectedPrice}</strong>
        </div>

        <input
          type="range"
          className="form-range"
          min={min}
          max={max}
          value={selectedPrice}
          step={5}
          onChange={handleSliderChange}
        />

        <div className="d-flex justify-content-between">
          <small>Mín</small>
          <small>Máx</small>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterPanel;