// main.jsx - VERSIÓN CORREGIDA
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainRouter from './MainRouter';
import { OrderProvider } from './components/context/OrderContext';
import { GameProvider } from './components/context/GameContext';
import { UserProvider } from './components/context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

console.log('🚀 Iniciando aplicación...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrderProvider>
      <GameProvider>
        <UserProvider>
          <MainRouter />
        </UserProvider>
      </GameProvider>
    </OrderProvider>
  </React.StrictMode>
);