// components/menu/Navbar.jsx - VERSIÓN MÁGICA COMPLETA
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/juego.css';
import '../../assets/magic-theme.css'; // ✅ Tema mágico
import { useGame } from '../context/GameContext';
import { isAdminSession, getUserSession, isLoggedIn } from '../../utils/session';

const Navbar = ({
  onFilterCategory,
  onFilterPlatform,
  onToggleCart,
  onToggleSearch,
  onTogglePrice,
  cartItemCount = 0,
  savedItemsCount = 0
}) => {
  const navigate = useNavigate();

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  // ...existing code...
  
  const { games } = useGame();

  // Elementos y contador por elemento
  const elements = [
    'Todos los Elementos',
    'Fuego',
    'Agua', 
    'Aire',
    'Tierra',
    'Luz',
    'Oscuridad'
  ];

  const countByElement = (element) => {
    return element === 'Todos los Elementos' ? (games ? games.length : 0) : (games ? games.filter(g => g.platform === element).length : 0);
  };

  // Resetear todos los filtros
  const resetFilters = () => {
    onFilterCategory('All');
    onFilterPlatform('Todas');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-magic px-3"> {/* ✅ CLASE MÁGICA */}
      
      {/* Logo con efecto flotante y glow */}
      <div 
        className="navbar-brand d-flex align-items-center magic-logo" 
        style={{ cursor: 'pointer' }} 
        onClick={resetFilters}
      >
        <img 
          src="/img/logo.png" 
          alt="PowerStore Logo" 
          width="45" 
          height="45" 
          className="me-2 float-animation" // ✅ ANIMACIÓN FLOTANTE
          style={{ filter: 'drop-shadow(0 0 8px rgba(214, 158, 46, 0.6))' }} // ✅ EFECTO GLOW
        />
        <span className="d-none d-sm-inline text-magic text-glow fw-bold"> {/* ✅ TEXTO MÁGICO */}
          PowerStore
        </span>
      </div>

      {/* Botón para móviles con efecto mágico */}
      <button 
        className="navbar-toggler magic-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarContent"
        style={{ border: '1px solid rgba(107, 70, 193, 0.5)' }}
      >
        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
      </button>

      {/* Contenido del navbar */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 my-2 my-lg-0">
          
          {/* (Categorías eliminadas) */}

          {/* Dropdown Elementos - ESTILO MÁGICO */}
          <div className="dropdown">
            <button 
              className="btn btn-magic dropdown-toggle magic-dropdown" // ✅ BOTÓN MÁGICO
              type="button" 
              id="elementsDropdown" 
              data-bs-toggle="dropdown"
              style={{ minWidth: '160px' }}
            >
              <i className="bi bi-magic me-1 text-info"></i> {/* ✅ ÍCONO AZUL */}
              <span className="text-glow">Elementos</span> {/* ✅ TEXTO GLOW */}
            </button>
            <ul className="dropdown-menu dropdown-menu-magic"> {/* ✅ DROPDOWN MÁGICO */}
              {elements.map(element => (
                <li key={element}>
                  <button 
                    className="dropdown-item dropdown-item-magic d-flex justify-content-between align-items-center" // ✅ ITEM MÁGICO
                    onClick={() => {
                      console.log('Seleccionado elemento:', element);
                      onFilterPlatform(element);
                    }}
                  >
                    <span>{element}</span>
                    <span className="badge badge-element ms-2"> {/* ✅ BADGE ELEMENTO */}
                      {countByElement(element)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
  {/* Bienvenida (entre Elementos y Guardado para Despues) */}
        <div className="d-none d-lg-flex align-items-center mx-3">
          {getUserSession() ? (
            <div className="text-white text-center">
              <small className="text-muted d-block">Bienvenido</small>
              <strong>{getUserSession().fullName || getUserSession().username}</strong>
            </div>
          ) : null}
        </div>

        {/* Botones del lado derecho - ESTILO MÁGICO */}
        <div className="ms-lg-auto d-flex flex-column flex-lg-row gap-2 my-2 my-lg-0">
          
          {/* Botón Guardado para Despues */}
          <button 
            className="btn btn-magic-secondary position-relative magic-btn" // ✅ BOTÓN MÁGICO
            onClick={onTogglePrice}
            style={{ minWidth: 'auto' }}
          >
            <i className="bi bi-bookmark text-warning"></i>
            <span className="ms-1 d-none d-lg-inline">Guardado para Despues</span>
            {savedItemsCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-magic glow-animation"> {/* ✅ BADGE CON GLOW */}
                {savedItemsCount}
              </span>
            )}
          </button>

          {/* Botón Precio */}
          <button 
            className="btn btn-magic-secondary magic-btn" // ✅ BOTÓN MÁGICO
            onClick={onTogglePrice}
          >
            <i className="bi bi-currency-dollar text-success"></i>
            <span className="ms-1 d-none d-lg-inline">Precio</span>
          </button>
          
          {/* Botón Buscar */}
          <button 
            className="btn btn-magic-secondary magic-btn" // ✅ BOTÓN MÁGICO
            onClick={onToggleSearch}
          >
            <i className="bi bi-search text-info"></i>
            <span className="ms-1 d-none d-lg-inline">Buscar</span>
          </button>
          
          {/* Botón Carrito Mágico */}
          <button 
            className="btn btn-magic position-relative magic-btn glow-animation" // ✅ BOTÓN CON GLOW
            onClick={onToggleCart}
            style={{ minWidth: 'auto' }}
          >
            <i className="bi bi-cart3"></i>
            <span className="ms-1 d-none d-lg-inline">Grimorio</span>
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-fire float-animation"> {/* ✅ BADGE CON ANIMACIÓN */}
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Dropdown Usuario - ESTILO MÁGICO (si está logueado mostrar cerrar sesión y mis rituales) */}
          <div className="dropdown">
            <button 
              className="btn btn-magic-secondary dropdown-toggle magic-dropdown" // ✅ BOTÓN MÁGICO
              type="button" 
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle text-primary"></i>
            <span className="ms-1 d-none d-lg-inline">{ getUserSession() ? (getUserSession().fullName || getUserSession().username) : 'MI cuenta' }</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-magic dropdown-menu-end"> {/* ✅ DROPDOWN MÁGICO */}
              { getUserSession() ? (
                <>
                  <li>
                    <button 
                      className="dropdown-item dropdown-item-magic" // ✅ ITEM MÁGICO
                      onClick={() => navigate('/edit-profile')}
                    >
                      <i className="bi bi-person me-2 text-info"></i>
                      Mi Grimorio Personal
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item dropdown-item-magic" // ✅ ITEM MÁGICO
                      onClick={() => navigate('/order-history')}
                    >
                      <i className="bi bi-scroll me-2 text-warning"></i>
                      Mis Rituales
                    </button>
                  </li>
                  <li><hr className="dropdown-divider-magic" /></li>
                  <li>
                    <button 
                      className="dropdown-item dropdown-item-magic text-danger text-glow" // ✅ ITEM CON GLOW
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button 
                      className="dropdown-item dropdown-item-magic" // ✅ ITEM MÁGICO
                      onClick={() => navigate('/login')}
                    >
                      <i className="bi bi-box-arrow-in-right me-2 text-success"></i>
                      Portal Mágico
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item dropdown-item-magic" // ✅ ITEM MÁGICO
                      onClick={() => navigate('/crear-cuenta')}
                    >
                      <i className="bi bi-person-plus me-2 text-primary"></i>
                      Iniciación
                    </button>
                  </li>
                </>
              )}
              {isAdminSession() && (
                <li>
                  <button 
                    className="dropdown-item dropdown-item-magic text-warning text-glow" // ✅ ITEM CON GLOW
                    onClick={() => {
                      navigate('/admin-panel');
                    }}
                  >
                    <i className="bi bi-shield-lock me-2"></i>
                    Panel de Admin
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Estilos específicos para el Navbar */}
      <style>{`
        .magic-logo:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        
        .magic-toggler {
          background: rgba(107, 70, 193, 0.1) !important;
          border: 1px solid rgba(107, 70, 193, 0.5) !important;
        }
        
        .magic-toggler:hover {
          background: rgba(107, 70, 193, 0.2) !important;
          box-shadow: 0 0 15px rgba(107, 70, 193, 0.4);
        }
        
        .magic-dropdown {
          border: 1px solid rgba(107, 70, 193, 0.3) !important;
          background: rgba(107, 70, 193, 0.1) !important;
          color: #e2e8f0 !important;
          transition: all 0.3s ease;
        }
        
        .magic-dropdown:hover {
          background: rgba(107, 70, 193, 0.2) !important;
          border-color: rgba(107, 70, 193, 0.6) !important;
          box-shadow: 0 0 15px rgba(107, 70, 193, 0.3);
        }
        
        .magic-btn {
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .magic-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(107, 70, 193, 0.4);
        }
        
        /* Dropdown mágico personalizado */
        .dropdown-menu-magic {
          background: rgba(26, 32, 44, 0.95) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(107, 70, 193, 0.3) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .dropdown-item-magic {
          color: #e2e8f0 !important;
          transition: all 0.2s ease;
        }
        
        .dropdown-item-magic:hover {
          background: rgba(107, 70, 193, 0.2) !important;
          color: white !important;
          transform: translateX(5px);
        }
        
        .dropdown-divider-magic {
          border-color: rgba(107, 70, 193, 0.3) !important;
          margin: 0.5rem 0;
        }
        
        /* Responsive */
        @media (max-width: 991px) {
          .navbar-collapse {
            background: rgba(26, 32, 44, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            margin-top: 10px;
            padding: 15px;
            border: 1px solid rgba(107, 70, 193, 0.3);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;