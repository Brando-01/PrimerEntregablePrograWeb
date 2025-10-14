import React, { useState } from 'react';
import '../../assets/juego.css';

const GameModal = ({ game, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState(game?.reviews || []);

  if (!game) return null;

  const hasTrailer = Boolean(game.trailer && game.trailer.trim() !== '');

  const handleSubmit = () => {
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
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="game-modal-2" onClick={onClose}>
      <div className="modal-content-game" onClick={(e) => e.stopPropagation()}>
        <div className="row gx-4">
          {/* Columna izquierda - Visualización del Poder */}
          <div className="col-md-6">
            <h2 className="text-center mb-3">🔮 {game.title}</h2>

            <div id={`carousel-${game.id}`} className="carousel slide mb-3" data-bs-ride="carousel">
              <div className="carousel-inner">
                
                {hasTrailer && (
                  <div className="carousel-item active">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={game.trailer}
                        title={`${game.title} - Demostración Mágica`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                      className="d-block w-100"
                      alt={`Manifestación ${index}`}
                      style={{ height: 300, objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${game.id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${game.id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>

            <div className="d-flex justify-content-center mb-3 flex-wrap">
              {game.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`thumb ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  alt={`manifestación-${index}`}
                />
              ))}
            </div>

            <div className="text-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-2">
                <span className="me-2">Poder Estelar:</span>
                <div className="text-warning me-1">
                  {'★'.repeat(Math.round(Number(averageRating)))}
                </div>
                <span>({averageRating} de {reviews.length} evaluaciones mágicas)</span>
              </div>

              <div className="mb-3">
                <span className="badge bg-secondary">⚡ {game.platform}</span>
                {game.elements && game.elements.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted">Elementos: {game.elements.join(', ')}</small>
                  </div>
                )}
              </div>

              <button 
                className="btn btn-success w-100 py-2 fw-bold" 
                onClick={() => onAddToCart(game)}
              >
                🧙‍♂️ Agregar al Grimorio - ${game.price}
              </button>
            </div>
          </div>

          {/* Columna derecha - Información Detallada */}
          <div className="col-md-6">
            <h4>📖 Descripción del Poder</h4>
            <p className="lead">{game.description}</p>

            <div className="mb-4">
              <h5>⚡ Especificaciones Arcanas</h5>
              <div className="row small">
                <div className="col-6">
                  <strong>Tipo de Magia:</strong> {game.platform}
                </div>
                <div className="col-6">
                  <strong>Elementos:</strong> {game.elements && game.elements.length > 0 ? game.elements.join(', ') : '—'}
                </div>
                <div className="col-6">
                  <strong>Nivel:</strong> {game.rating >= 4 ? 'Avanzado' : game.rating >= 3 ? 'Intermedio' : 'Básico'}
                </div>
                <div className="col-6">
                  <strong>Stock:</strong> {game.stock} esencias disponibles
                </div>
              </div>
            </div>

            <h4>📜 Crónicas de Otros Magos</h4>
            <div id="gameReviews" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {reviews.length > 0 ? (
                reviews.map((r, i) => (
                  <div key={i} className="review-item">
                    <div className="d-flex justify-content-between">
                      <span className="review-user">🧙 {r.name}</span>
                      <small>{r.date}</small>
                    </div>
                    <div className="review-rating">{'★'.repeat(r.stars)}</div>
                    <div className="review-text">{r.comment}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Aún no hay crónicas sobre este poder. Sé el primero en compartir tu experiencia.</p>
              )}
            </div>

            <h5 className="mt-4">✍️ Comparte tu Experiencia Mágica</h5>
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
            <div className="star-rating mb-2 text-center">
              <small className="d-block mb-1">Califica el poder estelar:</small>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`star ${userRating >= s ? 'active' : ''}`}
                  onClick={() => setUserRating(s)}
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                >
                  ★
                </span>
              ))}
            </div>
            <button 
              className="btn btn-primary w-100 py-2" 
              onClick={handleSubmit}
              disabled={!userName || !userComment || userRating === 0}
            >
              📜 Registrar Crónica Mágica
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button 
            className="btn btn-outline-secondary" 
            onClick={onClose}
          >
            ↩️ Volver al Santuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;