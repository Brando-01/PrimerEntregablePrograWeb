// services/emailService.js
 // import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';

// Configuración del servicio de email
const transporterConfig = {
  service: emailConfig.service,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass
  }
};

// Crear transporter
 // const transporter = null; // nodemailer solo se debe usar en backend

// Función para generar código de verificación
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Función para enviar código de verificación
 // Esta función no puede enviar correos desde el frontend. Solo genera el código y retorna true para evitar errores.
export const sendVerificationEmail = async (
  email,
  verificationCode,
  userName
) => {
  // Simulación de envío de correo en frontend
  console.log(`Simulando envío de correo a ${email} con código ${verificationCode} para usuario ${userName}`);
  return true;
};

// Función para verificar el código
export const verifyCode = (storedCode, inputCode) => {
  return storedCode === inputCode;
};

// Función para generar código de recuperación
export const generateRecoveryCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Función para enviar código de recuperación
export const sendRecoveryEmail = async (
  email, 
  recoveryCode,
  userName
) => {
  return true;
};