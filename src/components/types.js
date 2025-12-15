// components/types.js
// VERSIÓN CORREGIDA Y COMPLETA - Convertido a JavaScript

// En JavaScript usamos comentarios JSDoc para documentar tipos
/**
 * @typedef {Object} Review
 * @property {string} name
 * @property {string} comment
 * @property {number} stars
 * @property {string} date
 */

/**
 * @typedef {Object} Game
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} images
 * @property {number} price
 * @property {string} category
 * @property {number} rating
 * @property {Review[]} reviews
 * @property {string} platform
 * @property {string} [trailer]
 * @property {number} stock
 * @property {boolean} isActive
 * @property {string} sku
 * @property {number} [discount]
 * @property {boolean} [featured]
 */

/**
 * @typedef {Object} ShippingAddress
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} city
 * @property {string} country
 * @property {string} zipCode
 * @property {number} [latitude]
 * @property {number} [longitude]
 */

/**
 * @typedef {Object} PaymentMethod
 * @property {'credit-card' | 'qr' | 'paypal'} type
 * @property {string} [cardNumber]
 * @property {string} [expiryDate]
 * @property {string} [cvv]
 * @property {string} [cardHolder]
 */

/**
 * @typedef {Object} OrderItem
 * @property {Game} game
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} OrderStatus
 * @property {'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'} status
 * @property {string} timestamp
 * @property {string} description
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {number} subtotal
 * @property {number} shippingCost
 * @property {number} total
 * @property {ShippingAddress} shippingAddress
 * @property {PaymentMethod} paymentMethod
 * @property {OrderStatus[]} statusHistory
 * @property {'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'} currentStatus
 * @property {string} createdAt
 * @property {string} [estimatedDelivery]
 * @property {string} [trackingNumber]
 */

// Datos de ejemplo para testing
const mockOrders = [
  {
    id: 'ORD-123456',
    userId: 'user1',
    items: [
      {
        game: {
          id: 1,
          title: "GTA VI",
          category: "Más vendidos",
          platform: "PS5",
          price: 59.99,
          description: "La última entrega de la famosa saga...",
          images: ["/img/game1.jpg"],
          rating: 5,
          reviews: [],
          stock: 50,
          isActive: true,
          sku: "GTA6-PS5-001",
          discount: 0,
          featured: true
        },
        quantity: 1,
        price: 59.99
      }
    ],
    subtotal: 59.99,
    shippingCost: 5.00,
    total: 64.99,
    shippingAddress: {
      fullName: "Juan Pérez",
      email: "juan@email.com",
      phone: "+51 987 654 321",
      address: "Av. Principal 123",
      city: "Lima",
      country: "Perú",
      zipCode: "15001"
    },
    paymentMethod: {
      type: 'credit-card',
      cardNumber: '**** **** **** 1234'
    },
    statusHistory: [
      {
        status: 'pending',
        timestamp: new Date().toISOString(),
        description: 'Pedido recibido'
      },
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() + 3600000).toISOString(),
        description: 'Pago confirmado'
      }
    ],
    currentStatus: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 604800000).toISOString().split('T')[0],
    trackingNumber: 'TRK-789456123'
  }
];

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} nickname
 * @property {string} fullName
 * @property {string} email
 * @property {string} avatar
 * @property {boolean} isActive
 * @property {string} registrationDate
 * @property {string} [lastLogin]
 * @property {number} totalOrders
 * @property {number} totalSpent
 */

// Datos de ejemplo de usuarios (basado en tu AdminPanel.tsx)
const mockUsers = [
  {
    id: '1',
    nickname: 'BrandonBp',
    fullName: 'Brandon',
    email: 'brando@gmail.com',
    avatar: '/img/Andresaurio.png',
    isActive: true,
    registrationDate: '2025-01-15',
    lastLogin: '2025-10-05',
    totalOrders: 5,
    totalSpent: 299.95
  },
  {
    id: '2',
    nickname: 'GonzaloPaz',
    fullName: 'Gonzalo',
    email: 'dominic@email.com',
    avatar: '/img/Domo.jpg',
    isActive: true,
    registrationDate: '2025-02-20',
    lastLogin: '2025-10-06',
    totalOrders: 3,
    totalSpent: 149.97
  },
  {
    id: '3', 
    nickname: 'Jep365',
    fullName: 'Jairo',
    email: 'jairo@email.com',
    avatar: '/img/JEP.jpg',
    isActive: true,
    registrationDate: '2025-03-10',
    lastLogin: '2025-10-07',
    totalOrders: 8,
    totalSpent: 479.92
  }
];

// Exportar como ES modules para compatibilidad con Vite
// Tipos (en JS usamos los @typedef comentados arriba)
export { mockOrders, mockUsers };