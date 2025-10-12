// components/types.ts - VERSIÓN CORREGIDA Y COMPLETA
export interface Review {
  name: string;
  comment: string;
  stars: number;
  date: string;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  rating: number;
  reviews: Review[];
  
  // PROPIEDADES QUE FALTABAN (se usan en otros componentes):
  platform: string;        // ✅ Usado en Navbar.tsx para filtros
  trailer?: string;        // ✅ Usado en GameModal.tsx (opcional)
  
  // NUEVAS PROPIEDADES PARA E-COMMERCE:
  stock: number;           // ✅ Para gestión de inventario
  isActive: boolean;       // ✅ Para activar/desactivar productos
  sku: string;            // ✅ Código único identificador
  discount?: number;      // ✅ Descuentos (opcional)
  featured?: boolean;     // ✅ Productos destacados
}

// Interfaz para órdenes/pedidos (la necesitaremos pronto)

// Agregar esto al final de tu components/types.ts
export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

export interface PaymentMethod {
  type: 'credit-card' | 'qr' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolder?: string;
}

export interface OrderItem {
  game: Game;
  quantity: number;
  price: number;
}


export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
  description: string;
}
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  statusHistory: OrderStatus[];
  currentStatus: OrderStatus['status'];
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Datos de ejemplo para testing
export const mockOrders: Order[] = [
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
// AGREGAR ESTO AL ARCHIVO types.ts - después de las interfaces existentes

export interface User {
  id: string;
  nickname: string;
  fullName: string;
  email: string;
  avatar: string;
  isActive: boolean;
  registrationDate: string;
  lastLogin?: string;
  totalOrders: number;
  totalSpent: number;
}

// Datos de ejemplo de usuarios (basado en tu AdminPanel.tsx)
export const mockUsers: User[] = [
  {
    id: '1',
    nickname: 'BrandonBp',
    fullName: 'Brandon',
    email: 'brando@gmail.com',
    avatar: '/img/Andresaurio.png',
    isActive: true,
    registrationDate: '2024-01-15',
    lastLogin: '2024-12-01',
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
    registrationDate: '2024-02-20',
    lastLogin: '2024-11-28',
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
    registrationDate: '2024-03-10',
    lastLogin: '2024-11-30',
    totalOrders: 8,
    totalSpent: 479.92
  }
];