import React from 'react';
import '../../assets/estiloAdminNoticias.css';

const EditNotice = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = React.useState(initialData.title);
  const [content, setContent] = React.useState(initialData.content);
  const [image, setImage] = React.useState(initialData.image || '');

  React.useEffect(() => {
    setTitle(initialData.title);
    setContent(initialData.content);
    setImage(initialData.image || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(initialData.id, title, content, image);
  };

  if (!visible) return null;

  return (
    <div className="modal-custom" onClick={onClose}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Noticia</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contenido</label>
            <textarea
              className="form-control"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">URL de la Imagen</label>
            <input
              type="text"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://... o /img/imagen.jpg"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;