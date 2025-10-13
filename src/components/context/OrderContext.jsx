import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const ORDERS_STORAGE_KEY = 'retrogames-user-orders';

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('📂 Órdenes cargadas desde localStorage:', parsed.length);
        return parsed;
      }
    } catch (error) {
      console.error('❌ Error cargando órdenes desde localStorage:', error);
    }
    return [];
  });

  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      console.log('💾 Órdenes guardadas en localStorage:', orders.length);
    } catch (error) {
      console.error('❌ Error guardando órdenes en localStorage:', error);
    }
  }, [orders]);

  const addOrder = (order) => {
    console.log('🔄 Agregando orden al contexto:', order.id);
    
    const orderExists = orders.some(existingOrder => existingOrder.id === order.id);
    if (orderExists) {
      console.warn('⚠️ La orden ya existe, actualizando...');
      setOrders(prevOrders => 
        prevOrders.map(existingOrder => 
          existingOrder.id === order.id ? order : existingOrder
        )
      );
    } else {
      setOrders(prevOrders => {
        const newOrders = [order, ...prevOrders];
        console.log('📦 Nuevo estado de órdenes:', newOrders.length);
        return newOrders;
      });
    }
    
    setCurrentOrder(order);
    console.log('✅ Orden agregada correctamente');
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const debugOrders = () => {
    console.log('🐛 DEBUG - Estado actual del contexto:');
    console.log('Current Order:', currentOrder?.id || 'null');
    console.log('Total Orders:', orders.length);
    orders.forEach((order, index) => {
      console.log(`Orden ${index + 1}:`, order.id, `(${order.items.length} productos)`);
    });
  };

  if (process.env.NODE_ENV === 'development') {
    window.debugOrders = debugOrders;
  }

  const value = {
    currentOrder,
    setCurrentOrder,
    orders,
    addOrder,
    clearCurrentOrder,
    getOrderById
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const createSampleOrder = () => {
  return {
    id: 'ORD-' + Date.now(),
    userId: 'user-sample',
    items: [
      {
        game: {
          id: 1,
          title: "Juego de Ejemplo",
          description: "Este es un juego de prueba",
          images: ["/img/game1.jpg"],
          price: 29.99,
          category: "Ejemplo",
          rating: 4,
          reviews: [],
          platform: "PS5",
          stock: 10,
          isActive: true,
          sku: "EXAMPLE-001",
          discount: 0,
          featured: false
        },
        quantity: 1,
        price: 29.99
      }
    ],
    subtotal: 29.99,
    shippingCost: 5.00,
    total: 34.99,
    shippingAddress: {
      fullName: "Usuario Ejemplo",
      email: "ejemplo@email.com",
      phone: "+51 987 654 321",
      address: "Av. Ejemplo 123",
      city: "Lima",
      country: "Perú",
      zipCode: "15001"
    },
    paymentMethod: {
      type: 'credit-card',
      cardNumber: '1234'
    },
    statusHistory: [
      {
        status: 'confirmed',
        timestamp: new Date().toISOString(),
        description: 'Pedido de ejemplo creado'
      }
    ],
    currentStatus: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    trackingNumber: 'TRK-SAMPLE'
  };
};

export const clearAllOrders = () => {
  localStorage.removeItem(ORDERS_STORAGE_KEY);
  console.log('🧹 Todas las órdenes eliminadas');
};