import React, { useState } from 'react';
import '../../assets/estiloAdminNoticias.css';

const AddNotice = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim() && image.trim()) {
      onSubmit(title, content, image);
      setTitle('');
      setContent('');
      setImage('');
    }
  };

  if (!visible) return null;

  return (
    <div className="modal-custom" onClick={onClose}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        <h3>Añadir Noticia</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newNewsTitle" className="form-label">Título</label>
            <input
              type="text"
              id="newNewsTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newNewsContent" className="form-label">Contenido</label>
            <textarea
              id="newNewsContent"
              className="form-control"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="newNewsImage" className="form-label">URL de la Imagen</label>
            <input
              type="text"
              id="newNewsImage"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              placeholder="https://... o /img/imagen.jpg"
            />
          </div>
          <button type="submit" className="btn btn-success">Agregar Noticia</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;