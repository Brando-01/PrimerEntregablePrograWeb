// components/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { games, getGameById } = useGame();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (id) {
      const gameId = parseInt(id);
      const foundGame = getGameById ? getGameById(gameId) : games.find(g => g.id === gameId);
      if (foundGame) {
        setGame(foundGame);
        setReviews(foundGame.reviews || []);
      }
    }
  }, [id, games, getGameById]);

  if (!game) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          <h4>🔮 Poder No Encontrado</h4>
          <p>El poder mágico que buscas no existe en nuestro grimorio.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Volver al Santuario
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
    const existing = cartItems.find(item => item.id === game.id);
    let newCart;
    if (existing) {
      newCart = cartItems.map(item => item.id === game.id ? { ...item, quantity: (item.quantity || 1) + selectedQuantity } : item);
    } else {
      newCart = [...cartItems, { ...game, quantity: selectedQuantity }];
    }
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
    // dispatch event so App.jsx can sync
    try { window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCart })); } catch (err) {}
    alert(`✨ ${game.title} x${selectedQuantity} agregado al grimorio!`);
  };

  const handleSubmitReview = () => {
    if (!userName || !userComment || userRating === 0) return;

    const date = new Date().toISOString().split('T')[0];
    const newReview = {
      name: userName,
      comment: userComment,
      stars: userRating,
      date
    };
    
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setUserName('');
    setUserComment('');
    setUserRating(0);
    
    alert('📜 Tu crónica mágica ha sido registrada!');
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
    : '0';

  const hasTrailer = Boolean(game.trailer && game.trailer.trim() !== '');

  return (
    <div className="container mt-4">
      {/* Navegación */}
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={() => navigate('/')}>
          ← Volver al Santuario
        </button>
        <h1 className="mb-0">🔮 {game.title}</h1>
      </div>

      <div className="row">
        {/* Columna izquierda - Visualización */}
        <div className="col-md-6">
          {/* Carrusel de imágenes */}
          <div id={`carousel-${game.id}`} className="carousel slide mb-3" data-bs-ride="carousel">
            <div className="carousel-inner">
              {hasTrailer && (
                <div className="carousel-item active">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={game.trailer}
                      title={`${game.title} - Demostración Mágica`}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              {game.images.map((img, index) => (
                <div
                  className={`carousel-item ${!hasTrailer && index === 0 ? 'active' : ''}`}
                  key={index}
                >
                  <img
                    src={img}
                    className="d-block w-100 rounded"
                    alt={`Manifestación ${index}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${game.id}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${game.id}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="d-flex justify-content-center mb-3 flex-wrap">
            {game.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`thumb ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
                alt={`miniatura-${index}`}
              />
            ))}
          </div>

          {/* Información rápida */}
          <div className="text-center">
            <div className="mb-3">
              <span className="badge bg-secondary">⚡ {game.platform}</span>
              {game.elements && game.elements.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">Elementos: {game.elements.join(', ')}</small>
                </div>
              )}
            </div>
            
            <div className="d-flex justify-content-center align-items-center mb-3">
              <span className="me-2">Poder Estelar:</span>
              <div className="text-warning me-1">
                {'★'.repeat(Math.round(Number(averageRating)))}
              </div>
              <span>({averageRating} de {reviews.length} evaluaciones)</span>
            </div>

            <button 
              className="btn btn-success btn-lg w-100 py-3 fw-bold" 
              onClick={handleAddToCart}
            >
              🧙‍♂️ Agregar al Grimorio - ${game.price.toFixed(2)}
            </button>
            <div className="mt-2 d-flex justify-content-center gap-2">
              <div className="input-group" style={{ width: '140px' }}>
                <button className="btn btn-outline-secondary" type="button" onClick={() => setSelectedQuantity(q => Math.max(1, q - 1))}>-</button>
                <input className="form-control text-center" readOnly value={selectedQuantity} />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setSelectedQuantity(q => q + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Información */}
        <div className="col-md-6">
          <h3>📖 Descripción del Poder</h3>
          <p className="lead">{game.description}</p>

          {/* Especificaciones */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">⚡ Especificaciones Arcanas</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 mb-2">
                  <strong>Tipo de Magia:</strong><br />
                  {game.platform}
                </div>
                <div className="col-6 mb-2">
                  <strong>Elementos:</strong><br />
                  {game.elements && game.elements.length > 0 ? game.elements.join(', ') : '—'}
                </div>
                <div className="col-6 mb-2">
                  <strong>Nivel de Poder:</strong><br />
                  {game.rating >= 4 ? 'Avanzado' : game.rating >= 3 ? 'Intermedio' : 'Básico'}
                </div>
                <div className="col-6 mb-2">
                  <strong>Stock Mágico:</strong><br />
                  {game.stock} esencias disponibles
                </div>
                <div className="col-6 mb-2">
                  <strong>Código Rúnico:</strong><br />
                  {game.sku}
                </div>
                <div className="col-6 mb-2">
                  <strong>Estado:</strong><br />
                  <span className={`badge ${game.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {game.isActive ? 'Activo' : 'Sellado'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reseñas */}
          <h4>📜 Crónicas de Magos</h4>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="mb-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <strong>🧙 {review.name}</strong>
                      <small className="text-muted">{review.date}</small>
                    </div>
                    <div className="text-warning mb-2">
                      {'★'.repeat(review.stars)}
                    </div>
                    <p className="mb-0">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-3">
                <p className="text-muted">Aún no hay crónicas sobre este poder</p>
                <small className="text-muted">Sé el primero en compartir tu experiencia mágica</small>
              </div>
            )}
          </div>

          {/* Agregar reseña */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">✍️ Comparte tu Experiencia</h5>
            </div>
            <div className="card-body">
              <input
                type="text"
                placeholder="Tu nombre de mago"
                className="form-control mb-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <textarea
                placeholder="Describe tu experiencia con este poder..."
                className="form-control mb-2"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                rows={3}
              />
              <div className="text-center mb-2">
                <small className="d-block mb-1">Califica el poder estelar:</small>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${userRating >= star ? 'active text-warning' : 'text-muted'}`}
                    onClick={() => setUserRating(star)}
                    style={{ cursor: 'pointer', fontSize: '1.5rem', margin: '0 2px' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button 
                className="btn btn-primary w-100"
                onClick={handleSubmitReview}
                disabled={!userName || !userComment || userRating === 0}
              >
                📜 Registrar Crónica Mágica
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;