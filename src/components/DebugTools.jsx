// components/DebugTools.jsx
import React from 'react';
import { useOrder } from './context/OrderContext';
import { createSampleOrder, clearAllOrders } from './context/OrderContext';

const DebugTools = () => {
  const { currentOrder, orders, addOrder } = useOrder();
  
  const handleAddSampleOrder = () => {
    const sampleOrder = createSampleOrder();
    addOrder(sampleOrder);
    alert(`Orden de ejemplo agregada: ${sampleOrder.id}`);
  };

  const handleClearOrders = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las órdenes?')) {
      clearAllOrders();
      window.location.reload();
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Solo mostrar en desarrollo
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: '#ff6b6b',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 10000,
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h6>🐛 Debug Tools (Solo Desarrollo)</h6>
      
      <div style={{ marginBottom: '10px' }}>
        <p><strong>Estado Actual:</strong></p>
        <p>Current Order: {currentOrder ? currentOrder.id : 'NULL'}</p>
        <p>Total Orders: {orders.length}</p>
      </div>

      <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
        <button 
          onClick={handleAddSampleOrder}
          style={{ padding: '5px', fontSize: '10px' }}
        >
          ➕ Agregar Orden Ejemplo
        </button>
        
        <button 
          onClick={handleClearOrders}
          style={{ padding: '5px', fontSize: '10px', background: '#dc3545' }}
        >
          🧹 Limpiar Todas
        </button>
        
        <button 
          onClick={() => console.log('Órdenes:', orders)}
          style={{ padding: '5px', fontSize: '10px', background: '#17a2b8' }}
        >
          📊 Log en Consola
        </button>
      </div>
    </div>
  );
};

export default DebugTools;