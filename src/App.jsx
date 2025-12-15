// App.jsx - CON TEMA MÁGICO APLICADO
import React, { useState, useEffect } from 'react';
import Navbar from './components/menu/Navbar';
import CartPanel from './components/menu/CartPanel';
import SearchPanel from './components/menu/SearchPanel';
import PriceFilterPanel from './components/menu/PriceFilterPanel';
import Carousel from './components/menu/Carousel';
import GameGrid from './components/menu/GameGrid';
import GameModal from './components/menu/Gamemodal';
import BuyModal from './components/menu/BuyModal';
import Footer from './components/common/Footer';
import AdminPanel from './components/admin/AdminPanel';
import DebugTools from './components/DebugTools';
import { useGame } from './components/context/GameContext';
import MagicParticles from './components/common/MagicParticles';
import { getUserSession } from './utils/session';
import { getSavedItemsForCurrentUser, setSavedItemsForCurrentUser, mergeGuestSavedIntoUser } from './utils/savedItems';
import Hero from './components/common/Hero';
import './assets/magic-theme.css';

function App() {
  const { games } = useGame();
  const [filters, setFilters] = useState({ category: 'All', platform: 'Todas' });
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [uiState, setUiState] = useState({ cartVisible: false, searchVisible: false, priceFilterVisible: false, buyModalVisible: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [priceLimit, setPriceLimit] = useState(100);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    try {
      // Merge guest saved into user if necessary
      mergeGuestSavedIntoUser();
      const items = getSavedItemsForCurrentUser();
      if (items && items.length > 0) setSavedItems(items);
    } catch (error) {
      console.error('Error loading saved items:', error);
    }
    // cargar carrito desde localStorage si existe
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading shopping cart:', err);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const session = getUserSession();
      const key = session && (session.username || session.fullName) ? `saved-items:${(session.username || session.fullName)}` : 'saved-items';
      localStorage.setItem(key, JSON.stringify(savedItems));
    } catch (err) {
      console.error('Error saving saved-items:', err);
    }
  }, [savedItems]);

  // persistir carrito y escuchar eventos externos (ProductDetailPage usa localStorage)
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handler = (e) => {
      try {
        const newCart = e.detail || JSON.parse(localStorage.getItem('shopping-cart') || '[]');
        setCartItems(newCart);
      } catch (err) {
        console.error('Error handling cart-updated event:', err);
      }
    };
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, []);

  const filteredGames = games
    .filter(game => game.isActive)
    .filter(game => {
      return (
        (filters.category === 'All' || game.category === filters.category) &&
        (filters.platform === 'Todas' || game.platform === filters.platform) &&
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        game.price <= priceLimit
      );
    });

  const handleAddToCart = (game, quantity = 1) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === game.id);
      if (exists) {
        return prev.map(item => item.id === game.id ? { ...item, quantity: (item.quantity || 1) + quantity } : item);
      }
      return [...prev, { ...game, quantity }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(game => game.id !== id));
  };

  const handleIncrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item));
  };

  const handleDecrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) - 1;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    }));
  };

  const handleSaveForLater = (game) => {
    setCartItems(prev => prev.filter(item => item.id !== game.id));
    setSavedItems(prev => {
      if (prev.some(item => item.id === game.id)) {
        return prev;
      }
      return [...prev, game];
    });
  };

  const handleMoveToCart = (game) => {
    setSavedItems(prev => prev.filter(item => item.id !== game.id));
    setCartItems(prev => [...prev, game]);
  };

  const handleRemoveSaved = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearSaved = () => {
    setSavedItems([]);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setUiState(prev => ({ ...prev, buyModalVisible: false }));
    window.location.href = '/order-confirmation';
  };

  const toggleUIState = (key) => {
    setUiState(prev => {
      let newState = { ...prev };
      newState[key] = !prev[key];
      if (key !== 'cartVisible') newState.cartVisible = false;
      if (key !== 'searchVisible') newState.searchVisible = false;
      if (key !== 'priceFilterVisible') newState.priceFilterVisible = false;
      return newState;
    });
  };

  const resetFilters = () => {
    setFilters({ category: 'All', platform: 'Todas' });
    setSearchQuery('');
    setPriceLimit(100);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="app-container magic-bg">
      <MagicParticles />
      <Navbar
        onFilterCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        onFilterPlatform={(plat) => setFilters((prev) => ({ ...prev, platform: plat }))}
        onToggleCart={() => toggleUIState('cartVisible')}
        onToggleSearch={() => toggleUIState('searchVisible')}
        onTogglePrice={() => toggleUIState('priceFilterVisible')}
        cartItemCount={cartItems.length}
        savedItemsCount={savedItems.length}
      />
      <CartPanel
        visible={uiState.cartVisible}
        onClose={() => setUiState(prev => ({ ...prev, cartVisible: false }))}
        items={cartItems}
        savedItems={savedItems}
        onRemove={handleRemoveFromCart}
        onRemoveSaved={handleRemoveSaved}
        onSaveForLater={handleSaveForLater}
        onMoveToCart={handleMoveToCart}
        onClearSaved={handleClearSaved}
        onBuy={() => {
          if (cartItems.length > 0) {
            setUiState(prev => ({ ...prev, buyModalVisible: true }));
          } else {
            alert('Tu grimorio está vacío. Agrega poderes antes de invocar.');
          }
        }}
        onIncrementQuantity={handleIncrementQuantity}
        onDecrementQuantity={handleDecrementQuantity}
      />
      <SearchPanel
        visible={uiState.searchVisible}
        onSearch={setSearchQuery}
      />
      <PriceFilterPanel
        visible={uiState.priceFilterVisible}
        onChange={setPriceLimit}
        min={0}
        max={100}
      />
      <main className="main-content">
        <Carousel />
        <div className="container mt-3">
          <div className="alert alert-magic d-flex justify-content-between align-items-center">
            <div>
              <small>
                <strong className="text-glow">🔮 Tienda Mágica Activa:</strong> {filteredGames.length} de {games.length} poderes disponibles | 
                <span className="text-success"> {cartItems.length} en el grimorio</span> | 
                <span className="text-warning"> {savedItems.length} Guardado para Despues</span>
                <br />
                <small className="text-muted">✨ Sistema de poderes en funcionamiento</small>
              </small>
            </div>
            <div>
              {cartItems.length > 0 && (
                <button className="btn btn-magic-danger btn-sm me-2" onClick={clearCart} title="Vaciar grimorio">🧹 Vaciar Grimorio</button>
              )}
              {savedItems.length > 0 && (
                <button className="btn btn-magic-warning btn-sm" onClick={handleClearSaved} title="Limpiar Guardado para Despues">🧹 Limpiar Guardados</button>
              )}
            </div>
          </div>
          <div className="active-filters-magic mb-3">
            {filters.category !== 'All' && (
              <span className="badge badge-magic me-2">
                {filters.category}
                <button onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))} className="btn-close btn-close-white ms-2" />
              </span>
            )}
            {filters.platform !== 'Todas' && (
              <span className="badge badge-element me-2">
                {filters.platform}
                <button onClick={() => setFilters((prev) => ({ ...prev, platform: 'Todas' }))} className="btn-close btn-close-white ms-2" />
              </span>
            )}
            {(filters.category !== 'All' || filters.platform !== 'Todas') && (
              <button className="btn btn-magic-secondary btn-sm" onClick={resetFilters}>🗑️ Limpiar Filtros</button>
            )}
          </div>
        </div>
        <Hero />
        <GameGrid games={filteredGames} onSelect={setSelectedGame} />
        {/* El panel de admin ya NO se muestra aquí, solo en /admin-panel */}
      </main>
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} onAddToCart={handleAddToCart} />
  <BuyModal visible={uiState.buyModalVisible && cartItems.length > 0} onClose={() => setUiState(prev => ({ ...prev, buyModalVisible: false }))} cartItems={cartItems} onOrderComplete={handleOrderComplete} />
      <Footer />
      <style>{`
        .app-container { min-height: 100vh; position: relative; }
        .main-content { padding-top: 20px; flex: 1; position: relative; z-index: 1; }
        .alert-magic { background: rgba(107, 70, 193, 0.1); border: 1px solid rgba(107, 70, 193, 0.3); border-radius: 10px; color: #e2e8f0; }
        .active-filters-magic { background: rgba(49, 130, 206, 0.1); padding: 12px; border-radius: 10px; min-height: 50px; border: 1px solid rgba(49, 130, 206, 0.3); }
        .btn-magic-danger { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border: none; color: white; }
        .btn-magic-warning { background: linear-gradient(135deg, #f6e05e 0%, #d69e2e 100%); border: none; color: white; }
        .btn-magic-secondary { background: rgba(160, 174, 192, 0.2); border: 1px solid rgba(160, 174, 192, 0.4); color: #e2e8f0; }
        .badge-element { background: rgba(56, 178, 172, 0.2); border: 1px solid rgba(56, 178, 172, 0.4); color: #38b2ac; }
        .text-glow { text-shadow: 0 0 10px rgba(214, 158, 46, 0.5); }
        @media (max-width: 768px) { .main-content { padding-top: 10px; } .active-filters-magic { padding: 8px; } }
        .navbar { position: relative; z-index: 1030 !important; }
        .dropdown-menu { z-index: 1050 !important; }
        .carousel { position: relative; z-index: 1 !important; }
        .main-content { position: relative; z-index: 1; }
        .modal { z-index: 1060 !important; }
        .game-modal-2 { z-index: 1070 !important; }
        .cart-panel { z-index: 1040 !important; }
        .search-panel { z-index: 1040 !important; }
      `}</style>
    </div>
  );
}

export default App;