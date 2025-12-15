import React, { useState, useEffect } from 'react';
import API_BASE from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import EditNotice from './EditNotice';
import '../../assets/estiloAdminNoticias.css';
// Noticias will be fetched from backend; no static import
import NoticeTable from './NoticeTable';
import DeleteNotice from './DeleteNotice';
import AddNotice from './AddNotice';
import FilterGamesModal from './FilterGamesModal';
import AdminGameModal from './AdminGameModal';
import GameModalAdmin from './GameModalAdmin';
import MonthlyEarningsChart from './MonthlyEarningsChart';
import { useOrder } from '../context/OrderContext';
import DateRangeEarnings from './DateRangeEarnings';

const AdminPanel = () => {
  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  const { users, toggleUserStatus } = useUser();
  const { games, deleteGame, toggleGameStatus } = useGame();
  const [activeSection, setActiveSection] = useState("usuarios");
  const navigate = useNavigate();
  
  // Estados para modales
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState({ id: '', title: '', content: '', image: '' });
  const [noticias, setNoticias] = useState(() => {
    try {
      const stored = localStorage.getItem('noticias');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  });

  // Load noticias from backend on mount, fallback to localStorage
  useEffect(() => {
    let mounted = true;
    const fetchNoticias = async () => {
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
      // fallback: already initialized from localStorage
    };
    fetchNoticias();
    return () => { mounted = false; };
  }, []);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState({ id: '' });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);
  
  // NUEVO ESTADO: Modal avanzado de administración
  const [gameAdminModalVisible, setGameAdminModalVisible] = useState(false);
  const [selectedGameForAdmin, setSelectedGameForAdmin] = useState(null);

  // Estados para filtros
  const [userFilter, setUserFilter] = useState('');
  const [gameFilters, setGameFilters] = useState({
    plataforma: '',
    activo: 'todos'
  });

  const handleApplyFilters = (filters) => {
    console.log("Filtros aplicados:", filters);
  };

  const handleDeleteRequest = (id) => {
    setNoticeToDelete({ id });
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/noticias/${noticeToDelete.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        setNoticias(prev => {
          const updated = prev.filter(n => n.id !== noticeToDelete.id);
          try { localStorage.setItem('noticias', JSON.stringify(updated)); } catch (e) {}
          return updated;
        });
      } catch (err) {
        // fallback local
        setNoticias(prev => {
          const updated = prev.filter(n => n.id !== noticeToDelete.id);
          try { localStorage.setItem('noticias', JSON.stringify(updated)); } catch (e) {}
          return updated;
        });
      } finally {
        setDeleteModalVisible(false);
      }
    })();
  };

  const handleAddNotice = (title, content, image) => {
    const nuevaNoticia = {
      id: crypto.randomUUID(),
      title,
      content,
      fecha: new Date().toLocaleDateString(),
      estado: 'Activa',
      image
    };
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/noticias`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevaNoticia)
        });
        if (!res.ok) throw new Error('Create failed');
        const created = await res.json();
        setNoticias(prev => {
          const updated = [created, ...prev];
          try { localStorage.setItem('noticias', JSON.stringify(updated)); } catch (e) {}
          return updated;
        });
      } catch (err) {
        // fallback local
        setNoticias(prev => {
          const updated = [nuevaNoticia, ...prev];
          try { localStorage.setItem('noticias', JSON.stringify(updated)); } catch (e) {}
          return updated;
        });
      } finally {
        setAddModalVisible(false);
      }
    })();
  };

  const handleOpenEdit = (id) => {
    const noticia = noticias.find(n => n.id === id);
    if (noticia) {
      setNoticeToEdit({ id: noticia.id, title: noticia.title, content: noticia.content, image: noticia.image });
      setEditModalVisible(true);
    }
  };

  const handleEditSubmit = (id, title, content, image) => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/noticias/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, image })
        });
        if (!res.ok) throw new Error('Update failed');
        const updatedNot = await res.json();
        setNoticias(prev => {
          const updated = prev.map(n => n.id === id ? updatedNot : n);
          try { localStorage.setItem('noticias', JSON.stringify(updated)); } catch (e) {}
          return updated;
        });
      } catch (err) {
        // fallback local
        setNoticias(prev => {
          const updated = prev.map(n => n.id === id ? { ...n, title, content, image } : n);
          try { localStorage.setItem('noticias', JSON.stringify(updated)); } catch (e) {}
          return updated;
        });
      } finally {
        setEditModalVisible(false);
      }
    })();
  };

  const showSection = (section) => {
    setActiveSection(section);
  };

  // Funciones para usuarios
  const filteredUsers = users.filter(user => 
    user.id.includes(userFilter) ||
    user.fullName.toLowerCase().includes(userFilter.toLowerCase()) ||
    user.nickname.toLowerCase().includes(userFilter.toLowerCase())
  );

  // Funciones para juegos
  const filteredGames = games.filter(game => {
    if (gameFilters.plataforma && game.platform !== gameFilters.plataforma) return false;
    if (gameFilters.activo === 'activos' && !game.isActive) return false;
    if (gameFilters.activo === 'inactivos' && game.isActive) return false;
    return true;
  });

  const handleDeleteGame = (gameId) => {
    if (window.confirm('¿Estás seguro de que quieres disipar este poder?')) {
      deleteGame(gameId);
    }
  };

  const handleEditGame = (game) => {
    setGameToEdit(game);
    setGameModalVisible(true);
  };

  // NUEVA FUNCIÓN: Abrir modal avanzado de administración
  const handleAdminGame = (game) => {
    setSelectedGameForAdmin(game);
    setGameAdminModalVisible(true);
  };

  const getStatusBadge = (isActive) => {
    return isActive ? 
      <span className="badge bg-success">Activo</span> : 
      <span className="badge bg-danger">Sellado</span>;
  };

  const getFeaturedBadge = (featured) => {
    return featured ? 
      <span className="badge bg-warning ms-1">⭐ Legendario</span> : 
      null;
  };

  return (
    <div className="d-flex dashboard-bg" style={{ minHeight: "100vh" }}>
      {/* Sidebar - TRANSFORMADO */}
      <div className="sidebar d-flex flex-column align-items-center">
        <div className="admin-photo mb-3">
          <img
            src="/img/Cutti.jpg"
            alt="Foto del Archimago"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <h5 className="text-white">Archimago Supreme</h5>
        <nav className="mt-4 w-100 px-3 d-flex flex-column" style={{ gap: "0.5rem" }}>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "usuarios" ? "active" : ""}`}
            onClick={() => showSection("usuarios")}
          >
            👥 Magos Registrados
          </button>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "juegos" ? "active" : ""}`}
            onClick={() => showSection("juegos")}
          >
            ⚡ Gestión de Poderes
          </button>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "noticias" ? "active" : ""}`}
            onClick={() => showSection("noticias")}
          >
            📰 Profecías
          </button>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "estadisticas" ? "active" : ""}`}
            onClick={() => showSection("estadisticas")}
          >
            📊 Oráculo de Datos
          </button>
          <button className="nav-link mt-auto btn btn-link text-start" onClick={() => navigate('/')}>
            🚪 Salir de la cuenta
          </button>
          <button className="nav-link btn btn-link text-start" style={{color: 'red', fontWeight: 'bold'}} onClick={handleLogout}>
            🔓 Cerrar sesión
          </button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="content flex-grow-1 p-4">
        {activeSection === "usuarios" && (
          <section className="admin-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>👥 Gestión de Magos</h2>
              <span className="badge bg-primary">Total: {users.length} magos</span>
            </div>

            {/* Filtros de usuarios */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Buscar magos:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por ID, nombre o nombre mágico..."
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 text-end">
                    <span className="text-muted">{filteredUsers.length} resultados</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de usuarios */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered user-table text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Nombre Mágico</th>
                    <th>Nombre Real</th>
                    <th>Pergamino</th>
                    <th>Estado</th>
                    <th>Conjuros</th>
                    <th>Mana Gastado</th>
                    <th>Hechizos</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="fw-bold">#{user.id}</td>
                      <td>
                        <img 
                          src={user.avatar} 
                          className="user-photo rounded-circle" 
                          alt={user.nickname}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </td>
                      <td>@{user.nickname}</td>
                      <td className="fw-bold">{user.fullName}</td>
                      <td><small className="text-muted">{user.email}</small></td>
                      <td>
                        <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {user.isActive ? 'Activo' : 'Dormido'}
                        </span>
                      </td>
                      <td><span className="badge bg-primary">{user.totalOrders}</span></td>
                      <td><span className="text-success fw-bold">${user.totalSpent}</span></td>
                      <td>
                        <div className="d-flex gap-1 justify-content-center">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/admin/user-details/${user.id}`)}
                            title="Ver grimorio del mago"
                          >
                            👁️
                          </button>
                          <button 
                            className={`btn btn-sm ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                            onClick={() => {
                              if (window.confirm(`¿Estás seguro de que quieres ${user.isActive ? 'dormir' : 'despertar'} a ${user.fullName}?`)) {
                                toggleUserStatus(user.id);
                              }
                            }}
                            title={user.isActive ? 'Dormir mago' : 'Despertar mago'}
                          >
                            {user.isActive ? '🚫' : '✅'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-5">
                <div className="text-muted">
                  <h4>🔍 No se encontraron magos</h4>
                  <p>Intenta con otros términos de búsqueda</p>
                </div>
              </div>
            )}
          </section>
        )}

        {activeSection === "juegos" && (
          <section className="admin-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>⚡ Gestión de Poderes</h2>
              <span className="badge bg-primary">Total: {games.length} poderes</span>
            </div>

            {/* Filtros y acciones */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <label className="form-label">Tipo de Magia:</label>
                    <select 
                      className="form-select"
                      value={gameFilters.categoria}
                      onChange={(e) => setGameFilters(prev => ({ ...prev, categoria: e.target.value }))}
                    >
                      <option value="">Todos los tipos</option>
                      <option value="Poderes Elementales">Poderes Elementales</option>
                      <option value="Magia Avanzada">Magia Avanzada</option>
                      <option value="Hechizos Básicos">Hechizos Básicos</option>
                      <option value="Artefactos Legendarios">Artefactos Legendarios</option>
                      <option value="Pociones Mágicas">Pociones Mágicas</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Elemento:</label>
                    <select 
                      className="form-select"
                      value={gameFilters.plataforma}
                      onChange={(e) => setGameFilters(prev => ({ ...prev, plataforma: e.target.value }))}
                    >
                      <option value="">Todos los elementos</option>
                      <option value="Fuego">Fuego</option>
                      <option value="Agua">Agua</option>
                      <option value="Aire">Aire</option>
                      <option value="Tierra">Tierra</option>
                      <option value="Luz">Luz</option>
                      <option value="Oscuridad">Oscuridad</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Estado Mágico:</label>
                    <select 
                      className="form-select"
                      value={gameFilters.activo}
                      onChange={(e) => setGameFilters(prev => ({ ...prev, activo: e.target.value }))}
                    >
                      <option value="todos">Todos</option>
                      <option value="activos">Solo activos</option>
                      <option value="inactivos">Sellados</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Conjuros:</label>
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-success"
                        onClick={() => {
                          setGameToEdit(null);
                          setGameModalVisible(true);
                        }}
                      >
                        ✨ Invocar Nuevo Poder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de juegos con datos reales */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover shadow-sm">
                <thead className="table-light">
                  <tr>
                    <th>Icono</th>
                    <th>Nombre del Poder</th>
                    <th>Tipo de Magia</th>
                    <th>Elemento</th>
                    <th>Precio</th>
                    <th>Stock Mágico</th>
                    <th>Estado</th>
                    <th>Hechizos</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGames.map(game => (
                    <tr key={game.id} className={!game.isActive ? 'table-secondary' : ''}>
                      <td>
                        <img 
                          src={game.images[0]} 
                          alt={game.title}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <div>
                          <strong>{game.title}</strong>
                          {getFeaturedBadge(game.featured || false)}
                        </div>
                        <small className="text-muted">Runa: {game.sku}</small>
                      </td>
                      <td>{game.category}</td>
                      <td>{game.platform}</td>
                      <td>
                        <div>
                          {game.discount && game.discount > 0 ? (
                            <>
                              <span className="text-danger text-decoration-line-through">
                                ${game.price.toFixed(2)}
                              </span>
                              <br />
                              <strong className="text-success">
                                ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                              </strong>
                              <span className="badge bg-danger ms-1">-{game.discount}%</span>
                            </>
                          ) : (
                            <strong>${game.price.toFixed(2)}</strong>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${game.stock > 10 ? 'bg-success' : game.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                          {game.stock} esencias
                        </span>
                      </td>
                      <td>{getStatusBadge(game.isActive)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          {/* NUEVO BOTÓN: Administración avanzada */}
                          <button 
                            className="btn btn-sm btn-info"
                            onClick={() => handleAdminGame(game)}
                            title="Administración avanzada"
                          >
                            🔮
                          </button>
                          <button 
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEditGame(game)}
                            title="Modificar hechizo"
                          >
                            ✏️
                          </button>
                          <button 
                            className={`btn btn-sm ${game.isActive ? 'btn-secondary' : 'btn-success'}`}
                            onClick={() => {
                              if (window.confirm(`¿${game.isActive ? 'Sellar' : 'Activar'} el poder "${game.title}"?`)) {
                                toggleGameStatus(game.id);
                              }
                            }}
                            title={game.isActive ? 'Sellar poder' : 'Activar poder'}
                          >
                            {game.isActive ? '🚫' : '✅'}
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteGame(game.id)}
                            title="Disipar poder"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-5">
                <div className="text-muted">
                  <h4>🎮 No se encontraron poderes</h4>
                  <p>Intenta ajustar los filtros o invocar nuevos poderes</p>
                </div>
              </div>
            )}

            {/* Resumen */}
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="text-primary">{games.filter(g => g.isActive).length}</h5>
                    <small>Poderes activos</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="text-success">{games.filter(g => g.featured).length}</h5>
                    <small>Artefactos legendarios</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="text-warning">{games.filter(g => g.stock < 10).length}</h5>
                    <small>Esencias bajas</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="text-info">{games.filter(g => g.discount && g.discount > 0).length}</h5>
                    <small>Hechizos en oferta</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "noticias" && (
          <section className="admin-section">
            <div className="header-news d-flex justify-content-between align-items-center mb-3">
              <h2>📰 Gestión de Profecías</h2>
              <button id="addNewsBtn" className="btn btn-success" onClick={() => setAddModalVisible(true)}>
                🔮 Nueva Profecía
              </button>
            </div>
            <NoticeTable
              noticias={noticias}
              onEditar={handleOpenEdit}
              onBorrar={handleDeleteRequest}
            />
          </section>
        )}

        {activeSection === "estadisticas" && (
          <section className="admin-section">
            <h2>📊 Oráculo de Datos</h2>
            
            {/* Tarjetas de resumen */}
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center bg-primary text-white">
                  <div className="card-body">
                    <h5 className="card-title">👥 Total Magos</h5>
                    <p className="display-5 fw-bold">{users.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center bg-success text-white">
                  <div className="card-body">
                    <h5 className="card-title">⚡ Poderes Activos</h5>
                    <p className="display-5 fw-bold">{games.filter(g => g.isActive).length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center bg-warning text-white">
                  <div className="card-body">
                    <h5 className="card-title">📜 Rituales Realizados</h5>
                    <p className="display-5 fw-bold">{users.reduce((sum, u) => sum + (u.totalOrders || 0), 0)}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center bg-info text-white">
                  <div className="card-body">
                    <h5 className="card-title">💰 Mana Recaudado</h5>
                    <p className="display-5 fw-bold">${users.reduce((sum, u) => sum + (u.totalSpent || 0), 0).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">📈 Flujo de Mana Mensual</h5>
                  </div>
                  <div className="card-body">
                    <MonthlyEarningsChart />
                  </div>
                </div>
              </div>
                    <div className="col-md-6 mb-4">
                      <div className="card shadow-sm">
                        <div className="card-header bg-light">
                          <h5 className="mb-0">Resumen</h5>
                        </div>
                        <div className="card-body">
                          {/* Resumen de ganancias: por defecto muestra ganancias del día actual. Permite filtrar por rango de fechas. */}
                          <DateRangeEarnings />
                        </div>
                      </div>
                    </div>
            </div>
          </section>
        )}
      </div>

      {/* Modals */}
      <EditNotice
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        initialData={noticeToEdit}
      />
      <DeleteNotice
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
      <AddNotice
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddNotice}
      />
      <FilterGamesModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onFilter={handleApplyFilters}
      />
      <AdminGameModal
        visible={gameModalVisible}
        onClose={() => setGameModalVisible(false)}
        initialData={gameToEdit}
      />
      {/* NUEVO MODAL: Administración avanzada de poderes */}
      <GameModalAdmin
        visible={gameAdminModalVisible}
        onClose={() => setGameAdminModalVisible(false)}
        game={selectedGameForAdmin}
      />
    </div>
  );
};

export default AdminPanel;