import React from 'react';
import '../../assets/juego.css';
import '../../assets/magic-theme.css';

const GameGrid = ({ games, onSelect }) => {
  const getElementColor = (element) => {
    const colors = {
      'Fuego': 'badge-fire',
      'Agua': 'badge-water',
      'Aire': 'badge-air',
      'Tierra': 'badge-earth',
      'Luz': 'badge-light',
      'Oscuridad': 'badge-dark'
    };
    return colors[element] || 'badge-magic';
  };

  const getElementIcon = (element) => {
    const icons = {
      'Fuego': '🔥',
      'Agua': '💧',
      'Aire': '💨',
      'Tierra': '🌱',
      'Luz': '✨',
      'Oscuridad': '🌙'
    };
    return icons[element] || '🔮';
  };

  const getPriceColor = (price) => {
    if (price === 0) return 'text-success';
    if (price < 20) return 'text-info';
    if (price < 40) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="container mt-4">
      {games.length === 0 ? (
        <div className="text-center py-5">
          <div className="magic-empty-state">
            <div className="empty-icon mb-3">🔍</div>
            <h4 className="text-magic mb-2">No se encontraron poderes</h4>
            <p className="text-muted">Intenta ajustar los filtros mágicos</p>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {games.map(game => (
            <div 
              key={game.id} 
              className="col magic-card-col"
              onClick={() => onSelect(game)} 
            >
              <div className="card card-magic h-100 magic-card-hover">
                
                <div className="card-image-container position-relative">
                  <img 
                    src={game.images[0]} 
                    className="card-img-top magic-card-image"
                    alt={game.title}
                  />
                  
                  {game.featured && (
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge badge-featured glow-animation">
                        ⭐ Legendario
                      </span>
                    </div>
                  )}
                  
                  {game.discount && game.discount > 0 && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge badge-discount float-animation">
                        -{game.discount}% ✨
                      </span>
                    </div>
                  )}
                  
                  <div className="card-overlay magic-overlay">
                    <div className="overlay-content">
                      <span className="btn btn-magic btn-sm">Ver Detalles</span>
                    </div>
                  </div>
                </div>

                <div className="card-body magic-card-body">
                  
                  <h5 className="card-title magic-card-title text-truncate">
                    {game.title}
                  </h5>
                  
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    {game.discount && game.discount > 0 ? (
                      <div className="d-flex align-items-center">
                        <span className="text-muted text-decoration-line-through me-2 small">
                          ${game.price.toFixed(2)}
                        </span>
                        <span className={`fw-bold ${getPriceColor(game.price)} magic-price`}>
                          ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className={`fw-bold ${getPriceColor(game.price)} magic-price`}>
                        {game.price === 0 ? '🆓 Gratis' : `$${game.price.toFixed(2)}`}
                      </span>
                    )}
                    
                    <div className="d-flex align-items-center">
                      <span className="text-warning small me-1">★</span>
                      <small className="text-muted">{game.rating.toFixed(1)}</small>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    <span className={`badge ${getElementColor(game.platform)} small`}>
                      {getElementIcon(game.platform)} {game.platform}
                    </span>
                    {game.elements && game.elements.length > 0 && (
                      <span className="badge badge-magic small">{game.elements.join(', ')}</span>
                    )}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <small className={`stock-indicator ${
                      game.stock > 10 ? 'text-success' : 
                      game.stock > 0 ? 'text-warning' : 'text-danger'
                    }`}>
                      {game.stock > 10 ? '📦 Disponible' : 
                       game.stock > 0 ? '⚠️ Últimas unidades' : '❌ Agotado'}
                    </small>
                    
                    {!game.isActive && (
                      <small className="badge badge-secondary">🔒 Sellado</small>
                    )}
                  </div>
                </div>
                
                <div className="magic-border"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {games.length > 0 && (
        <div className="text-center mt-5">
          <div className="magic-counter">
            <span className="badge badge-magic">
              ✨ {games.length} poderes encontrados
            </span>
          </div>
        </div>
      )}

      <style>{`
        .magic-card-col {
          transition: transform 0.3s ease;
        }
        
        .magic-card-col:hover {
          transform: translateY(-5px);
        }
        
        .magic-card-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .magic-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(107, 70, 193, 0.4);
        }
        
        .card-image-container {
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }
        
        .magic-card-image {
          height: 200px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .magic-card-hover:hover .magic-card-image {
          transform: scale(1.1);
        }
        
        .magic-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(107, 70, 193, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 10px 10px 0 0;
        }
        
        .magic-card-hover:hover .magic-overlay {
          opacity: 1;
        }
        
        .magic-card-body {
          background: rgba(45, 55, 72, 0.8);
          backdrop-filter: blur(10px);
        }
        
        .magic-card-title {
          color: #e2e8f0;
          font-weight: 600;
          margin-bottom: 0.5rem;
          min-height: 2.5rem;
        }
        
        .magic-price {
          font-size: 1.1rem;
          text-shadow: 0 0 5px currentColor;
        }
        
        .badge-featured {
          background: linear-gradient(135deg, #f6e05e 0%, #d69e2e 100%);
          color: #1a202c;
          font-weight: bold;
        }
        
        .badge-discount {
          background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
          color: white;
          font-weight: bold;
        }
        
        .badge-light {
          background: linear-gradient(135deg, #fefcbf 0%, #faf089 100%);
          color: #1a202c;
        }
        
        .badge-dark {
          background: linear-gradient(135deg, #805ad5 0%, #6b46c1 100%);
          color: white;
        }
        
        .stock-indicator {
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .magic-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid transparent;
          border-radius: 12px;
          background: linear-gradient(45deg, #6b46c1, #3182ce, #38b2ac) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .magic-card-hover:hover .magic-border {
          opacity: 1;
        }
        
        .magic-subtitle {
          font-size: 1.1rem;
          opacity: 0.8;
        }
        
        .magic-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #6b46c1, transparent);
          margin: 1rem auto;
          width: 200px;
        }
        
        .magic-empty-state {
          padding: 3rem 1rem;
        }
        
        .empty-icon {
          font-size: 4rem;
          opacity: 0.5;
        }
        
        .magic-counter {
          margin-top: 2rem;
        }
        
        @media (max-width: 768px) {
          .magic-card-title {
            font-size: 0.9rem;
            min-height: 2rem;
          }
          
          .magic-card-image {
            height: 150px;
          }
        }
        
        @media (max-width: 576px) {
          .row-cols-sm-2 {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GameGrid;