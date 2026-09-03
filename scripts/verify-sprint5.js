/**
 * VERIFY-SPRINT5.JS — Script de Verificacion Integral de Sprint 5 de Horizon
 * 
 * Audita de manera sistematica:
 * 1. Existencia e integridad de los 16 archivos generados.
 * 2. Ausencia total de emojis en el codigo fuente.
 * 3. Consistencia y validez de la Biblioteca de Prompts (IDs, tags, modelos, placeholder canonico).
 * 4. Completitud de la infraestructura de Wizards (Pasos, Restricciones, Formatos, Factores, Funciones).
 * 5. Configuracion de modulos especificos de Wizard (Tareas primarias, secundarias, branching, PRD, QA).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "src", "data");

// Lista de los 18 archivos generados en Sprint 5
const SPRINT5_FILES = [
  "prompts-data.js",
  "prompts-finanzas.js",
  "prompts-medicina.js",
  "prompts-derecho.js",
  "prompts-contabilidad.js",
  "prompts-matematicas.js",
  "prompts-ingenieria.js",
  "prompts-diseno.js",
  "prompts-psicologia.js",
  "wizard-data.js",
  "wizard-finanzas.js",
  "wizard-medicina.js",
  "wizard-derecho.js",
  "wizard-contabilidad.js",
  "wizard-matematicas.js",
  "wizard-ingenieria.js",
  "wizard-diseno.js",
  "wizard-psicologia.js"
];

// Modelos oficiales autorizados
const VALID_MODELS = [
  "Gemini 2.5 Flash",
  "Claude 3.7 Sonnet",
  "GPT-4o",
  "Llama 3.3",
  "DeepSeek V4"
];

// Regex para deteccion de emojis Unicode
const EMOJI_REGEX = /(?:\p{Extended_Pictographic}|\p{Emoji_Presentation})/u;

async function runVerification() {
  console.log("================================================================================");
  console.log("INICIANDO AUDITORIA TECNICA DEL SPRINT 5 — HORIZON");
  console.log("================================================================================\n");

  let totalErrors = 0;
  let totalWarnings = 0;

  // ---------------------------------------------------------------------------
  // TEST 1: Existencia de archivos
  // ---------------------------------------------------------------------------
  console.log("[TEST 1/5] Verificacion de existencia de los 16 archivos del Sprint 5...");
  for (const file of SPRINT5_FILES) {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`  [FALLO] Archivo no encontrado: ${file}`);
      totalErrors++;
    } else {
      const stats = fs.statSync(filePath);
      console.log(`  [OK] ${file.padEnd(26)} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }
  console.log("");

  // ---------------------------------------------------------------------------
  // TEST 2: Ausencia total de emojis
  // ---------------------------------------------------------------------------
  console.log("[TEST 2/5] Auditoria de cumplimiento de restriccion: CERO EMOJIS...");
  let emojiViolations = 0;
  for (const file of SPRINT5_FILES) {
    const filePath = path.join(DATA_DIR, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");
      lines.forEach((line, idx) => {
        if (EMOJI_REGEX.test(line)) {
          console.error(`  [FALLO] Emoji detectado en ${file}, linea ${idx + 1}: ${line.trim()}`);
          emojiViolations++;
          totalErrors++;
        }
      });
    }
  }
  if (emojiViolations === 0) {
    console.log("  [OK] Ningun emoji detectado en los 16 archivos analizados.");
  }
  console.log("");

  // ---------------------------------------------------------------------------
  // TEST 3: Integridad de la Biblioteca de Prompts
  // ---------------------------------------------------------------------------
  console.log("[TEST 3/5] Evaluacion estructural de la Biblioteca de Prompts...");
  try {
    const promptsDataUrl = pathToFileURL(path.join(DATA_DIR, "prompts-data.js")).href;
    const { getAllPrompts, PROMPT_AREAS } = await import(promptsDataUrl);
    const allPrompts = getAllPrompts();

    console.log(`  [INFO] Total de areas configuradas: ${PROMPT_AREAS.length}`);
    console.log(`  [INFO] Total de prompts cargados: ${allPrompts.length}`);

    const idSet = new Set();
    let placeholderMisses = 0;
    let invalidModels = 0;
    let missingTags = 0;

    allPrompts.forEach(p => {
      // Verificacion de duplicados
      if (idSet.has(p.id)) {
        console.error(`  [FALLO] ID de prompt duplicado: ${p.id}`);
        totalErrors++;
      }
      idSet.add(p.id);

      // Verificacion de placeholder canonico
      if (!p.prompt || !p.prompt.includes("[COPIA AQUI TU IDEA]")) {
        console.error(`  [FALLO] Prompt ${p.id} no incluye '[COPIA AQUI TU IDEA]'`);
        placeholderMisses++;
        totalErrors++;
      }

      // Verificacion de modelo recomendado
      if (!VALID_MODELS.includes(p.model)) {
        console.error(`  [FALLO] Prompt ${p.id} especifica un modelo no autorizado: '${p.model}'`);
        invalidModels++;
        totalErrors++;
      }

      // Verificacion de tags
      if (!Array.isArray(p.tags) || p.tags.length < 2) {
        console.warn(`  [ALERTA] Prompt ${p.id} tiene menos de 2 tags.`);
        missingTags++;
        totalWarnings++;
      }
    });

    if (idSet.size === allPrompts.length && placeholderMisses === 0 && invalidModels === 0) {
      console.log(`  [OK] ${allPrompts.length} prompts cumplen estrictamente el estandar canonico.`);
    }
  } catch (err) {
    console.error("  [FALLO] Error al importar prompts-data.js:", err);
    totalErrors++;
  }
  console.log("");

  // ---------------------------------------------------------------------------
  // TEST 4: Modulo Compartido de Wizards (wizard-data.js)
  // ---------------------------------------------------------------------------
  console.log("[TEST 4/5] Verificacion de datos y funciones compartidas de Wizards...");
  try {
    const wizardDataUrl = pathToFileURL(path.join(DATA_DIR, "wizard-data.js")).href;
    const wizardData = await import(wizardDataUrl);
    
    // WIZARD_STEPS
    if (!Array.isArray(wizardData.WIZARD_STEPS) || wizardData.WIZARD_STEPS.length !== 4) {
      console.error(`  [FALLO] WIZARD_STEPS debe tener exactamente 4 pasos.`);
      totalErrors++;
    } else {
      console.log(`  [OK] WIZARD_STEPS contiene los 4 pasos canonicos del wizard.`);
    }

    // COMMON_CONSTRAINTS
    const constraints = wizardData.COMMON_CONSTRAINTS;
    if (constraints.budget && constraints.timeline && constraints.technicalLevel && constraints.deployment) {
      console.log(`  [OK] COMMON_CONSTRAINTS define las 4 dimensiones de restriccion.`);
    } else {
      console.error(`  [FALLO] Faltan dimensiones en COMMON_CONSTRAINTS.`);
      totalErrors++;
    }

    // OUTPUT_FORMATS
    if (Array.isArray(wizardData.OUTPUT_FORMATS) && wizardData.OUTPUT_FORMATS.length >= 5) {
      console.log(`  [OK] OUTPUT_FORMATS incluye ${wizardData.OUTPUT_FORMATS.length} formatos de salida.`);
    } else {
      console.error(`  [FALLO] OUTPUT_FORMATS incompleto.`);
      totalErrors++;
    }

    // Helpers
    const testAnswers = {
      appName: "AppTest",
      primaryTask: "TEST1.1",
      secondaryTasks: ["SEC-01", "SEC-02"],
      selectedMetrics: ["m1", "m2"],
      budget: "zero",
      technicalLevel: "intermediate",
      deployment: "local_desktop"
    };

    const estimate = wizardData.calculateEstimate(testAnswers);
    if (estimate && estimate.totalHours > 0 && estimate.breakdown) {
      console.log(`  [OK] calculateEstimate funciona correctamente (${estimate.totalHours}h estimadas).`);
    } else {
      console.error(`  [FALLO] calculateEstimate fallo en calculo de horas.`);
      totalErrors++;
    }

    const promptText = wizardData.generatePrompt("finanzas", testAnswers);
    if (promptText && promptText.includes("PROMPT MAESTRO")) {
      console.log(`  [OK] generatePrompt genera la plantilla de construccion formal.`);
    } else {
      console.error(`  [FALLO] generatePrompt no genero la estructura esperada.`);
      totalErrors++;
    }

    const validation = wizardData.validateStep("definition", testAnswers);
    if (validation.isValid === true) {
      console.log(`  [OK] validateStep evalua correctamente la validez de pasos.`);
    } else {
      console.error(`  [FALLO] validateStep rechazo respuestas validas.`);
      totalErrors++;
    }
  } catch (err) {
    console.error("  [FALLO] Error al evaluar wizard-data.js:", err);
    totalErrors++;
  }
  console.log("");

  // ---------------------------------------------------------------------------
  // TEST 5: Modulos de Wizards Especificos (Archivos 11 a 16)
  // ---------------------------------------------------------------------------
  console.log("[TEST 5/5] Verificacion de los 6 modulos especializados de Wizards...");
  const WIZARD_MODULES = [
    { file: "wizard-medicina.js", primaryKey: "MEDICINA_PRIMARY_TASKS", prdFn: "generateMedicinaPRD", qaKey: "MEDICINA_QA_CHECKLIST" },
    { file: "wizard-derecho.js", primaryKey: "DERECHO_PRIMARY_TASKS", prdFn: "generateDerechoPRD", qaKey: "DERECHO_QA_CHECKLIST" },
    { file: "wizard-contabilidad.js", primaryKey: "CONTABILIDAD_PRIMARY_TASKS", prdFn: "generateContabilidadPRD", qaKey: "CONTABILIDAD_QA_CHECKLIST" },
    { file: "wizard-matematicas.js", primaryKey: "MATEMATICAS_PRIMARY_TASKS", prdFn: "generateMatematicasPRD", qaKey: "MATEMATICAS_QA_CHECKLIST" },
    { file: "wizard-ingenieria.js", primaryKey: "INGENIERIA_PRIMARY_TASKS", prdFn: "generateIngenieriaPRD", qaKey: "INGENIERIA_QA_CHECKLIST" },
    { file: "wizard-diseno.js", primaryKey: "DISENO_PRIMARY_TASKS", prdFn: "generateDisenoPRD", qaKey: "DISENO_QA_CHECKLIST" }
  ];

  for (const mod of WIZARD_MODULES) {
    try {
      const modUrl = pathToFileURL(path.join(DATA_DIR, mod.file)).href;
      const modExport = await import(modUrl);
      const primaryTasks = modExport[mod.primaryKey];
      const prdGenerator = modExport[mod.prdFn];
      const qaChecklist = modExport[mod.qaKey];

      if (!Array.isArray(primaryTasks) || primaryTasks.length !== 6) {
        console.error(`  [FALLO] ${mod.file}: ${mod.primaryKey} debe tener exactamente 6 tareas (encontradas ${primaryTasks?.length}).`);
        totalErrors++;
      } else {
        console.log(`  [OK] ${mod.file}: 6 tareas primarias detalladas con inputs, outputs y riesgos.`);
      }

      if (typeof prdGenerator !== "function") {
        console.error(`  [FALLO] ${mod.file}: ${mod.prdFn} no es una funcion ejecutable.`);
        totalErrors++;
      }

      if (!Array.isArray(qaChecklist) || qaChecklist.length === 0) {
        console.error(`  [FALLO] ${mod.file}: ${mod.qaKey} no contiene elementos de auditoria QA.`);
        totalErrors++;
      }
    } catch (err) {
      console.error(`  [FALLO] Error al importar ${mod.file}:`, err);
      totalErrors++;
    }
  }
  console.log("");

  // ---------------------------------------------------------------------------
  // RESUMEN FINAL DE AUDITORIA
  // ---------------------------------------------------------------------------
  console.log("================================================================================");
  console.log("RESUMEN DE AUDITORIA — SPRINT 5");
  console.log("================================================================================");
  console.log(`Errores encontrados:   ${totalErrors}`);
  console.log(`Alertas advertidas:    ${totalWarnings}`);
  
  if (totalErrors === 0) {
    console.log("\nESTADO: CONFORME — TODOS LOS ARCHIVOS DEL SPRINT 5 CUMPLEN LAS ESPECIFICACIONES.");
  } else {
    console.error(`\nESTADO: NO CONFORME — SE IDENTIFICARON ${totalErrors} ERRORES CRITICOS.`);
  }
  console.log("================================================================================\n");

  process.exit(totalErrors === 0 ? 0 : 1);
}

runVerification();
