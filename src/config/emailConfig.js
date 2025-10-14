// config/emailConfig.js
// Configuración de email para PowerStore

export const emailConfig = {
  // Configuración de Gmail (recomendado)
  service: 'gmail',
  auth: {
    // ⚠️ IMPORTANTE: Cambia estos valores por tus credenciales reales
    user: 'tu-email@gmail.com', // Tu email de Gmail
    pass: 'tu-app-password' // Tu contraseña de aplicación de Gmail
  }
};

// INSTRUCCIONES PARA CONFIGURAR GMAIL:
// 1. Ve a tu cuenta de Google (myaccount.google.com)
// 2. Seguridad > Verificación en 2 pasos (debe estar activada)
// 3. Contraseñas de aplicaciones
// 4. Selecciona "Mail" y genera una nueva contraseña
// 5. Copia esa contraseña y pégala en 'pass' arriba
// 6. Cambia 'user' por tu email de Gmail

// ALTERNATIVAS:
// - Outlook: service: 'hotmail'
// - Yahoo: service: 'yahoo'
// - SendGrid: usar API key
// - Mailgun: usar API key

export default emailConfig;