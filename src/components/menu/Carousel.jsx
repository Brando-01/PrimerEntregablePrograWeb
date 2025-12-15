import React, { useEffect, useState } from 'react';
import '../../assets/juego.css';
import API_BASE from '../../config/api';
const Carousel = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    let mounted = true;
    const loadNoticias = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/noticias`);
        if (!res.ok) throw new Error('Fetch noticias failed');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setNoticias(data);
          try { localStorage.setItem('noticias', JSON.stringify(data)); } catch (e) {}
          return;
        }
      } catch (err) {
        console.warn('⚠️ No se pudieron cargar noticias desde backend:', err.message);
      }

      // Fallback to localStorage only (no bundled data files)
      try {
        const storedNoticias = JSON.parse(localStorage.getItem('noticias') || '[]');
        if (mounted) setNoticias(storedNoticias);
      } catch (e) {
        if (mounted) setNoticias([]);
      }
    };

    loadNoticias();

    const handleStorage = (e) => {
      if (e.key === 'noticias') {
        try { setNoticias(JSON.parse(localStorage.getItem('noticias') || '[]')); } catch (e) { setNoticias([]); }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      mounted = false;
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {noticias.map((noticia, idx) => (
          <div
            className={`carousel-item${idx === 0 ? ' active' : ''}`}
            key={`${noticia && (noticia.id ?? noticia.title) ? (noticia.id ?? noticia.title) : 'news-' + idx}`}
          >
            <img src={noticia.image} className="d-block w-100" alt={noticia.title} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{noticia.title}</h5>
              <p>{noticia.content}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carousel;