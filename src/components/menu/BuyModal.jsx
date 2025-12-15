import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ConfirmationModal from './ConfirmationModal';
import { useOrder } from '../context/OrderContext';
import { useUser } from '../context/UserContext';
import { getUserSession, isLoggedIn } from '../../utils/session';
import { useNavigate } from 'react-router-dom';

const BuyModal = ({ visible, onClose, cartItems, onOrderComplete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const { addOrder } = useOrder();
  const { users, updateUser } = useUser();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Reino Mágico',
    zipCode: ''
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const [mapPosition, setMapPosition] = useState(null);

  // Fix default marker icon path (Leaflet + Vite)
  // Use import.meta.url + new URL(...) so Vite resolves asset paths correctly
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
  });

  useEffect(() => {
    if (visible) {
      if (!isLoggedIn()) {
        alert('Debes iniciar sesión para iniciar el ritual. Serás redirigido a la página de inicio de sesión.');
        onClose();
        navigate('/login');
        return;
      }
      setCurrentStep(1);
      setPaymentMethod('credit-card');
      setShippingAddress({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'Reino Mágico',
        zipCode: '',
        shippingMethod: 'Aero' // nuevo campo: Aero, Maritimo, Terrestre
      });
      setCardData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: ''
      });
    }
  }, [visible]);

  if (!visible || cartItems.length === 0) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const discount = Number(item.discount) || 0;
    const unitPrice = Number(item.price) * (1 - (discount / 100));
    return sum + (unitPrice * (item.quantity || 1));
  }, 0);
  const shippingCost = 5.00;
  const total = subtotal + shippingCost;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    
    if (!shippingAddress.fullName.trim()) {
      alert('Por favor ingresa tu nombre de mago completo');
      return;
    }
    if (!shippingAddress.email.trim()) {
      alert('Por favor ingresa tu pergamino electrónico');
      return;
    }
    if (!shippingAddress.address.trim()) {
      alert('Por favor ingresa tu dirección en el reino');
      return;
    }
    if (!shippingAddress.city.trim()) {
      alert('Por favor ingresa tu ciudad mágica');
      return;
    }
    
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit-card') {
      if (!cardData.cardNumber.trim() || cardData.cardNumber.replace(/\s/g, '').length < 16) {
        alert('Por favor ingresa un número de tarjeta mágica válido (16 runas)');
        return;
      }
      if (!cardData.expiryDate.trim()) {
        alert('Por favor ingresa la fecha de expiración del hechizo');
        return;
      }
      if (!cardData.cvv.trim() || cardData.cvv.length < 3) {
        alert('Por favor ingresa el código de verificación arcano (3 símbolos)');
        return;
      }
      if (!cardData.cardHolder.trim()) {
        alert('Por favor ingresa el nombre del portador del artefacto');
        return;
      }
    }
    
    setCurrentStep(4);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Error: El grimorio está vacío. No se puede realizar el ritual.');
      onClose();
      return;
    }

    const orderItems = cartItems.map(item => {
      const discount = Number(item.discount) || 0;
      const unitPrice = Number(item.price) * (1 - (discount / 100));
      return {
        game: item,
        quantity: item.quantity || 1,
        price: Number(unitPrice.toFixed(2))
      };
    });

    const paymentData = {
      type: paymentMethod,
      ...(paymentMethod === 'credit-card' && {
        cardNumber: cardData.cardNumber.slice(-4),
        cardHolder: cardData.cardHolder
      })
    };

    const session = getUserSession();
    const sessionUserId = session?.username || session?.fullName || null;

    const newOrder = {
      id: 'RITUAL-' + Date.now(),
      userId: sessionUserId || ('guest-' + Math.random().toString(36).substr(2, 9)),
      items: orderItems,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: total,
      shippingAddress: shippingAddress,
  shippingMethod: shippingAddress.shippingMethod || 'Aero',
      paymentMethod: paymentData,
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          description: 'Ritual iniciado'
        },
        {
          status: 'confirmed',
          timestamp: new Date(Date.now() + 300000).toISOString(),
          description: 'Energía mágica confirmada'
        }
      ],
      currentStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingNumber: 'GRIMO-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    addOrder(newOrder);
    try {
      if (sessionUserId) {
        const matchedUser = users.find(u => (
          (u.nickname && u.nickname.toLowerCase() === String(sessionUserId).toLowerCase()) ||
          (u.fullName && u.fullName.toLowerCase() === String(sessionUserId).toLowerCase()) ||
          (u.email && u.email.toLowerCase() === String(sessionUserId).toLowerCase())
        ));
        if (matchedUser) {
          const newTotalOrders = (matchedUser.totalOrders || 0) + 1;
          const newTotalSpent = (matchedUser.totalSpent || 0) + total;
          updateUser(matchedUser.id, { totalOrders: newTotalOrders, totalSpent: Number(newTotalSpent.toFixed(2)) });
        }
      }
    } catch (err) {
      console.error('Error actualizando totales de usuario:', err);
    }
    setShowConfirmation(true);
    
    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  const handleMapSubmit = (e) => {
    e.preventDefault();
    if (!mapPosition) {
      alert('Por favor selecciona tu ubicación en el mapa');
      return;
    }
    setShippingAddress(prev => ({
      ...prev,
      address: `${prev.address} (Ubicación: ${mapPosition.lat}, ${mapPosition.lng})`
    }));
    setCurrentStep(3);
  };

  const MapClickHandler = ({ setMapPosition }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng || e.latLng || { lat: e.lat, lng: e.lng };
        setMapPosition({ lat: lat, lng: lng });
      }
    });
    return null;
  };

  const DraggableMarker = ({ position, setPosition }) => {
    const [pos, setPos] = useState(position);
    useEffect(() => setPos(position), [position]);
    return (
      <Marker
        position={[pos.lat, pos.lng]}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const latlng = marker.getLatLng();
            const newPos = { lat: latlng.lat, lng: latlng.lng };
            setPos(newPos);
            setPosition(newPos);
          }
        }}
      />
    );
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return shippingAddress.fullName.trim() && 
             shippingAddress.email.trim() && 
             shippingAddress.address.trim() &&
             shippingAddress.city.trim();
    }
    
    if (currentStep === 3 && paymentMethod === 'credit-card') {
      return cardData.cardNumber.replace(/\s/g, '').length >= 16 &&
             cardData.expiryDate.trim() &&
             cardData.cvv.trim().length >= 3 &&
             cardData.cardHolder.trim();
    }
    
    return true;
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value.replace(/\D/g, ''));
    setCardData(prev => ({ ...prev, cardNumber: formatted }));
  };

  return (
    <>
      <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">
                🧙‍♂️ Ritual de Invocación - Paso {currentStep} de 4
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} />
            </div>

            <div className="progress rounded-0" style={{ height: '4px' }}>
              <div className="progress-bar" style={{ width: `${(currentStep / 4) * 100}%` }} />
            </div>

            <form onSubmit={
              currentStep === 1 ? handleShippingSubmit :
              currentStep === 2 ? handleMapSubmit :
              currentStep === 3 ? handlePaymentSubmit :
              handleFinalSubmit
            }>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                
                {/* Paso 1: Datos del Mago */}
                {currentStep === 1 && (
                  <div>
                    <h6>📜 Información del Mago</h6>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre Mágico Completo *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingAddress.fullName}
                          onChange={(e) => setShippingAddress(prev => ({...prev, fullName: e.target.value}))}
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Pergamino Electrónico *</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          value={shippingAddress.email}
                          onChange={(e) => setShippingAddress(prev => ({...prev, email: e.target.value}))}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">📍 Dirección en el Reino *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress(prev => ({...prev, address: e.target.value}))}
                        required 
                      />
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">🏰 Ciudad Mágica *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress(prev => ({...prev, city: e.target.value}))}
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">🌍 Reino</label>
                        <select 
                          className="form-select"
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress(prev => ({...prev, country: e.target.value}))}
                        >
                          <option>Reino Mágico</option>
                          <option>Tierra Media</option>
                          <option>Narnia</option>
                          <option>Hogwarts</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">🚚 Método de envío</label>
                        <select
                          className="form-select"
                          value={shippingAddress.shippingMethod || 'Aero'}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, shippingMethod: e.target.value }))}
                        >
                          <option value="Aero">Aero</option>
                          <option value="Maritimo">Marítimo</option>
                          <option value="Terrestre">Terrestre</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paso 2: Selección de Ubicación de Envío */}
                {currentStep === 2 && (
                  <div>
                    <h6>🗺️ Selecciona tu ubicación de envío</h6>
                    <p>Haz clic en el mapa para seleccionar o arrastra el marcador.</p>
                    <div style={{ width: '100%', height: '400px' }}>
                      <MapContainer center={mapPosition ? [mapPosition.lat, mapPosition.lng] : [19.4326, -99.1332]} zoom={12} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler setMapPosition={setMapPosition} />
                        {mapPosition && (
                          <DraggableMarker position={mapPosition} setPosition={setMapPosition} />
                        )}
                      </MapContainer>
                    </div>

                    <div className="mt-3 d-flex gap-2 align-items-start">
                      <div>
                        <label className="form-label">Latitud</label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={mapPosition ? String(mapPosition.lat) : ''}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            if (!isNaN(v)) setMapPosition(prev => ({ lat: v, lng: prev?.lng ?? -99.1332 }));
                            else setMapPosition(null);
                          }}
                        />
                        <label className="form-label">Longitud</label>
                        <input
                          type="text"
                          className="form-control"
                          value={mapPosition ? String(mapPosition.lng) : ''}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            if (!isNaN(v)) setMapPosition(prev => ({ lat: prev?.lat ?? 19.4326, lng: v }));
                            else setMapPosition(null);
                          }}
                        />
                      </div>

                      <div className="ms-3">
                        <div className="mb-2">
                          <label className="form-label">Coordenadas seleccionadas</label>
                          <div className="border rounded p-2">
                            {mapPosition ? (
                              <div>{mapPosition.lat.toFixed(6)}, {mapPosition.lng.toFixed(6)}</div>
                            ) : (
                              <div className="text-muted">No hay ubicación seleccionada</div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-outline-secondary" onClick={() => setMapPosition(null)}>
                            Limpiar ubicación
                          </button>
                          <button type="submit" className="btn btn-primary" disabled={!mapPosition}>
                            Confirmar ubicación
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paso 3: Método de Pago Mágico */}
                {currentStep === 3 && (
                  <div>
                    <h6>💎 Método de Intercambio Mágico</h6>
                    
                    <div className="mb-4">
                      <div className="form-check mb-2">
                        <input 
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'credit-card'}
                          onChange={() => setPaymentMethod('credit-card')}
                        />
                        <label className="form-check-label">💳 Artefacto de Crédito</label>
                      </div>
                      
                      <div className="form-check mb-2">
                        <input 
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'qr'}
                          onChange={() => setPaymentMethod('qr')}
                        />
                        <label className="form-check-label">📱 Símbolos Arcanos (QR)</label>
                      </div>
                    </div>

                    {paymentMethod === 'credit-card' && (
                      <div className="border p-3 rounded">
                        <div className="mb-3">
                          <label className="form-label">Número del Artefacto</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="1234 5678 9012 3456"
                            value={cardData.cardNumber}
                            onChange={handleCardNumberChange}
                          />
                        </div>
                        
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Caducidad del Hechizo</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="MM/AA"
                              value={cardData.expiryDate}
                              onChange={(e) => setCardData(prev => ({...prev, expiryDate: e.target.value}))}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Código Arcano (CVV)</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="123"
                              value={cardData.cvv}
                              onChange={(e) => setCardData(prev => ({...prev, cvv: e.target.value}))}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Nombre del Portador</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={cardData.cardHolder}
                            onChange={(e) => setCardData(prev => ({...prev, cardHolder: e.target.value}))}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'qr' && (
                      <div className="text-center border p-4 rounded">
                        <div className="bg-light p-4 d-inline-block">
                          <div style={{ width: '150px', height: '150px', backgroundColor: '#ddd' }} className="d-flex align-items-center justify-content-center">
                            <img 
                              src="/img/QR.jpg" 
                              alt="QR" 
                              style={{ width: "150px", height: "auto" }} 
                            />
                            <span>⚡ SÍMBOLOS ARCANOS ⚡</span>
                          </div>
                        </div>
                        <p className="text-muted mt-3">
                          Escanea los símbolos con tu cristal mágico
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Paso 4: Resumen del Ritual */}
                {currentStep === 4 && (
                  <div>
                    <h6>📖 Resumen del Ritual</h6>
                    
                    <div className="mb-3">
                      <strong>Poderes a Invocar:</strong>
                      {cartItems.map(item => (
                        <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                          <span>🔮 {item.title}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Envío Mágico:</span>
                        <span>${shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Energía Total Requerida:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="alert alert-info">
                      <small>
                        ⚡ Los grimorios con los hechizos serán enviados a tu pergamino electrónico 
                        en los próximos instantes mágicos.
                      </small>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                {currentStep > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(prev => prev - 1)}>
                    ← Paso Anterior
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
                    Siguiente Paso →
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    ✅ Completar Orden
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmationModal
        visible={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose();
        }}
      />
    </>
  );
};

export default BuyModal;