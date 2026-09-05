/**
 * RATE-LIMITER.JS — Control de Cuota de Generación de Informes Ejecutivos
 * 
 * Políticas:
 * - 2 informes por día por usuario.
 * - 10 informes por mes por usuario.
 * - Reset diario a las 00:00 UTC.
 * - Reset mensual el día 1 de cada mes a las 00:00 UTC.
 */

export const RATE_LIMITS = {
  DAILY_MAX: 2,
  MONTHLY_MAX: 10,
};

// Interruptor solo para prueba y desarrollo: cuando es true no se bloquea
// nunca la generación en el navegador. Revertir a false antes de producción real.
export const DEV_BYPASS_RATE_LIMIT = true;

/**
 * Obtiene la fecha actual en formato UTC 'YYYY-MM-DD' y 'YYYY-MM'.
 */
export function getCurrentUtcDates() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  return {
    dayKey: `${year}-${month}-${day}`,
    monthKey: `${year}-${month}`,
  };
}

/**
 * Sincroniza y resetea los contadores si ha transcurrido un nuevo día o mes UTC.
 * @param {Object} reports - Objeto reports { usedToday, usedThisMonth, lastResetDay, lastResetMonth }
 * @returns {Object} Objeto reports normalizado y actualizado
 */
export function syncReportsQuota(reports = {}) {
  const { dayKey, monthKey } = getCurrentUtcDates();

  const current = {
    usedToday: typeof reports.usedToday === "number" ? reports.usedToday : 0,
    usedThisMonth: typeof reports.usedThisMonth === "number" ? reports.usedThisMonth : 0,
    lastResetDay: reports.lastResetDay || dayKey,
    lastResetMonth: reports.lastResetMonth || monthKey,
  };

  // Reset mensual
  if (current.lastResetMonth !== monthKey) {
    current.usedThisMonth = 0;
    current.usedToday = 0;
    current.lastResetMonth = monthKey;
    current.lastResetDay = dayKey;
  }
  // Reset diario
  else if (current.lastResetDay !== dayKey) {
    current.usedToday = 0;
    current.lastResetDay = dayKey;
  }

  return current;
}

/**
 * Evalúa si el usuario o cliente tiene cuota disponible para generar un nuevo informe.
 * @param {Object} reports - Objeto reports de usuario
 * @returns {{ allowed: boolean, reason: string | null, remainingToday: number, remainingThisMonth: number }}
 */
export function checkRateLimit(reports = {}) {
  const synced = syncReportsQuota(reports);

  if (DEV_BYPASS_RATE_LIMIT) {
    return {
      allowed: true,
      reason: null,
      remainingToday: Math.max(0, RATE_LIMITS.DAILY_MAX - synced.usedToday),
      remainingThisMonth: Math.max(0, RATE_LIMITS.MONTHLY_MAX - synced.usedThisMonth),
      syncedReports: synced,
      bypass: true,
    };
  }

  const remainingToday = Math.max(0, RATE_LIMITS.DAILY_MAX - synced.usedToday);
  const remainingThisMonth = Math.max(0, RATE_LIMITS.MONTHLY_MAX - synced.usedThisMonth);

  if (synced.usedToday >= RATE_LIMITS.DAILY_MAX) {
    return {
      allowed: false,
      reason: `Has alcanzado el límite diario de ${RATE_LIMITS.DAILY_MAX} informes. La cuota se reiniciará a las 00:00 UTC.`,
      remainingToday: 0,
      remainingThisMonth,
      syncedReports: synced,
    };
  }

  if (synced.usedThisMonth >= RATE_LIMITS.MONTHLY_MAX) {
    return {
      allowed: false,
      reason: `Has alcanzado el límite mensual de ${RATE_LIMITS.MONTHLY_MAX} informes. La cuota se reiniciará el primer día del próximo mes.`,
      remainingToday,
      remainingThisMonth: 0,
      syncedReports: synced,
    };
  }

  return {
    allowed: true,
    reason: null,
    remainingToday,
    remainingThisMonth,
    syncedReports: synced,
  };
}

/**
 * Incrementa el consumo de cuota tras una generación exitosa.
 * @param {Object} reports - Objeto reports de usuario
 * @returns {Object} Objeto reports con las cuotas actualizadas
 */
export function recordReportGeneration(reports = {}) {
  const synced = syncReportsQuota(reports);
  const { dayKey, monthKey } = getCurrentUtcDates();

  return {
    usedToday: synced.usedToday + 1,
    usedThisMonth: synced.usedThisMonth + 1,
    lastResetDay: dayKey,
    lastResetMonth: monthKey,
  };
}
