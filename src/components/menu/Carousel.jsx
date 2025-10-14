import React, { useEffect, useState } from 'react';
import '../../assets/juego.css';
import { noticiasIniciales } from '../data/noticias';

const Carousel = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const loadNoticias = () => {
      const storedNoticias = JSON.parse(localStorage.getItem('noticias') || '[]');
      setNoticias([...noticiasIniciales, ...storedNoticias]);
    };
    loadNoticias();

    const handleStorage = (e) => {
      if (e.key === 'noticias') {
        loadNoticias();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {noticias.map((noticia, idx) => (
          <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={noticia.id}>
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