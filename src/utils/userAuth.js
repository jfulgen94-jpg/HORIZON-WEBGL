/**
 * USER-AUTH.JS — Gestión de Usuario, Autenticación y Perfiles para Informes Ejecutivos
 * 
 * Implementación desacoplada local-first (localStorage) con arquitectura
 * preparada para conectar a Supabase / PocketBase en producción.
 */

import {
  checkRateLimit,
  recordReportGeneration,
  syncReportsQuota,
  getCurrentUtcDates,
} from "./rateLimiter";

const AUTH_STORAGE_KEY = "horizon_auth_user";
const REGISTERED_USERS_KEY = "horizon_registered_users";
const ANONYMOUS_CLIENT_KEY = "horizon_anonymous_client";

/**
 * Genera un identificador único seguro compatible con entornos de navegador.
 */
function generateUuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "usr-" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

/**
 * Crea la estructura inicial para cuotas de rate limit.
 */
function createInitialReportsQuota() {
  const { dayKey, monthKey } = getCurrentUtcDates();
  return {
    usedToday: 0,
    usedThisMonth: 0,
    lastResetDay: dayKey,
    lastResetMonth: monthKey,
  };
}

/**
 * Obtiene o inicializa un perfil de cliente anónimo en localStorage.
 */
export function getAnonymousClient() {
  try {
    const stored = localStorage.getItem(ANONYMOUS_CLIENT_KEY);
    if (stored) {
      const client = JSON.parse(stored);
      client.reports = syncReportsQuota(client.reports);
      localStorage.setItem(ANONYMOUS_CLIENT_KEY, JSON.stringify(client));
      return client;
    }
  } catch (err) {
    console.warn("[Auth] No se pudo leer cliente anónimo:", err);
  }

  const newClient = {
    id: generateUuid(),
    email: null,
    name: "Invitado Anónimo",
    isAnonymous: true,
    createdAt: new Date().toISOString(),
    reports: createInitialReportsQuota(),
  };

  try {
    localStorage.setItem(ANONYMOUS_CLIENT_KEY, JSON.stringify(newClient));
  } catch (err) {
    console.warn("[Auth] No se pudo persistir cliente anónimo:", err);
  }

  return newClient;
}

/**
 * Obtiene el usuario autenticado actual o el cliente anónimo activo.
 * @returns {Object} Perfil de usuario completo con cuotas sincronizadas
 */
export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const user = JSON.parse(stored);
      user.reports = syncReportsQuota(user.reports);
      user.isAnonymous = false;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return user;
    }
  } catch (err) {
    console.warn("[Auth] Error al recuperar usuario activo:", err);
  }

  return getAnonymousClient();
}

/**
 * Registra un nuevo usuario en el sistema prototipo.
 * @param {string} name - Nombre del usuario
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Object} Usuario registrado y autenticado
 */
export function registerUser(name, email, password = "") {
  if (!email || !email.includes("@")) {
    throw new Error("Por favor, introduce una dirección de correo electrónico válida.");
  }
  if (!name || name.trim().length < 2) {
    throw new Error("Por favor, introduce un nombre o alias comercial válido.");
  }

  const cleanEmail = email.trim().toLowerCase();
  let registeredList = [];

  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    if (stored) registeredList = JSON.parse(stored);
  } catch {
    registeredList = [];
  }

  const existing = registeredList.find((u) => u.email === cleanEmail);
  if (existing) {
    throw new Error("Ya existe una cuenta con este correo electrónico. Por favor, inicia sesión.");
  }

  const newUser = {
    id: generateUuid(),
    email: cleanEmail,
    name: name.trim(),
    createdAt: new Date().toISOString(),
    isAnonymous: false,
    reports: createInitialReportsQuota(),
  };

  // Hash simple para prototipo - en produccion usar SubtleCrypto
  const hashPassword = (pwd) => {
    let hash = 0;
    for (let i = 0; i < pwd.length; i++) {
      const char = pwd.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36);
  };
  registeredList.push({ ...newUser, passwordHash: password ? hashPassword(password) : "" });

  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredList));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  } catch (err) {
    console.warn("[Auth] Error al persistir nuevo registro:", err);
  }

  return newUser;
}

/**
 * Inicia sesión con un correo previamente registrado o crea una cuenta rápida.
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña opcional
 * @returns {Object} Usuario autenticado
 */
export function loginUser(email, password = "") {
  if (!email || !email.includes("@")) {
    throw new Error("Introduce un correo electrónico válido.");
  }

  const cleanEmail = email.trim().toLowerCase();
  let registeredList = [];

  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    if (stored) registeredList = JSON.parse(stored);
  } catch {
    registeredList = [];
  }

  let user = registeredList.find((u) => u.email === cleanEmail);

  if (!user) {
    // Si no existía, auto-registramos una cuenta básica para no bloquear al usuario
    return registerUser(cleanEmail.split("@")[0], cleanEmail, password);
  }

  user.reports = syncReportsQuota(user.reports);
  const authSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    isAnonymous: false,
    reports: user.reports,
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
  } catch (err) {
    console.warn("[Auth] Error al guardar sesión:", err);
  }

  return authSession;
}

/**
 * Cierra la sesión activa y restaura el perfil anónimo.
 */
export function logoutUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.warn("[Auth] Error al cerrar sesión:", err);
  }
  return getAnonymousClient();
}

/**
 * Consulta la disponibilidad de cuota del usuario actual.
 */
export function checkCurrentUserRateLimit() {
  const user = getCurrentUser();
  return checkRateLimit(user.reports);
}

/**
 * Descuenta un informe de la cuota del usuario actual en almacenamiento.
 * @returns {Object} Usuario con cuotas actualizadas
 */
export function consumeCurrentUserReportQuota() {
  const user = getCurrentUser();
  const updatedReports = recordReportGeneration(user.reports);
  user.reports = updatedReports;

  try {
    if (user.isAnonymous) {
      localStorage.setItem(ANONYMOUS_CLIENT_KEY, JSON.stringify(user));
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

      // Actualizar también en la lista de registrados
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      if (stored) {
        const list = JSON.parse(stored);
        const idx = list.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          list[idx].reports = updatedReports;
          localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(list));
        }
      }
    }
  } catch (err) {
    console.warn("[Auth] Error al persistir consumo de cuota:", err);
  }

  return user;
}
