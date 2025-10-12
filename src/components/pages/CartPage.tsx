// components/pages/CartPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Game } from '../types';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = React.useState<Game[]>([]);
  const [savedItems, setSavedItems] = React.useState<Game[]>([]);

  React.useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    const saved = localStorage.getItem('saved-items');
    
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (saved) setSavedItems(JSON.parse(saved));
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const newCart = cartItems.filter(game => game.id !== id);
    setCartItems(newCart);
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
  };

  const handleSaveForLater = (game: Game) => {
    // Remover del grimorio
    const newCart = cartItems.filter(item => item.id !== game.id);
    setCartItems(newCart);
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
    
    // Agregar a guardados
    if (!savedItems.some(item => item.id === game.id)) {
      const newSaved = [...savedItems, game];
      setSavedItems(newSaved);
      localStorage.setItem('saved-items', JSON.stringify(newSaved));
    }
  };

  const handleMoveToCart = (game: Game) => {
    // Remover de guardados
    const newSaved = savedItems.filter(item => item.id !== game.id);
    setSavedItems(newSaved);
    localStorage.setItem('saved-items', JSON.stringify(newSaved));
    
    // Agregar al grimorio
    const newCart = [...cartItems, game];
    setCartItems(newCart);
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
  };

  const handleRemoveSaved = (id: number) => {
    const newSaved = savedItems.filter(item => item.id !== id);
    setSavedItems(newSaved);
    localStorage.setItem('saved-items', JSON.stringify(newSaved));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={() => navigate('/')}>
          ← Volver al Santuario
        </button>
        <h1>📜 Grimorio de Hechizos</h1>
        {cartItems.length > 0 && (
          <span className="badge bg-primary ms-3">{cartItems.length} poderes</span>
        )}
      </div>

      <div className="row">
        {/* Grimorio Principal */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">🔮 Poderes Listos para Invocar</h5>
            </div>
            <div className="card-body">
              {cartItems.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">Tu grimorio está vacío</p>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Explorar Poderes Mágicos
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} className="d-flex align-items-center border-bottom pb-3 mb-3">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        className="rounded me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.title}</h6>
                        <p className="text-muted mb-1">{item.category}</p>
                        <strong className="text-success">${item.price.toFixed(2)}</strong>
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => handleSaveForLater(item)}
                        >
                          💾 Guardar
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <strong>Energía Total Requerida: ${total.toFixed(2)}</strong>
                    <button 
                      className="btn btn-success"
                      onClick={() => navigate('/checkout')}
                    >
                      🚀 Iniciar Ritual de Invocación
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hechizos Guardados para Después */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">💾 Hechizos Guardados</h5>
            </div>
            <div className="card-body">
              {savedItems.length === 0 ? (
                <p className="text-muted small">No tienes hechizos guardados para después</p>
              ) : (
                savedItems.map(item => (
                  <div key={item.id} className="d-flex align-items-center border-bottom pb-2 mb-2">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded me-2"
                    />
                    <div className="flex-grow-1">
                      <small className="fw-bold">{item.title}</small>
                      <br />
                      <small className="text-success">${item.price.toFixed(2)}</small>
                    </div>
                    <div className="d-flex gap-1">
                      <button 
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleMoveToCart(item)}
                        title="Mover al grimorio"
                      >
                        🔮
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveSaved(item.id)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;