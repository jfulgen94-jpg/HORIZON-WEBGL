/**
 * PROMPTS-CONTABILIDAD.JS — Biblioteca de Prompts Especializados en Contabilidad & ERP
 * Área: Contabilidad & ERP
 * Tareas: Genéricos, C1.1 a C1.6 y Tareas Secundarias
 */

export const CONTABILIDAD_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "con-001",
        title: "Especificación Funcional de Sistema Contable y Arquitectura ERP",
        desc: "Define el alcance del motor contable, partida doble estricta, multimoneda y cierre de ejercicios.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Software ERP y Auditor Contable Senior colegiado con experiencia en SAP y SAGE.
[COPIA AQUI TU IDEA]

Redacta la especificacion funcional completa para este sistema contable y modulo ERP considerando:
1. Principio rector de partida doble inquebrantable: regla contable de que la suma de partidas en el Debe debe ser identica a la suma en el Haber en cada asiento, sin excepcion tecnica.
2. Marco contable de referencia: Plan General de Contabilidad (PGC espanol / PGC PYMES) o NIIF/IFRS segun dimension de la entidad.
3. Estructura de periodos contables: ejercicio fiscal, meses operativos, periodos especiales de apertura, regularizacion y cierre definitivo.
4. Soporte multimoneda con registro obligatorio del tipo de cambio oficial del Banco Central Europeo (BCE) a fecha de operacion y tratamiento de diferencias positivas/negativas de cambio.
5. Inmutabilidad de asientos cerrados: prohibicion de borrado fisico; cualquier correccion debe instrumentarse mediante asiento de rectificacion o anulacion con trazabilidad completa.

Restricciones:
- No utilices modelos simplificados de caja o ingresos/gastos; la contabilidad debe ser formal por devengo.
- Especifica las tablas y claves primarias indispensables para el Libro Diario y Libro Mayor.

Formato de salida: Documento de especificacion tecnica y funcional en Markdown con diagramas de flujo contable.`,
        tags: ["erp", "partida-doble", "pgc", "arquitectura", "especificación"]
      },
      {
        id: "con-002",
        title: "Definición del Plan General Contable y Jerarquía de Cuentas en Árbol",
        desc: "Estructura el cuadro de cuentas jerárquico a 8 dígitos conforme a los 9 grupos del PGC español.",
        model: "DeepSeek V4",
        prompt: `Eres un Experto en Diseno de Sistemas de Informacion Contable y Planificacion Financiera.
[COPIA AQUI TU IDEA]

Disena la estructura del cuadro de cuentas contable adaptado al sector de la empresa:
1. Jerarquia estandar del PGC: Grupo (1 digito), Subgrupo (2 digitos), Cuenta principal (3 digitos), Subcuenta oficial (4 digitos) y Cuentas auxiliares operativas (8 o 10 digitos).
2. Definicion de los 9 grupos del PGC:
   - Grupos de Balance: Grupo 1 (Financiacion basica), Grupo 2 (Activo no corriente), Grupo 3 (Existencias), Grupo 4 (Acreedores y deudores por operaciones comerciales), Grupo 5 (Cuentas financieras).
   - Grupos de Gestion: Grupo 6 (Compras y gastos) y Grupo 7 (Ventas e ingresos).
   - Grupos de Patrimonio Neto: Grupos 8 y 9 para gastos e ingresos imputados al patrimonio neto.
3. Desglose detallado del Grupo 4: estructura de subcuentas para clientes (4300XXXX), proveedores (4000XXXX), Hacienda Publica acreedora/deudora (4750/4700) y Seguridad Social (4760).
4. Parametrizacion de tipos impositivos por subcuenta (asociacion automatica de cuentas de IVA soportado 472 y repercutido 477 con tipos del 21%, 10%, 4% y exento).
5. Reglas de validacion para impedir la creacion de asientos sobre cuentas que no sean de ultimo nivel jerarquico (cuentas auxiliares imputables).

Restricciones:
- Respeta estrictamente la nomenclatura y numeracion oficial del Real Decreto 1514/2007 del PGC.

Formato de salida: Esquema de base de datos relacional y archivo JSON/SQL con la precarga de las cuentas maestras indispensables.`,
        tags: ["cuadro-cuentas", "pgc", "jerarquía", "subcuentas", "iva"]
      },
      {
        id: "con-003",
        title: "Selección de Tech Stack para Motores Contables de Alto Rendimiento",
        desc: "Selecciona el stack tecnológico para procesar millones de apuntes contables con precisión monetaria absoluta.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead Software Engineer especializado en sistemas transaccionales financieros y motores contables.
[COPIA AQUI TU IDEA]

Justifica la seleccion del stack tecnologico para construir el motor contable:
1. Base de datos transaccional: evaluacion de PostgreSQL con soporte estricto de transacciones ACID y tipos de datos 'NUMERIC(15, 2)' / 'DECIMAL' para evitar errores de redondeo de coma flotante.
2. Motor de balanceo y consultas analiticas: evaluacion de DuckDB o ClickHouse para generacion instantanea de Balances de Sumas y Saldos sobre tablas de 10+ millones de apuntes contables.
3. Backend de negocio: FastAPI (Python con Pydantic v2) vs NestJS (Node.js/TypeScript con decoradores de validacion) garantizando latencia < 20 ms por asiento.
4. Mecanismo de bloqueo concurrente (Row-Level Locking) para garantizar que dos usuarios no cierren el mismo periodo o modifiquen la misma subcuenta simultaneamente.
5. Arquitectura Event-Driven (Kafka / RabbitMQ) para sincronizar asientos generados desde facturacion, nominas y TPV hacia el Libro Diario central.

Restricciones:
- Queda totalmente prohibido el uso de tipos de datos 'float' o 'double' para magnitudes monetarias.
- Diseña el esquema para que la consulta de saldo acumulado de una cuenta se calcule en O(1) o O(log n).

Formato de salida: Matriz comparativa de arquitectura tecnica en Markdown con diagrama de flujo transaccional.`,
        tags: ["tech-stack", "postgresql", "acid", "precisión-decimal", "rendimiento"]
      },
      {
        id: "con-004",
        title: "Diseño de Interfaz Contable de Alta Velocidad para Entrada de Asientos",
        desc: "Diseña un entorno ergonómico de introducción rápida de asientos optimizado para uso exclusivo del teclado numérico.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Interfaz UX/UI especializado en software para departamentos de contabilidad y asesorias fiscales.
[COPIA AQUI TU IDEA]

Disena la experiencia de usuario para la pantalla de introduccion de asientos contables en el Libro Diario:
1. Navegacion exclusiva por teclado (cero raton): transicion fluida entre campos (Cuenta, Concepto, Documento, Debe, Haber) mediante 'Tab' y 'Enter', con atajos funcionales (F2 para buscar cuenta, F4 para cuadrar asiento, F10 para guardar).
2. Autocompletado inteligente de cuentas: al teclear los primeros digitos o el nombre comercial del proveedor/cliente, sugerir coincidencias en desplegable instantaneo sin perder el foco.
3. Panel de control de cuadre dinamico: visualizacion permanente de Suma Debe, Suma Haber y Descuadre en tiempo real; el boton de guardar debe estar bloqueado si el descuadre es distinto de 0.00 EUR.
4. Generacion automatica de contrapartidas habituales: si se introduce una cuenta de gasto (Grupo 6) y su base imponible, sugerir automaticamente el calculo de IVA (472) y contrapartida de proveedor (400) en una pulsacion.
5. Modo oscuro de alto contraste (#0D1117) con tipografia monoespaciada (JetBrains Mono / Roboto Mono) para alinear decimales a la perfeccion.

Restricciones:
- La velocidad de respuesta a las pulsaciones del teclado debe ser inmediata (< 10 ms) para no entorpecer mecanografos expertos.

Formato de salida: Guia de diseno de componentes y especificaciones de eventos de teclado en JavaScript/React.`,
        tags: ["ui-contable", "atajos-teclado", "asientos", "ergonomía", "rapidez"]
      },
      {
        id: "con-005",
        title: "Generación de Cuentas Anuales Oficiales y Memoria Económica",
        desc: "Estructura la compilación del Balance de Situación, Cuenta de Pérdidas y Ganancias y Memoria para el Registro Mercantil.",
        model: "GPT-4o",
        prompt: `Eres un Auditor Contable Oficial y Asesor Fiscal preparando el deposito de Cuentas Anuales en el Registro Mercantil.
[COPIA AQUI TU IDEA]

Estructura el documento oficial de Cuentas Anuales a partir de los balances de la sociedad:
1. Balance de Situacion normalizado (Activo no corriente, Activo corriente, Patrimonio Neto, Pasivo no corriente y Pasivo corriente) comparativo con el ejercicio anterior.
2. Cuenta de Perdidas y Ganancias: calculo ordenado del Importe neto de la cifra de negocios, Aprovisionamientos, Gastos de personal, EBITDA, EBIT, Resultado financiero y Resultado antes de impuestos.
3. Estado de Cambios en el Patrimonio Neto (ECPN) y Estado de Flujos de Efectivo (EFE cuando sea legalmente exigible).
4. Indice estructurado de la Memoria Economica conforme al PGC: actividad de la empresa, bases de presentacion, aplicacion de resultados, normas de registro y valoracion, operaciones vinculadas y hechos posteriores al cierre.
5. Certificacion de aprobacion de cuentas por la Junta General de Socios y cuadro de aplicacion del resultado (dividendos, reservas voluntarias, compensacion de perdidas).

Restricciones:
- Cumple rigurosamente el formato oficial normalizado establecido por el Ministerio de Justicia y el Colegio de Registradores.

Formato de salida: Plantilla estructurada en Markdown con tablas contables comparativas N vs N-1 y modelos de texto de la Memoria.`,
        tags: ["cuentas-anuales", "registro-mercantil", "balance", "memoria", "p-y-g"]
      },
      {
        id: "con-031",
        title: "Consolidación de Balances en Grupos Societarios y Eliminación de Partidas Recíprocas",
        desc: "Aplica las normas de consolidación contable (NOFCAC) para eliminar créditos, débitos y resultados internos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor Contable y Especialista en Consolidación de Cuentas Anuales de Grupos Empresariales.
[COPIA AQUI TU IDEA]

Disena el modulo de consolidacion contable segun las Normas para la Formulacion de Cuentas Anuales Consolidadas (NOFCAC / RD 1159/2010):
1. Homogeneizacion temporal, valorativa e interna de los estados contables de las sociedades dependientes.
2. Metodo de Integracion Global para sociedades dominadas: eliminacion de la inversion de la dominante frente a los fondos propios de la dependiente.
3. Tratamiento del Fondo de Comercio de consolidacion o diferencia negativa de consolidacion.
4. Eliminacion de partidas reciprocas intragrupo: saldos deudores y acreedores cruzados (cuentas 430/400 o 551/552).
5. Eliminacion de resultados por operaciones internas de existencias o inmovilizado no realizados frente a terceros ajenos al grupo.

Restricciones:
- Desglosa con exactitud la participacion de socios externos (Socios Minoritarios / Intereses no dominantes).

Formato de salida: Modulo de Python 'consolidation_engine.py' con registro de asientos de ajuste de consolidacion en partida doble.`,
        tags: ["consolidación", "nofcac", "grupos-societarios", "partidas-recíprocas", "fondo-comercio"]
      },
      {
        id: "con-032",
        title: "Tratamiento Contable de Activos Intangibles e I+D según PGC y NIC 38",
        desc: "Establece criterios de activación de gastos de investigación y desarrollo y su plan de amortización a 5 años.",
        model: "DeepSeek V4",
        prompt: `Eres un Controller Financiero y Consultor Contable de Empresas Tecnológicas e I+D.
[COPIA AQUI TU IDEA]

Estructura el protocolo contable de capitalizacion y amortizacion de gastos de Investigacion y Desarrollo segun la Norma de Registro y Valoracion 5ª del PGC:
1. Requisitos preceptivos de activacion de gastos de desarrollo: individualizacion por proyectos, asignacion fiable de costes y rentabilidad economico-comercial justificada.
2. Asiento de activacion de gastos por trabajos realizados por la empresa para su inmovilizado (cuenta 730 a cuenta 201 Desarrollo).
3. Plan de amortizacion sistematica en el plazo maximo de 5 anos desde la finalizacion del proyecto.
4. Dotacion obligatoria de la reserva indisponible por gastos de I+D (articulo 273 de la Ley de Sociedades de Capital).
5. Deteccion de indicios de deterioro (Impairment Test): correccion valorativa irreversible si el proyecto fracasa comercialmente.

Restricciones:
- Los gastos de investigacion pura deben imputarse a resultados del ejercicio en que se incurren (cuenta 620).

Formato de salida: Guia de contabilizacion con ejemplos practicos de asientos contables y notas explicativas para la memoria.`,
        tags: ["i+d", "intangibles", "pgc", "nic-38", "amortización", "activación"]
      }
    ]
  },
  {
    id: "conciliacion-bancaria",
    name: "Conciliación Bancaria y Cuadre de Asientos (C1.1)",
    prompts: [
      {
        id: "con-006",
        title: "Ingesta y Parseo de Extractos Bancarios en Norma 43 (CSB 43) y CAMT.053",
        desc: "Parsea cuadernos bancarios estándar españoles (Norma 43) y europeos (SEPA CAMT.053 XML) extrayendo movimientos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Integracion Bancaria especializado en formatos de intercambio financiero espanoles y SEPA.
[COPIA AQUI TU IDEA]

Desarrolla el parser para procesar archivos de extracto bancario en Norma 43 (Cuaderno 43 de la Asociacion Espanola de Banca):
1. Estructura de registros Norma 43:
   - Registro 11: Cabecera de cuenta (codigo de banco, sucursal, numero de cuenta, fecha inicial, divisa, saldo inicial Debe/Haber).
   - Registro 22: Movimiento principal (fecha de operacion, fecha valor, concepto comun, concepto propio, importe con signo Debe/Haber, numero de documento).
   - Registro 23: Registros complementarios de concepto (hasta 5 lineas con el texto explicativo de la transferencia, beneficiario o referencia).
   - Registro 33: Fin de cuenta (saldo final calculado y numero total de apuntes).
   - Registro 88: Fin de archivo.
2. Validacion de coherencia aritmetica: verificar que Saldo Inicial + Total Abonos - Total Cargos coincide exactamente con el Saldo Final.
3. Soporte dual para extractos modernos SEPA en XML (ISO 20022 formato CAMT.053).
4. Limpieza y normalizacion de cadenas de texto (eliminacion de caracteres de relleno, decodificacion CP850/UTF-8).
5. Exportacion de cada movimiento a un objeto tipado con fecha_operacion, fecha_valor, importe, concepto_completo y referencia_bancaria.

Restricciones:
- No utilices expresiones regulares rigidas para la Norma 43; procesa los campos por posiciones fijas de caracteres segun la norma oficial.

Formato de salida: Codigo completo en Python con la clase 'Norma43Parser' con manejo de excepciones y pruebas con cadenas de ejemplo.`,
        tags: ["norma-43", "csb-43", "camt-053", "extractos-bancarios", "sepa"]
      },
      {
        id: "con-007",
        title: "Algoritmo de Matching Difuso (Fuzzy Matching) entre Banco y Facturas",
        desc: "Empareja movimientos bancarios con facturas pendientes mediante coincidencia de importe, fecha y nombre de contraparte.",
        model: "DeepSeek V4",
        prompt: `Eres un Cientifico de Datos y Desarrollador Cuantitativo construyendo un motor de conciliacion automatica.
[COPIA AQUI TU IDEA]

Disena el algoritmo de emparejamiento inteligente (matching) entre lineas de extracto bancario y facturas pendientes de cobro/pago:
1. Criterios de emparejamiento ponderados (Scoring de Confianza de 0 a 100%):
   - Coincidencia exacta de importe monetario (Peso: 40%).
   - Coincidencia de numero de factura o referencia comercial en el concepto bancario (Peso: 35%).
   - Similitud difusa (Levenshtein / Token Sort Ratio) entre el nombre del emisor del pago y la razon social del cliente/proveedor (Peso: 15%).
   - Proximidad temporal entre la fecha valor del banco y la fecha de vencimiento de la factura (+- 5 dias) (Peso: 10%).
2. Regla de auto-conciliacion automatica: si el score supera el 92%, marcar como conciliado y generar el apunte contable sin intervencion humana.
3. Gestion de emparejamientos 1 a N (un solo pago bancario que liquida 3 facturas simultaneas): algoritmo de suma de subconjuntos (Subset Sum Problem) para resolver pagos agrupados.
4. Cola de revision manual para coincidencias con score entre 60% y 91% mostrando la explicacion de la sugerencia al contable.
5. Aprendizaje por reglas de memoria: si el usuario valida manualmente una asociacion recurrente, almacenar la regla para futuras ocasiones.

Restricciones:
- Optimiza el algoritmo para resolver la conciliacion de 1.000 movimientos contra 5.000 facturas en menos de 3 segundos.

Formato de salida: Modulo de Python con la funcion 'match_bank_transactions(bank_rows, pending_invoices)' y salida estructurada con scores.`,
        tags: ["matching", "fuzzy-matching", "conciliación", "automatización", "algoritmos"]
      },
      {
        id: "con-008",
        title: "Gestión de Discrepancias por Comisiones, TPV y Diferencias de Redondeo",
        desc: "Aísla y contabiliza automáticamente comisiones de cobro con tarjeta, gastos de remesa y céntimos de redondeo.",
        model: "DeepSeek V4",
        prompt: `Eres un Experto Contable resolviendo incidencias complejas de cuadre bancario.
[COPIA AQUI TU IDEA]

Desarrolla la logica para detectar y desglosar discrepancias comunes en la conciliacion bancaria:
1. Liquidacion neta de ventas con tarjeta / pasarelas de pago (TPV / Stripe / PayPal): cuando ingresan en banco un importe neto inferior a la venta por deduccion directa de comision.
   - Accion: identificar la venta bruta, imputar la comision bancaria a la cuenta (6260) 'Servicios bancarios y similares' y cancelar el saldo integro del cliente.
2. Gastos de devolucion de recibos domiciliados: separar el principal devuelto (reactivacion de deuda de cliente) de la comision de devolucion cargada por el banco (6260).
3. Diferencias de redondeo menores a 0.05 EUR: generacion automatica de apunte de ajuste a (659) 'Otras perdidas de gestion corriente' o (759) 'Otros ingresos de gestion corriente'.
4. Retenciones fiscales bancarias sobre liquidaciones de intereses de cuentas corrientes: contabilizacion automatica en (473) 'Hacienda Publica, retenciones y pagos a cuenta'.
5. Asientos multilineales cuadrados al centimo para cada casuistica.

Restricciones:
- Establece umbrales maximos configurables para los ajustes automaticos de redondeo para evitar fugas de control.

Formato de salida: Logica en Python que reciba el movimiento y la factura vinculada, y devuelva la estructura del asiento contable completo en JSON.`,
        tags: ["comisiones-bancarias", "tpv", "redondeo", "cuadre", "asientos"]
      },
      {
        id: "con-009",
        title: "Generación de Informe de Conciliación Bancaria y Partidas Vivas",
        desc: "Crea el estado de conciliación formal acreditando el cuadre entre el saldo contable (572) y el extracto bancario.",
        model: "GPT-4o",
        prompt: `Eres un Auditor Externo preparando la cedula de auditoria de tesoreria y bancos (Area de Tesoreria).
[COPIA AQUI TU IDEA]

Genera el documento formal de Conciliacion Bancaria a fecha de cierre de periodo:
1. Resumen de saldos: Saldo final segun extracto del banco vs Saldo final segun Libro Mayor de la cuenta (5720000X) de la empresa.
2. Seccion A - Partidas registradas en banco y no contabilizadas por la empresa: remesas pendientes de contabilizar, cargos de comisiones o intereses devengados al cierre.
3. Seccion B - Partidas contabilizadas por la empresa y no registradas por el banco: talones o cheques emitidos pendientes de cobro, transferencias emitidas en transito.
4. Demostracion del Saldo Conciliado: Saldo Banco + Partidas B - Partidas A = Saldo Contable ajustado.
5. Relacion nominativa y justificada de Partidas Vivas con antiguedad > 30 dias que requieran provision o intervencion especial.

Restricciones:
- Formato oficial de auditoria financiera apto para revision por auditores externos de Big Four.

Formato de salida: Cedula de conciliacion bancaria estructurada en Markdown con formulas de comprobacion y notas explicativas.`,
        tags: ["informes", "conciliación-bancaria", "cédula-auditoría", "tesorería"]
      },
      {
        id: "con-033",
        title: "Conciliación de Pasarelas de Pago Online (Stripe, Adyen, PayPal) y Comisiones Agregadas",
        desc: "Concilia liquidaciones netas de cobros con tarjeta, disgregando comisiones del intermediario e IVA deducible.",
        model: "DeepSeek V4",
        prompt: `Eres un Contable de Comercio Electrónico y Reconciliador de Pasarelas de Pago Digitales.
[COPIA AQUI TU IDEA]

Construye el motor de conciliacion para liquidaciones periodicas de pasarelas de pago (Stripe, Adyen, PayPal):
1. Ingesta estructurada de reportes de liquidacion (Payouts): importe bruto de ventas, comisiones de procesamiento retenidas (Fees) e importe neto transferido a la cuenta bancaria (572).
2. Propuesta automatica de asiento contable en partida doble:
   - Cargo a 572 (Bancos) por el neto liquidado.
   - Cargo a 626 (Servicios bancarios y similares) por las comisiones de procesamiento.
   - Cargo a 472 (H.P. IVA soportado) en caso de comisiones con IVA facturado.
   - Abono a 430/438 (Clientes o Clientes cobros anticipados) por el importe bruto total de las transacciones.
3. Tratamiento de disputas, contracargos (Chargebacks) y reembolsos emitidos a clientes.
4. Conciliacion de saldos transitorios en cuentas de mediacion (cuenta 558 o subcuenta 572.x virtual).
5. Deteccion de discrepancias temporales entre la fecha de cobro del pedido y la fecha de transferencia del payout.

Restricciones:
- Garantiza que la suma del Debe y el Haber sea exactamente identica al centimo en cada apunte.

Formato de salida: Script de Python 'payment_gateway_reconciler.py' con ingesta de CSV y generacion de asientos listos para ERP.`,
        tags: ["stripe", "pasarelas-pago", "conciliación", "comisiones", "e-commerce"]
      },
      {
        id: "con-034",
        title: "Detección de Partidas Pendientes de Aplicación y Gestión de la Cuenta 555",
        desc: "Identifica y clasifica movimientos bancarios huérfanos sin justificación documental para evitar contingencias fiscales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Jefe de Contabilidad y Auditor Interno de Control de Tesorería.
[COPIA AQUI TU IDEA]

Crea el protocolo de gestion y saneamiento de la cuenta 555 (Partidas pendientes de aplicacion):
1. Regla de uso restrictivo de la cuenta 555: transito provisional maximo de 30 dias para ingresos bancarios de origen no identificado.
2. Algoritmo de emparejamiento difuso (Fuzzy Matching): cruce del importe y fragmentos del concepto bancario contra facturas pendientes de cobro en la cuenta 430.
3. Alertas de caducidad: notificacion al controller si una partida permanece en la 555 mas alla del cierre mensual.
4. Regularizacion contable obligatoria al cierre del ejercicio para evitar contingencias de tributacion por presuncion de rentas no declaradas (Art. 121 LGT).
5. Propuesta de asientos de reclasificacion documentados hacia clientes definitivos o ingresos excepcionales (cuenta 778).

Restricciones:
- Prohibe terminantemente cerrar el ejercicio contable con saldo deudor o acreedor no justificado en la cuenta 555.

Formato de salida: Modulo en Python con detector de partidas huerfanas y cuadro de mando de seguimiento de la cuenta 555.`,
        tags: ["cuenta-555", "conciliación", "tesorería", "control-interno", "auditoría"]
      },
      {
        id: "con-035",
        title: "Ajuste por Diferencias de Cambio en Cuentas Bancarias Multidivisa al Cierre",
        desc: "Calcula y contabiliza diferencias positivas y negativas de cambio en saldos de tesorería denominados en moneda extranjera.",
        model: "GPT-4o",
        prompt: `Eres un Contable Senior Especialista en Operaciones Multidivisa y Normas Internacionales de Contabilidad.
[COPIA AQUI TU IDEA]

Implementa el calculador de diferencias de cambio en cuentas de tesoreria segun la Norma de Registro y Valoracion 11ª del PGC:
1. Ingesta de saldos contables de cuentas de bancos en divisa extranjera (USD, GBP, CHF) al cierre del periodo.
2. Obtencion automatica de los tipos de cambio oficiales de cierre publicados por el Banco Central Europeo (BCE).
3. Valoracion del saldo en moneda funcional (Euros) al tipo de cambio de cierre vs saldo contabilizado en libros.
4. Registro de la diferencia neta:
   - Diferencia negativa: Cargo a la cuenta 668 (Diferencias negativas de cambio) con abono a la cuenta 572.x.
   - Diferencia positiva: Cargo a la cuenta 572.x con abono a la cuenta 768 (Diferencias positivas de cambio).
5. Distincion entre diferencias de cambio realizadas (operaciones liquidadas durante el ano) e irrealizadas (revaluacion de saldos a fin de ano).

Restricciones:
- Aplica el redondeo bancario exacto a 2 decimales para evitar diferencias de redondeo aritmetico.

Formato de salida: Script en Python con conexion a la API del BCE y propuesta de asientos de cierre contable en JSON.`,
        tags: ["multidivisa", "diferencias-cambio", "pgc", "tipo-de-cambio", "cierre-anual"]
      }
    ]
  },
  {
    id: "automatizacion-facturacion",
    name: "Ingesta OCR y Facturación Electrónica (C1.2)",
    prompts: [
      {
        id: "con-010",
        title: "Extracción Estructurada con OCR/Visión de Facturas de Proveedores",
        desc: "Extrae de PDFs y fotos de tickets/facturas: NIF, número, fecha, base imponible, tipo de IVA, retención y total.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Especialista en Document AI y Procesamiento de Documentos Contables Escaneados.
[COPIA AQUI TU IDEA]

Procesa el archivo de factura o ticket de compra y extrae todos los campos contables estructurados:
1. Datos del Emisor / Proveedor: Razon Social, NIF/CIF (con validacion de formato espanol), direccion fiscal y codigo postal.
2. Datos de Factura: Numero de factura legal, Serie, Fecha de emision y Fecha de vencimiento/operacion.
3. Desglose impositivo por tramos: Base Imponible 1, Tipo de IVA 1 (% y cuota), Base Imponible 2, Tipo de IVA 2, recargo de equivalencia si aplica.
4. Retenciones fiscales aplicadas: porcentaje de IRPF (ej: 15% o 7% para profesionales, 19% para alquileres) e importe retenido.
5. Lineas de detalle individuales: descripcion del concepto, cantidad, precio unitario e importe subtotal.
6. Importe Total de la factura y verificacion de cuadre: Base Total + IVA Total - Retencion Total == Total Factura.

Restricciones:
- Si el documento no cuadra aritmeticamente, senalar la discrepancia en un campo 'validation_error' en lugar de forzar los numeros.
- Tolera facturas escaneadas torcidas, con manchas o capturadas con camara de telefono movil.

Formato de salida: Esquema JSON validado con Pydantic con tipado estricto para su consumo directo por el modulo contable.`,
        tags: ["ocr", "facturas", "visión", "extracción", "irpf"]
      },
      {
        id: "con-011",
        title: "Generación y Validación de Facturas en XML FacturaE 3.2.x y UBL",
        desc: "Construye archivos XML conforme al estándar FacturaE español para administraciones públicas (FACe) y B2B.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador Especialista en Facturacion Electronica segun el estandar FacturaE del Ministerio de Hacienda de Espana.
[COPIA AQUI TU IDEA]

Genera el archivo XML conforme al esquema oficial FacturaE version 3.2.2 a partir de los datos de venta:
1. Estructura XML de cabecera con namespaces oficiales ('http://www.facturae.gob.es/formato/Versiones/Facturaev3_2_2.xml').
2. Seccion 'FileHeader': formato del esquema, modalidad (Individual), tipo de factura (Original), divisa (EUR).
3. Seccion 'Parties': datos del emisor (SellerSupplierParty) y receptor (BuyerCustomerParty) con identificacion fiscal NIF/CIF y domicilio.
4. Para administraciones publicas (FACe): inclusion de los centros administrativos de 3 codigos DIR3 obligatorios (Oficina Contable, Organo Gestor, Unidad Tramitadora).
5. Seccion 'Invoices': numero, fecha, periodo de facturacion, desglose de impuestos ('TaxesOutputs'), retenciones si aplican y totales finales.
6. Preparacion del nodo para la firma electronica avanzada XMLDSig segun perfil XAdES-EPES.

Restricciones:
- El archivo debe validar al 100% contra el archivo XSD oficial de FacturaE sin una sola etiqueta fuera de orden o formato erroneo.

Formato de salida: Documento XML FacturaE completo y validable acompanado del script de validacion XSD en Python.`,
        tags: ["facturae", "xml", "face", "dir3", "xades", "factura-electrónica"]
      },
      {
        id: "con-012",
        title: "Adaptación Técnica a los Sistemas VeriFactu y Ley Antifraude",
        desc: "Implementa los requisitos técnicos de la Ley Antifraude española: registros encadenados y códigos QR legibles.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor de Sistemas de Facturacion Acreditado en el reglamento de sistemas informaticos de facturacion (VeriFactu).
[COPIA AQUI TU IDEA]

Disena e implementa la capa de cumplimiento tecnico con el sistema VeriFactu de la Agencia Tributaria espanola:
1. Generacion del Registro de Facturacion de Alta en formato JSON/XML estructurado inmediatamente antes de emitir cada factura.
2. Encadenamiento criptografico de registros: calculo del hash SHA-256 de la factura actual incorporando el hash de la factura inmediatamente anterior (cadena inalterable).
3. Generacion de la firma electronica del registro o inclusion de la marca identificativa de remision voluntaria a la AEAT ('VERI*FACTU').
4. Formateo y generacion del codigo QR oficial con las dimensiones y parametros de URL exigidos por la orden ministerial para cotejo por el receptor.
5. Diseno del registro de eventos del sistema (log de arranque, parada, errores, copias de seguridad) que garantice la inalterabilidad y trazabilidad del software.

Restricciones:
- Cumple rigurosamente con los requisitos del Real Decreto 1007/2023 y la Ley 11/2021 de medidas de prevencion del fraude fiscal.
- Prohibida cualquier funcionalidad de anulacion retroactiva o doble contabilidad.

Formato de salida: Codigo en Python con la clase 'VeriFactuGenerator' que reciba una factura y devuelva el hash encadenado, el payload y el QR generado.`,
        tags: ["verifactu", "ley-antifraude", "aeat", "qr", "hash-encadenado"]
      },
      {
        id: "con-013",
        title: "Pipeline de Contabilización Automática al Libro Diario",
        desc: "Transforma la factura extraída en el asiento contable definitivo asignando cuentas PGC y contrapartidas.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador Contable disenando el motor de contabilizacion automatica en tiempo real.
[COPIA AQUI TU IDEA]

A partir de los datos validados de una factura recibida de compras/gastos, genera el apunte contable completo en el Libro Diario:
1. Determinacion de la cuenta de gasto del Grupo 6 segun la tipologia del proveedor (ej: 6280 Suministros, 6290 Otros servicios, 6230 Servicios profesionales).
2. Calculo y asiento de la cuenta de IVA soportado (47200021 para 21% o correspondiente segun el tipo impositivo).
3. Asiento de la retencion de IRPF si procede en la cuenta (4751) 'HP acreedora por retenciones practicadas' en el Haber.
4. Asiento de la deuda total con el proveedor en la subcuenta correspondiente del Grupo 4 (4000XXXX) en el Haber.
5. Verificacion final de que la suma de partidas en el Debe es exactamente igual al Haber (asiento perfectamente balanceado).

Restricciones:
- Si el NIF del proveedor es nuevo en el sistema, prever la creacion automatica de su ficha auxiliar de cuenta con el numero correlativo libre.

Formato de salida: Objeto JSON con el asiento contable estructurado conteniendo id_asiento, fecha, lineas de apunte [cuenta, concepto, debe, haber] y comprobacion de balance.`,
        tags: ["contabilización", "asientos", "diario", "iva-soportado", "automatización"]
      },
      {
        id: "con-036",
        title: "Validación de Integridad de la Huella Hash Encadenada en Software VeriFactu (RD 1007/2023)",
        desc: "Audita el encadenamiento criptográfico SHA-256 de los registros de facturación según el reglamento técnico de la AEAT.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor de Sistemas Contables y Desarrollador de Cumplimiento Técnico VeriFactu.
[COPIA AQUI TU IDEA]

Disena el verificador de integridad del registro de facturacion encadenado conforme al Real Decreto 1007/2023 (Reglamento VeriFactu):
1. Estructura del registro de alta de factura: NIF emisor, numero de serie, fecha de expedicion, tipo de factura, bases imponibles desagregadas, cuota de IVA, total factura y hash del registro anterior.
2. Calculo del hash encadenado actual: H_N = SHA-256(H_{N-1} + NIF + SerieNumero + Fecha + Total).
3. Auditoria de encadenamiento: comprobacion secuencial de que ningun registro ha sido insertado, modificado o suprimido a posteriori (cero rotura de la cadena criptografica).
4. Generacion del codigo QR tributario estandarizado que acompana a la factura impresa o en PDF.
5. Simulacion del envio del registro al portal de recepcion de la AEAT con obtencion del Codigo Seguro de Verificacion (CSV).

Restricciones:
- El sistema debe rechazar la emision de facturas con fecha anterior al ultimo registro validado para garantizar orden cronologico estricto.

Formato de salida: Modulo de Python 'verifactu_chain_verifier.py' con funciones criptograficas y tests de deteccion de manipulacion.`,
        tags: ["verifactu", "rd-1007-2023", "facturación-electrónica", "sha-256", "aeat", "criptografía"]
      },
      {
        id: "con-037",
        title: "Pipeline de Ingesta XML de FacturaE 3.2.2 y Mapeo Contable de Proveedores",
        desc: "Parsea esquemas XSD de FacturaE, valida firmas electrónicas XAdES y genera propuestas automáticas de asientos de gasto.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Integración de Facturación Electrónica B2B y Formatos Públicos.
[COPIA AQUI TU IDEA]

Crea el parser de ficheros XML conformes a FacturaE version 3.2.2 para automatizar la recepcion de facturas de proveedores:
1. Validacion de esquema XSD contra la especificacion oficial del Ministerio de Asuntos Economicos y Transformacion Digital.
2. Verificacion de la firma electronica avanzada o cualificada XAdES-BES / XAdES-EPES incrustada en el XML.
3. Extraccion de campos clave: Datos del emisor y receptor (CIF/NIF, razon social), numero y serie, fecha de emision y fecha de vencimiento.
4. Desglose detallado de lineas de factura: bases imponibles, tipos de IVA aplicados (21%, 10%, 4%, 0%), recargos de equivalencia y retenciones de IRPF.
5. Mapeo contra la ficha maestra de proveedores del ERP para asignar la subcuenta de gasto correspondiente (600, 628, 629) y subcuenta de acreedor (400x/410x).

Restricciones:
- Si el CIF del proveedor no existe en el maestro, crea una ficha provisional en estado pendiente de validacion fiscal.

Formato de salida: Script de Python utilizando 'lxml' y 'xmlsec' con generacion del asiento contable PGC en JSON estructurado.`,
        tags: ["facturae", "xml", "xades", "proveedores", "asientos-contables", "erp"]
      },
      {
        id: "con-038",
        title: "Tratamiento de Facturas con Inversión del Sujeto Pasivo (Art. 84 LIVA)",
        desc: "Automatiza la autorrepercusión de IVA en operaciones inmobiliarias, chatarra o tecnología sin error en el modelo 303.",
        model: "GPT-4o",
        prompt: `Eres un Asesor Fiscal Especialista en el Impuesto sobre el Valor Añadido y Gestión Contable.
[COPIA AQUI TU IDEA]

Disena el modulo contable para el registro de operaciones sujetas a Inversion del Sujeto Pasivo segun el articulo 84.Uno.2º de la Ley del IVA:
1. Identificacion del supuesto legal de inversion: entregas de oro, chatarra, ejecuciones de obra inmobiliaria o productos electronicos (telefonos moviles, consolas, portatiles por importe > 10.000 €).
2. Verificacion de la factura recibida del proveedor: debe indicar expresamente 'Operacion con inversion del sujeto pasivo' y emitirse sin cuota de IVA.
3. Propuesta de autorrepercusion contable simultanea:
   - Cargo a 472.x (H.P. IVA soportado por inversion del sujeto pasivo).
   - Abono a 477.x (H.P. IVA repercutido por inversion del sujeto pasivo).
   - Efecto financiero neutro en liquidacion ordinaria pero con impacto obligatorio en casillas especificas del Modelo 303.
4. Comprobacion de la regla de prorrata en caso de entidades con deduccion parcial del IVA soportado.
5. Ingestion correcta en el Libro Registro de Facturas Recibidas con la clave de operacion 'I' para el Suministro Inmediato de Informacion (SII).

Restricciones:
- Alerta al usuario si se intenta aplicar inversion del sujeto pasivo a operaciones con clientes particulares finales.

Formato de salida: Modulo de Python con reglas fiscales de decision y asiento de doble partida con cuadre automatico.`,
        tags: ["inversión-sujeto-pasivo", "iva", "art-84-liva", "modelo-303", "sii", "fiscalidad"]
      },
      {
        id: "con-039",
        title: "Auditoría de Retenciones de IRPF en Facturas de Profesionales y Alquileres",
        desc: "Verifica tipos de retención aplicables (15%, 7%, 19%) y cuadre contra cuentas de retenciones (4751) y Modelo 111/115.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Asesor Tributario y Responsable del Área de Retenciones de IRPF y Cuentas Fiscales.
[COPIA AQUI TU IDEA]

Crea el validador contable de retenciones del Impuesto sobre la Renta de las Personas Fisicas en facturas de compras y gastos:
1. Clasificacion del tipo de retencion segun la naturaleza de la operacion:
   - Actividades profesionales generales: 15% (subcuenta 4751.01).
   - Nuevos profesionales autonomos (primeros 3 anos con comunicacion previa): 7% (subcuenta 4751.02).
   - Arrendamiento de inmuebles urbanos: 19% (subcuenta 4751.03 vinculada al Modelo 115).
   - Administradores y miembros del consejo: 35% o 19% segun volumen de facturacion.
2. Calculo matematico estricto: la retencion se aplica exclusivamente sobre la Base Imponible del gasto antes de impuestos indirectos.
3. Asiento de compra propuesto: Cargo a cuenta 623/621 por la base, Cargo a 472 por el IVA, Abono a 4751 por la retencion y Abono a 410 por el liquido a pagar.
4. Cuadre periodico trimestral: la suma de abonos en las subcuentas 4751 debe coincidir exactamente con el importe liquidado en los Modelos 111 y 115 de la AEAT.
5. Generacion de certificados individuales de retenciones anuales para envio masivo a proveedores profesionales.

Restricciones:
- Detecta y alerta si una factura de profesional incluye retencion pero el emisor es una sociedad mercantil (SL/SA) donde no procede retencion de IRPF.

Formato de salida: Validador en Python con base de datos de tipos vigentes y generador de borradores del Modelo 111/115.`,
        tags: ["retenciones", "irpf", "modelo-111", "modelo-115", "profesionales", "alquileres"]
      }
    ]
  },
  {
    id: "analisis-costes",
    name: "Contabilidad Analítica y Costes ABC (C1.3)",
    prompts: [
      {
        id: "con-014",
        title: "Modelado de Contabilidad de Costes por Actividades (Costes ABC)",
        desc: "Estructura centros de coste, actividades primarias/auxiliares y asignación de inductores (Cost Drivers).",
        model: "DeepSeek V4",
        prompt: `Eres un Controller de Gestion y Especialista en Contabilidad Analitica y Metodologia ABC (Activity-Based Costing).
[COPIA AQUI TU IDEA]

Disena la arquitectura de contabilidad analitica para la empresa:
1. Definicion de la estructura de Centros de Coste: centros productivos principales, centros de soporte auxiliar (Mantenimiento, IT, RRHH) y centros corporativos.
2. Identificacion del catalogo de actividades clave de la organizacion (ej: gestion de pedidos, preparacion de maquinaria, atencion posventa).
3. Seleccion y justificacion de los Inductores de Coste (Cost Drivers) para cada actividad (horas-hombre, horas-maquina, numero de lotes, metros cuadrados ocupados).
4. Metodologia de imputacion en dos etapas: primero reparto primario de costes por naturaleza a los centros, seguido de la distribucion secundaria de los centros auxiliares a los principales.
5. Determinacion del coste unitario de cada inductor para imputar el coste indirecto real a cada producto final o servicio comercializado.

Restricciones:
- Evita criterios de reparto arbitrarios o exclusivamente basados en volumen de ventas que distorsionen los costes reales.

Formato de salida: Matriz de costes analiticos en tabla Markdown con diagrama conceptual de reparto y formulas de asignacion.`,
        tags: ["costes-abc", "controller", "cost-drivers", "centros-coste", "analítica"]
      },
      {
        id: "con-015",
        title: "Cálculo del Umbral de Rentabilidad (Punto Muerto / Break-Even Point)",
        desc: "Calcula el volumen mínimo de ventas en unidades y euros para cubrir la totalidad de costes fijos y variables.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor Financiero Estrategico y Experto en Analisis Coste-Volumen-Beneficio (CVB).
[COPIA AQUI TU IDEA]

Calcula y analiza el punto muerto o umbral de rentabilidad para las distintas lineas de negocio de la compania:
1. Clasificacion rigurosa de costes: segregacion precisa entre Costes Fijos totales (alquileres, sueldos fijos, amortizaciones) y Costes Variables unitarios (materia prima, comisiones de venta).
2. Calculo del Margen de Contribucion unitario (Precio de venta - Coste variable unitario) y Ratio de Margen de Contribucion porcentual.
3. Calculo del Punto Muerto en unidades fisicas (Costes Fijos / Margen de Contribucion) y en volumen de facturacion en euros.
4. Extensión a empresas multiproducto: calculo del punto muerto ponderado segun el mix de ventas historico de la empresa.
5. Calculo del Margen de Seguridad: porcentaje de caida que pueden soportar las ventas actuales antes de entrar en zona de perdidas.

Restricciones:
- Incluye el calculo de sensibilidad ante variaciones de costes fijos (+10%) o subidas del precio de venta (+5%).

Formato de salida: Informe financiero en Markdown con formulas explicitas, tabla de resultados y coordenadas para trazar el grafico del punto muerto.`,
        tags: ["punto-muerto", "break-even", "margen-contribución", "rentabilidad"]
      },
      {
        id: "con-016",
        title: "Análisis de Desviaciones Presupuestarias entre Coste Estándar y Coste Real",
        desc: "Descompone desviaciones en materia prima y mano de obra en desviación en precio y desviación en cantidad/eficiencia.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Gestion y Controller de Operaciones Industriales.
[COPIA AQUI TU IDEA]

Analiza las desviaciones producidas entre el presupuesto previsto (coste estandar) y los resultados reales del periodo:
1. Descomposicion de desviaciones en Materiales Directos:
   - Desviacion en Precio: (Precio Real - Precio Estandar) * Cantidad Real Consumida.
   - Desviacion en Cantidad / Eficiencia: (Cantidad Real - Cantidad Estandar) * Precio Estandar.
2. Descomposicion de desviaciones en Mano de Obra Directa:
   - Desviacion en Tarifa / Salario: (Tarifa Real - Tarifa Estandar) * Horas Reales Trabajadas.
   - Desviacion en Rendimiento / Productividad: (Horas Reales - Horas Estandar) * Tarifa Estandar.
3. Descomposicion de Costes Indirectos de Fabricacion (CIF): desviacion en presupuesto, desviacion en capacidad y desviacion en eficiencia.
4. Identificacion de causas operativas subyacentes: subidas de precios de suministros, mermas de produccion, averias de maquinaria o absentismo.
5. Plan de acciones correctoras prioritarias para neutralizar las desviaciones desfavorables en el siguiente trimestre.

Restricciones:
- Cada desviacion debe etiquetarse categoricamente como Favorable (F) o Desfavorable (D) con su signo matematico exacto.

Formato de salida: Tabla de analisis de varianzas estructurada en Markdown con arbol jerarquico de desviaciones.`,
        tags: ["desviaciones", "coste-estándar", "presupuestos", "varianzas", "controller"]
      },
      {
        id: "con-040",
        title: "Asignación de Costes Indirectos mediante el Método de Secciones Homogéneas",
        desc: "Estructura el reparto primario y subreparto secundario de centros auxiliares hacia centros principales de producción.",
        model: "DeepSeek V4",
        prompt: `Eres un Controller de Gestión y Especialista en Contabilidad Analítica Industrial.
[COPIA AQUI TU IDEA]

Implementa el modelo de costes por Secciones Homogeneas para la imputacion de costes indirectos de fabricacion:
1. Definicion del cuadro de centros de coste: Centros Principales (Mecanizado, Montaje, Envasado, Comercial) y Centros Auxiliares (Mantenimiento, Direccion de Fabrica, Suministros).
2. Reparto Primario: distribucion de los costes por naturaleza del grupo 6 PGC hacia cada centro segun criterios directos o claves de reparto.
3. Subreparto Secundario (Liquidacion de centros auxiliares): metodo algebraico de ecuaciones simultaneas para resolver prestaciones reciprocas entre centros auxiliares.
4. Definicion de la Unidad de Obra (UDO) para cada centro principal: horas-maquina, horas-hombre o unidades producidas.
5. Calculo del coste de la unidad de obra y absorcion final en el escandallo de coste unitario del producto terminado.

Restricciones:
- Resuelve exactamente el sistema matricial de prestaciones reciprocas sin truncar decimales intermedios.

Formato de salida: Modulo de Python 'homogeneous_sections_costing.py' con calculo matricial NumPy y cuadro de reparto en tabla Markdown.`,
        tags: ["contabilidad-analítica", "secciones-homogéneas", "costes-indirectos", "escandallo", "industria"]
      },
      {
        id: "con-041",
        title: "Cálculo del Coste de Producción y Valoración de Existencias Finales (FIFO vs CMP)",
        desc: "Valora existencias de materias primas y productos terminados conforme a la norma de valoración 10ª del PGC y NIC 2.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor de Existencias y Analista de Valoración de Inventarios Industriales.
[COPIA AQUI TU IDEA]

Desarrolla el motor de valoracion de inventarios y calculo de variacion de existencias conforme al PGC:
1. Implementacion comparativa de metodos de valoracion autorizados: Coste Medio Ponderado (CMP) y Primera Entrada, Primera Salida (FIFO).
2. Prohibicion expresa del metodo LIFO segun el PGC y NIIF.
3. Desglose del coste de produccion: precio de adquisicion de materias primas consumidas + costes directamente imputables (mano de obra directa) + fraccion razonable de costes indirectos de fabricacion.
4. Regla de valoracion al cierre: las existencias se valoran al menor entre el Coste de Produccion y el Valor Neto Realizable (VNR).
5. Asiento de variacion de existencias a fin de ano: regularizacion de existencias iniciales y finales (subgrupo 30 contra subgrupo 61/71) y dotacion de provision por deterioro (cuenta 693 a 390).

Restricciones:
- Excluye del coste de produccion los costes de almacenamiento posterior, costes de subactividad por paradas de fabrica y gastos generales de administracion.

Formato de salida: Script en Python con clase 'InventoryValuationEngine' que gestione kardex de movimientos y genere asientos PGC.`,
        tags: ["inventarios", "fifo", "cmp", "existencias", "valor-neto-realizable", "pgc"]
      },
      {
        id: "con-042",
        title: "Análisis de Márgenes de Contribución y Punto Muerto por Línea de Producto",
        desc: "Calcula el umbral de rentabilidad (Break-Even) y el margen de seguridad para decisiones de fijación de precios y cierre.",
        model: "GPT-4o",
        prompt: `Eres un Asesor de Finanzas Corporativas y Planificación Estratégica de Precios.
[COPIA AQUI TU IDEA]

Crea la herramienta analitica de punto muerto (Break-Even Point) y margenes de contribucion multi-producto:
1. Segregacion estricta entre Costes Fijos Totales (CFT) y Costes Variables Unitarios (CVU) de cada linea de negocio.
2. Calculo del Margen de Contribucion Unitario (MCU = Precio - CVU) y Ratio de Margen de Contribucion (%MC = MCU / Precio).
3. Determinacion del Punto Muerto global en unidades fisicas y cifra de negocios monetaria ponderando el mix de ventas de la empresa.
4. Calculo del Margen de Seguridad: porcentaje en que pueden caer las ventas actuales antes de que la compania entre en perdidas operativas.
5. Analisis de decision sobre pedidos especiales a precio reducido: evaluacion de si el precio ofrecido cubre el coste marginal y aporta al margen de contribucion global.

Restricciones:
- No asumas linealidad absoluta de costes fijos ante cambios sustanciales de capacidad instalada (analiza costes escalonados).

Formato de salida: Modulo de Python con funciones de analisis de sensibilidad de precios y visualizacion del grafico de punto muerto en Plotly.`,
        tags: ["punto-muerto", "break-even", "margen-contribución", "costes-fijos", "pricing"]
      }
    ]
  },
  {
    id: "cumplimiento-tributario",
    name: "Cumplimiento Tributario y Modelos Fiscales (C1.4)",
    prompts: [
      {
        id: "con-017",
        title: "Autómata de Liquidación Trimestral de IVA (Modelo 303 y 390)",
        desc: "Calcula y valida las casillas oficiales del Modelo 303 de IVA a partir de los libros registro de facturas.",
        model: "DeepSeek V4",
        prompt: `Eres un Asesor Fiscal Especialista en Tributacion Indirecta y Procedimientos Tributarios ante la AEAT.
[COPIA AQUI TU IDEA]

A partir de los libros registro de facturas emitidas y recibidas del trimestre, calcula la liquidacion del Modelo 303 de IVA:
1. IVA Devengado (Ventas e ingresos): desglose de Bases Imponibles, Tipos (21%, 10%, 4%) y Cuotas devengadas correspondientes (casillas 01 a 09).
2. Modificaciones de bases y cuotas: rectificativas de facturas y declaraciones de concurso de acreedores.
3. IVA Deducible (Compras y gastos): separacion de operaciones interiores corrientes, bienes de inversion e importaciones (casillas 28 a 41).
4. Aplicacion de la regla de prorrata de IVA (general o especial) en caso de que la sociedad realice actividades exentas y no exentas.
5. Calculo del Resultado de la autoliquidacion (casilla 46 y posteriores): compensacion de saldos negativos de trimestres anteriores y resultado final a ingresar o a devolver.

Restricciones:
- Utiliza la numeracion exacta de casillas del modelo oficial 303 de la Agencia Estatal de Administracion Tributaria.

Formato de salida: Borrador estructurado de la declaracion tributaria en Markdown con desglose de casillas y validacion cruzada.`,
        tags: ["modelo-303", "iva", "aeat", "fiscalidad", "prorrata"]
      },
      {
        id: "con-018",
        title: "Integración con el Suministro Inmediato de Información (SII de la AEAT)",
        desc: "Genera mensajes SOAP/XML para remitir libros de facturas a la sede electrónica de la AEAT en menos de 4 días.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Software Tributario especializado en integraciones con los servicios web SOAP del SII de la AEAT.
[COPIA AQUI TU IDEA]

Disena e implementa el modulo de envio de facturas al Suministro Inmediato de Informacion (SII):
1. Construccion del sobre SOAP con los esquemas XML oficiales de la AEAT ('SuministroLRFacturasEmitidas' y 'SuministroLRFacturasRecibidas').
2. Gestion de plazos legales perentorios: envio en el plazo maximo de 4 dias naturales desde la emision o fecha de registro contable.
3. Configuracion de la autenticacion mutua TLS con certificado electronico cualificado de representante de persona juridica.
4. Identificacion de claves de regimen especial: '01' Operacion de regimen general, '02' Exportacion, '08' Operaciones de arrendamiento de locales.
5. Parseo de la respuesta de la AEAT: tratamiento de estados 'Correcto', 'AceptadoConErrores' y 'Incorrecto', extrayendo codigos de error para subsanacion.

Restricciones:
- Implementa un registro de auditoria de cada XML enviado y su CSV (Codigo Seguro de Verificacion) devuelto por la Agencia Tributaria.

Formato de salida: Codigo en Python con cliente Zeep o HTTP nativo con certificado digital listo para comunicarse con el entorno de pruebas de la AEAT.`,
        tags: ["sii", "aeat", "soap", "facturas-emitidas", "inmediato"]
      },
      {
        id: "con-019",
        title: "Liquidación de Retenciones de IRPF (Modelos 111 y 115)",
        desc: "Liquida trimestralmente las retenciones de personal/profesionales (Modelo 111) y arrendamiento de inmuebles (Modelo 115).",
        model: "DeepSeek V4",
        prompt: `Eres un Gestor Fiscal y Laboral preparando las declaraciones periodicas de retenciones tributarias.
[COPIA AQUI TU IDEA]

Calcula las declaraciones de retenciones del trimestre a partir de los datos contables:
1. Modelo 111 (Retenciones de rendimientos del trabajo y actividades economicas):
   - Rendimientos del trabajo: numero de perceptores, importe total de retribuciones dinerarias y retenciones practicadas en nominas.
   - Rendimientos de actividades profesionales: honorarios facturados por autonomos/profesionales y retencion aplicada (15% o 7%).
   - Rendimientos de premios o ganancias patrimoniales si aplican.
2. Modelo 115 (Retenciones sobre alquileres de inmuebles urbanos):
   - Numero de arrendadores, base total satisfecha por arrendamiento de oficinas/naves y retencion del 19% practicada.
3. Verificacion de concordancia contable: comprobar que los importes coinciden exactamente con los saldos de las cuentas (4751) del Libro Mayor.
4. Generacion de alertas ante facturas de profesionales que hayan omitido la retencion legal obligatoria.

Restricciones:
- Aplica los tipos de retencion oficiales vigentes segun la Ley del Impuesto sobre la Renta de las Personas Fisicas.

Formato de salida: Resumen ejecutivo de las declaraciones tributarias con cuadros de liquidacion y casillas oficiales.`,
        tags: ["modelo-111", "modelo-115", "irpf", "retenciones", "fiscal"]
      },
      {
        id: "con-043",
        title: "Cuadre y Conciliación del Modelo 303 de IVA frente al Libro Registro y Cuenta de Pérdidas y Ganancias",
        desc: "Verifica que las bases imponibles del IVA coincidan con la facturación contable y concilia discrepancias temporales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Inspector de Tributos en Excedencia y Consultor de Auditoría Fiscal Preventiva.
[COPIA AQUI TU IDEA]

Construye el motor de conciliacion fiscal entre la contabilidad formal y las autoliquidaciones del Modelo 303 de IVA:
1. Agregacion de bases imponibles y cuotas devengadas en las autoliquidaciones trimestrales del Modelo 303 (casillas 01 a 27).
2. Cruce contra los ingresos computados en el grupo 7 del PGC (Cifra Neta de Negocios y otros ingresos de gestion).
3. Identificacion y justificacion de discrepancias legitimas entre base imponible del IVA e ingresos contables: operaciones exentas de IVA, autoconsumos, indemnizaciones, provisiones y facturas rectificativas de ejercicios previos.
4. Conciliacion de bases y cuotas de IVA deducible soportado (casillas 28 a 45) frente a los gastos del grupo 6 y adquisiciones de inmovilizado (grupo 2).
5. Comprobacion del resultado a compensar en periodos posteriores o a devolver en la declaracion del cuarto trimestre.

Restricciones:
- Toda discrepancia no explicada superior al 1% debe generar una bandera roja de riesgo de requerimiento de la Agencia Tributaria.

Formato de salida: Informe de conciliacion fiscal en Markdown con tabla comparativa casilla a casilla y borrador de contestacion a requerimientos preventivos.`,
        tags: ["modelo-303", "iva", "conciliación-fiscal", "aeat", "cifra-de-negocios", "auditoría-fiscal"]
      },
      {
        id: "con-044",
        title: "Cálculo de la Regla de Prorrata Especial y Regularización de Bienes de Inversión",
        desc: "Calcula deducciones de IVA en actividades diferenciadas y regulariza cuotas en bienes de inversión durante 5 y 10 años.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista Tributario en Sectores Diferenciados y Deducción Proporcional de IVA.
[COPIA AQUI TU IDEA]

Implementa el calculador de deduccion de IVA mediante Prorrata General, Prorrata Especial y regularizacion de bienes de inversion:
1. Calculo de la Prorrata General: Porcentaje de deduccion redondeado al entero superior inmediato P = (Operaciones con derecho a deduccion / Volumen total de operaciones) * 100.
2. Aplicacion de la Prorrata Especial (obligatoria si la prorrata general excede en mas de un 10% a la especial): deduccion integra en gastos exclusivos del sector con derecho, cero deduccion en sectores exentos y prorrata en gastos comunes.
3. Regularizacion en la declaracion del 4º trimestre de la diferencia entre la prorrata provisional y la definitiva calculada al cierre anual.
4. Regularizacion de bienes de inversion (periodo de 5 anos para muebles y 10 anos para inmuebles): calculo de la variacion si la prorrata del ano difiere en mas de 10 puntos de la del ano de adquisicion.
5. Asientos contables de regularizacion: ajuste de IVA soportado contra gasto (cuenta 6341) o ingreso (cuenta 734) por regularizacion de bienes de inversion.

Restricciones:
- Excluye del denominador del calculo de la prorrata las operaciones financieras accesorias y las ventas de bienes de inversion.

Formato de salida: Modulo en Python 'vat_prorrata_calculator.py' con generacion automatica de asientos contables de regularizacion.`,
        tags: ["prorrata", "prorrata-especial", "iva", "bienes-inversión", "sectores-diferenciados"]
      },
      {
        id: "con-045",
        title: "Determinación de Ajustes Extracontables en el Impuesto sobre Sociedades (Modelo 200)",
        desc: "Calcula diferencias permanentes y temporarias entre el resultado contable del PGC y la base imponible de la LIS.",
        model: "GPT-4o",
        prompt: `Eres un Asesor Fiscal Senior Especialista en Liquidación del Impuesto sobre Sociedades.
[COPIA AQUI TU IDEA]

Crea el calculador de ajustes extracontables para la determinacion de la Base Imponible del Impuesto sobre Sociedades (Ley 27/2014 LIS):
1. Punto de partida: Resultado Contable antes de impuestos de la Cuenta de Perdidas y Ganancias del ejercicio.
2. Diferencias Permanentes:
   - Ajustes positivos: Gastos no deducibles (multas, sanciones penales/administrativas, liberalidades y donativos que no sean relaciones publicas ordinarias).
   - Ajustes negativos: Exencion sobre dividendos y plusvalias de participaciones significativas (Art. 21 LIS).
3. Diferencias Temporarias con efecto impositivo diferido:
   - Ajustes temporarios positivos: Amortizaciones contables superiores a las tablas oficiales, provisiones por deterioros no deducibles hasta su perdida efectiva.
   - Ajustes temporarios negativos: Libertad de amortizacion para empresas de reducida dimension (ERD).
4. Contabilizacion del impuesto corriente e impuesto diferido: Activos por diferencias temporarias deducibles (cuenta 4740) y Pasivos por diferencias temporarias imponibles (cuenta 479).
5. Compensacion de Bases Imponibles Negativas (BINs) de ejercicios anteriores respetando el limite del 70% de la base previa o el umbral minimo de 1 millon de euros.

Restricciones:
- Comprueba la limitacion de deducibilidad de gastos financieros netos (maximo 30% del EBITDA operativo o 1 millon de euros).

Formato de salida: Modulo de Python con hoja de trabajo de conciliacion fiscal del Modelo 200 y generacion de asientos del impuesto sobre beneficios.`,
        tags: ["impuesto-sociedades", "modelo-200", "ajustes-extracontables", "lis", "bins", "diferencias-temporarias"]
      },
      {
        id: "con-046",
        title: "Validación de Libros Registro para el Suministro Inmediato de Información (SII)",
        desc: "Comprueba claves de régimen especial, plazos máximos de 4 días naturales y esquemas XML para envío a la AEAT.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Desarrollador de Integraciones Telemáticas con la Agencia Tributaria y Especialista en el SII.
[COPIA AQUI TU IDEA]

Disena el validador y emisor de registros para el Suministro Inmediato de Informacion del IVA (SII de la AEAT):
1. Estructura de los 4 libros registro obligatorios: Facturas Emitidas, Facturas Recibidas, Bienes de Inversion y Determinadas Operaciones Intracomunitarias.
2. Control estricto de plazos legales: plazo maximo de 4 dias naturales (excluyendo sabados, domingos y festivos nacionales) desde la emision de la factura o desde el registro contable en recibidas.
3. Asignacion precisa de claves de regimen especial: Clave 01 (Operacion general), 02 (Exportacion), 07 (Criterio de caja), 08 (Bienes usados / REBU), 14 (Factura con IVA pendiente de devengo en certificaciones de obra).
4. Verificacion de identificadores fiscales extranjeros: formato NIF-IVA con validacion previa contra el censo VIES de la Comision Europea.
5. Gestion de respuestas SOAP de la AEAT: tratamiento de estados 'Correcto', 'Aceptado con Errores' (con indicacion del codigo de error para subsanacion) o 'Incorrecto'.

Restricciones:
- Implementa alertas de caducidad cuando una factura recibida lleve mas de 48 horas sin enviar al SII para evitar sanciones del 0.5% del importe.

Formato de salida: Modulo en Python con cliente SOAP, validador de esquemas XSD oficiales y log de envios exitosos en DuckDB.`,
        tags: ["sii", "aeat", "iva", "suministro-inmediato", "vies", "libros-registro"]
      }
    ]
  },
  {
    id: "dashboard-financiero",
    name: "Cuadro de Mando Contable y Ratios (C1.5)",
    prompts: [
      {
        id: "con-020",
        title: "Cálculo de Ratios de Solvencia, Liquidez Ácida y Fondo de Maniobra",
        desc: "Calcula ratios financieros clave a partir del Balance de Situación diagnosticando la salud financiera.",
        model: "DeepSeek V4",
        prompt: `Eres un Analista Financiero Corporativo y Director Financiero (CFO) evaluando la posicion patrimonial de la empresa.
[COPIA AQUI TU IDEA]

Calcula y diagnostica la bateria de ratios de solvencia y liquidez a partir del balance contable:
1. Fondo de Maniobra (Working Capital): Activo Corriente - Pasivo Corriente (evaluacion de si es positivo y suficiente).
2. Ratio de Liquidez General (Current Ratio): Activo Corriente / Pasivo Corriente (rango optimo: 1.5 - 2.0).
3. Prueba Acida (Acid Test / Quick Ratio): (Activo Corriente - Existencias) / Pasivo Corriente (evaluacion de liquidez inmediata).
4. Ratio de Disponibilidad Inmediata (Cash Ratio): Efectivo y equivalentes / Pasivo Corriente.
5. Ratio de Endeudamiento y Apalancamiento: Pasivo Total / Patrimonio Neto y Deuda Financiera Neta / EBITDA.
6. Diagnostico ejecutivo: calificacion de la empresa en situacion de equilibrio financiero, tension de liquidez o desequilibrio estructural.

Restricciones:
- Define con precision los valores normativos de referencia e interpreta las desviaciones segun el sector de actividad.

Formato de salida: Informe financiero en Markdown con tabla de ratios, interpretacion semaforizada y recomendaciones operativas.`,
        tags: ["ratios", "fondo-maniobra", "liquidez", "solvencia", "cfo"]
      },
      {
        id: "con-021",
        title: "Monitoreo del Período Medio de Cobro (PMC) y Control de Morosidad",
        desc: "Calcula los días medios de cobro a clientes y pago a proveedores según la Ley de Lucha contra la Morosidad.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Credit Manager y Tesorero Corporativo vigilando los flujos de cobro y cumplimiento de la Ley de Morosidad.
[COPIA AQUI TU IDEA]

Implementa el analisis del periodo medio de maduracion financiero y control de plazos comerciales:
1. Calculo del Periodo Medio de Cobro (PMC): (Saldo medio de Clientes 430 / Ventas Netas con IVA) * 365 dias.
2. Calculo del Periodo Medio de Pago (PMP): (Saldo medio de Proveedores 400 / Compras Netas con IVA) * 365 dias.
3. Evaluacion del cumplimiento de la Ley 15/2010 de Lucha contra la Morosidad (plazo maximo legal de pago a proveedores de 60 dias).
4. Antiguedad de la deuda comercial (Aging Report): segmentacion de saldos vivos de clientes en tramos temporales (al corriente, 1-30 dias, 31-60 dias, 61-90 dias, > 90 dias).
5. Estimacion del calculo de provision por insolvencias o perdidas por deterioro de creditos comerciales segun criterios del PGC.

Restricciones:
- Incorpora la plantilla obligatoria de informacion sobre el PMP que debe incluirse en la Memoria de las Cuentas Anuales.

Formato de salida: Panel de gestion de cobros y pagos en Markdown con tabla de aging y alertas de morosidad.`,
        tags: ["pmc", "pmp", "morosidad", "aging-report", "clientes"]
      },
      {
        id: "con-022",
        title: "Previsión Rodante de Tesorería a 13 Semanas (Rolling Cash Flow Forecast)",
        desc: "Modela la liquidez proyectada semana a semana anticipando necesidades de financiación o excedentes.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Gestion de Tesoreria Corporativa disenando el modelo de Cash Flow a 13 semanas (13-Week Cash Forecast).
[COPIA AQUI TU IDEA]

Construye la hoja de proyeccion de tesoreria rodante a 13 semanas vista:
1. Saldo de liquidez inicial al comienzo de cada semana (cuentas corrientes + polizas de credito disponibles).
2. Entradas operativas proyectadas: cobros previstos de clientes categorizados segun probabilidad de cobro real (ponderando el historico de retrasos).
3. Salidas operativas programadas: pagos comprometidos a proveedores, liquidacion de nominas y seguros sociales, impuestos trimestrales y suministros.
4. Salidas financieras y de inversion: vencimientos de cuotas de prestamos (amortizacion de principal e intereses) e inversiones de capital (CAPEX).
5. Posicion neta final semanal: determinacion del colchon minimo de seguridad y deteccion anticipada de semanas con deficit de tesoreria para activar lineas de credito.

Restricciones:
- No utilices estimaciones contables de devengo; el cash flow debe ser estrictamente de caja real (cobros y pagos efectivos).

Formato de salida: Modelo financiero tabular en Markdown estructurado en 13 columnas semanales con alertas de liquidez.`,
        tags: ["tesorería", "cash-flow", "previsión", "13-semanas", "liquidez"]
      },
      {
        id: "con-047",
        title: "Cálculo Dinámico del Estado de Flujos de Efectivo (EFE) por el Método Indirecto",
        desc: "Concilia el resultado contable con la caja operativa real, inversión y financiación según el modelo del PGC.",
        model: "DeepSeek V4",
        prompt: `Eres un Director Financiero (CFO) y Experto en Análisis de Liquidez y Cash Flow Empresarial.
[COPIA AQUI TU IDEA]

Desarrolla el motor de computo automatico del Estado de Flujos de Efectivo (EFE) mediante el metodo indirecto conforme al PGC:
1. Flujos de Efectivo de las Actividades de Explotacion:
   - Resultado del ejercicio antes de impuestos.
   - Ajustes al resultado: amortizaciones (+), variacion de provisiones, perdidas/ganancias por enajenacion de inmovilizado e ingresos/gastos financieros.
   - Cambios en el capital corriente (NOF): variacion de existencias, deudores comerciales y acreedores comerciales.
   - Pagos por intereses, cobros de dividendos y pagos por impuesto sobre beneficios.
2. Flujos de Efectivo de las Actividades de Inversion: pagos por adquisicion de inmovilizado material, intangible e inversiones financieras vs cobros por desinversiones.
3. Flujos de Efectivo de las Actividades de Financiacion: cobros por emision de instrumentos de patrimonio, cobros/pagos por pasivos financieros (deuda bancaria) y pago de dividendos a socios.
4. Conciliacion final: Aumento/disminucion neta del efectivo y equivalentes en el ejercicio + Efectivo al inicio = Efectivo al final.
5. Deteccion de discrepancias donde el beneficio contable difiera radicalmente de la generacion de caja operativa (alerta de 'quiebra por beneficio').

Restricciones:
- Requiere el balance de situacion comparativo de dos ejercicios cerrados y la cuenta de perdidas y ganancias del ultimo ejercicio.

Formato de salida: Modulo de Python 'cash_flow_statement_efe.py' con presentacion del informe formal en tabla Markdown.`,
        tags: ["efe", "flujos-de-efectivo", "cash-flow", "pgc", "cfo", "liquidez"]
      },
      {
        id: "con-048",
        title: "Desglose de la Rentabilidad Financiera con el Árbol DuPont de 5 Factores",
        desc: "Descompone el ROE en margen operativo, rotación de activos, apalancamiento, efecto fiscal y carga financiera.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Analista Financiero Cuantitativo y Asesor de Valoración de Empresas.
[COPIA AQUI TU IDEA]

Implementa el modelo analitico del Arbol DuPont ampliado de 5 factores para explicar la evolucion de la Rentabilidad Financiera (ROE):
1. Formulacion matematica formal de la identidad DuPont de 5 componentes:
   - Margen Operativo EBIT: EBIT / Ventas (eficiencia operativa)
   - Rotacion de Activos Totales: Ventas / Activos Totales (eficiencia en el uso de activos)
   - Carga de Intereses: EBT / EBIT (impacto de los gastos financieros)
   - Carga Fiscal / Efecto Impuestos: Beneficio Neto / EBT (presion fiscal efectiva)
   - Apalancamiento Financiero: Activos Totales / Fondos Propios (estructura de capital)
2. Verificacion de la igualdad: ROE = Margen EBIT * Rotacion Activos * Carga Intereses * Carga Fiscal * Apalancamiento.
3. Descomposicion temporal entre dos ejercicios fiscales identificando cual de los 5 factores impulso o destruyo la rentabilidad para el accionista.
4. Comparativa sectorial frente a empresas de la misma actividad economica (CNAE).
5. Visualizacion grafica jerarquica interactiva en formato arbol de descomposicion.

Restricciones:
- Ajusta los Fondos Propios deduciendo dividendos a cuenta acordados para reflejar el capital propio efectivo en riesgo.

Formato de salida: Script en Python con calculos normalizados, graficos con Plotly y reporte ejecutivo de diagnostico.`,
        tags: ["dupont", "roe", "rentabilidad-financiera", "análisis-financiero", "ratios"]
      },
      {
        id: "con-049",
        title: "Modelado del Período Medio de Maduración (PMM) y Días de Fondo de Maniobra",
        desc: "Calcula el ciclo de conversión de efectivo en días de aprovisionamiento, fabricación, cobro y pago a proveedores.",
        model: "GPT-4o",
        prompt: `Eres un Consultor de Gestión de Capital Circulante y Optimización de Tesorería (Working Capital).
[COPIA AQUI TU IDEA]

Desarrolla el calculador del Periodo Medio de Maduracion Economico y Financiero para empresas industriales y comerciales:
1. Subperiodos del Ciclo Operativo (Periodo Medio de Maduracion Economico):
   - Periodo medio de almacenamiento de materias primas (PMA en dias)
   - Periodo medio de fabricacion / transformacion (PMF en dias)
   - Periodo medio de venta de productos terminados (PMV en dias)
   - Periodo medio de cobro a clientes (PMC en dias = Saldo medio clientes / Ventas diarias)
2. Subperiodo de financiacion espontanea:
   - Periodo medio de pago a proveedores (PMP en dias = Saldo medio proveedores / Compras diarias)
3. Calculo del Periodo Medio de Maduracion Financiero / Ciclo de Conversion de Efectivo: PMM_Financiero = PMA + PMF + PMV + PMC - PMP.
4. Cuantificacion de las Necesidades Operativas de Fondos (NOF) derivadas del PMM y comparativa frente al Fondo de Maniobra (FM).
5. Simulacion de escenarios de optimizacion de tesoreria: cuanto capital de circulante se libera reduciendo el PMC en 10 dias y aumentando el PMP en 15 dias.

Restricciones:
- Documenta las normas legales sobre plazos maximos de pago segun la Ley 15/2010 contra la morosidad comercial (limite general 60 dias).

Formato de salida: Modulo de Python 'working_capital_pmm.py' con generacion de informe analitico y diagrama temporal en Mermaid.`,
        tags: ["pmm", "working-capital", "fondo-de-maniobra", "plazo-pago", "ciclo-de-caja", "nof"]
      }
    ]
  },
  {
    id: "auditoria-contable",
    name: "Auditoría Contable y Detección de Anomalías (C1.6)",
    prompts: [
      {
        id: "con-023",
        title: "Aplicación de la Ley de Benford para Detección de Fraude en Facturas",
        desc: "Comprueba si la distribución del primer dígito de los importes contables sigue la distribución logarítmica natural.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor Forense y Experto en Analisis Estadistico Aplicado a la Deteccion de Fraude Contable.
[COPIA AQUI TU IDEA]

Aplica el test estadistico de la Ley de Benford sobre la base de datos de facturas y apuntes contables:
1. Teoria de Benford: la probabilidad teorica de que un numero comience por el digito D (de 1 a 9) responde a P(D) = log10(1 + 1/D).
2. Extraccion del primer digito significativo de todos los importes de gastos y facturas del ejercicio analizado.
3. Calculo de la distribucion observada vs distribucion teorica esperada.
4. Aplicacion del test estadistico de Chi-cuadrado (Chi-Square Goodness-of-Fit) y distancia MAD (Mean Absolute Deviation) para medir la distorsion.
5. Identificacion de anomalias: si un digito especifico (ej: el 4 o el 9) aparece con una frecuencia significativamente superior a la esperada, aislar dichos apuntes para investigacion manual por sospecha de fraccionamiento de contratos o facturacion ficticia.

Restricciones:
- Aplica el filtro unicamente sobre poblaciones de datos numericos validos segun la literatura (minimo 500 apuntes no restringidos por importes fijos como tarifas normadas).

Formato de salida: Script de Python completo que procese el DataFrame de facturas, calcule los estadisticos y genere un grafico de desviacion respecto a Benford.`,
        tags: ["benford", "fraude", "auditoría-forense", "estadística", "anomalías"]
      },
      {
        id: "con-024",
        title: "Detección de Pagos Duplicados y Proveedores Ficticios",
        desc: "Audita el registro de compras identificando pagos dobles accidentales o facturas idénticas con números alterados.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Control Interno verificando los procesos de Compras y Cuentas a Pagar (Procure-to-Pay).
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de barrido para detectar pagos duplicados e inconsistencias graves en proveedores:
1. Deteccion de duplicidades exactas: misma subcuenta de proveedor, mismo importe exacto y misma fecha (+- 3 dias).
2. Deteccion de duplicidades ocultas con numero de factura alterado (ej: factura 'F-2024-01' y 'F2024/01' o espacios intermedios).
3. Deteccion de facturas con importes sospechosamente redondeados (ej: exactamente 3.000,00 EUR) o justo por debajo de los umbrales de aprobacion de compra (ej: 4.990 EUR para limite de 5.000 EUR).
4. Analisis de proveedores con volumen anomalo: alta de proveedor reciente con recepcion inmediata de multiples facturas de elevado importe.
5. Coincidencia de datos bancarios: detectar si dos proveedores con distinto CIF comparten la misma cuenta corriente IBAN de destino de pago.

Restricciones:
- El algoritmo debe clasificar cada hallazgo en una escala de probabilidad de duplicidad con su explicacion analitica.

Formato de salida: Codigo en Python con Polars/Pandas que devuelva la lista de operaciones sospechosas ordenadas por riesgo economico.`,
        tags: ["duplicados", "control-interno", "proveedores", "pagos", "fraude"]
      },
      {
        id: "con-025",
        title: "Auditoría de Corte de Operaciones (Cut-Off) y Periodificación al Cierre",
        desc: "Verifica que los ingresos y gastos se imputan estrictamente al ejercicio de devengo correcto.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor Financiero realizando las pruebas de corte de operaciones (Cut-Off) en el cierre de ejercicio contable.
[COPIA AQUI TU IDEA]

Disena las pruebas de auditoria sustantivas para garantizar el cumplimiento del principio de devengo:
1. Analisis de facturas emitidas y albaranes de entrega en la ventana critica: ultimos 15 dias de diciembre y primeros 15 dias de enero.
2. Comprobacion de que las ventas contabilizadas en diciembre corresponden a bienes efectivamente entregados o servicios prestados antes del 31 de diciembre.
3. Revision de las facturas de proveedores registradas en enero para identificar gastos devengados en el ejercicio anterior que requieran apunte de 'Facturas pendientes de recibir' (cuenta 4009 / 4109).
4. Auditoria de las cuentas de periodificacion: gastos anticipados (480) e ingresos anticipados (485) (ej: polizas de seguros anuales pagadas en octubre que cubren 9 meses del ejercicio siguiente).
5. Propuesta de asientos de ajuste contable para reclasificar o periodificar las operaciones desfasadas.

Restricciones:
- Se estricto en la aplicacion del principio de devengo frente al criterio de caja segun el Marco Conceptual del PGC.

Formato de salida: Papel de trabajo de auditoria en Markdown con tabla de operaciones muestreadas y propuesta de ajustes.`,
        tags: ["cut-off", "devengo", "cierre-contable", "periodificación", "auditoría"]
      },
      {
        id: "con-050",
        title: "Test de Estrés de la Ley de Benford sobre Primeros y Segundos Dígitos en Cuentas de Gasto",
        desc: "Aplica tests de chi-cuadrado y desviación absoluta media (MAD) para identificar manipulación artificial de importes.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor Forense Inscrito en el ROAC Especialista en Detección de Fraude Financiero.
[COPIA AQUI TU IDEA]

Implementa el analisis estadistico avanzado de la Ley de Benford sobre el Libro Diario completo de una organizacion:
1. Ingesta de todas las lineas de diario con importes de gasto (cuentas de los grupos 62, 60 y 68).
2. Extraccion del primer digito significativo (1 al 9), segundo digito (0 al 9) y de los dos primeros digitos combinados (10 al 99).
3. Calculo de frecuencias observadas frente a las frecuencias teoricas de Benford: P(d) = log10(1 + 1/d).
4. Pruebas estadisticas de bondad de ajuste: Test de Chi-Cuadrado y Desviacion Absoluta Media (Mean Absolute Deviation / MAD).
5. Identificacion y aislamiento de los importes exactos y cuentas contables responsables de la anomalia estadistica (ej: facturas recurrentes en 4.900 € para esquivar limites de autorizacion en 5.000 €).

Restricciones:
- Filtra cuentas reguladas o tarifas fijas estandarizadas (ej: suministros con cuotas mensuales identicas) que no siguen una distribucion natural de Benford.

Formato de salida: Script en Python con DuckDB y SciPy que genere los graficos comparativos y la lista priorizada de asientos sospechosos.`,
        tags: ["benford", "auditoría-forense", "fraude", "chi-cuadrado", "libro-diario", "roac"]
      },
      {
        id: "con-051",
        title: "Auditoría de Corte de Inventarios y Existencias al Cierre",
        desc: "Verifica que las existencias fisicas contadas se imputan al ejercicio correcto y cuantifica el impacto en resultados.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Cuentas Senior especializado en ciclos de inventario y cierre contable.
[COPIA AQUI TU IDEA]

Desarrolla el modulo de auditoria de corte de inventarios conforme a la NIA-ES 500 y la NIIF para PYMES:
1. Verificacion del conteo fisico de existencias realizado en los ultimos 5 dias habiles de diciembre: cruzar almacenes fisicos con el libro de inventario.
2. Prueba de que las mercancias contabilizadas como vendidas antes del 31 de diciembre realmente salieron del almacenes antes del cierre (albaranes de expedicion timbrados).
3. Deteccion de existencias fisicas sin factura de compra registrada: obligacion de dotar provision o factura pendiente de recibir en cuenta 4009/4109.
4. Revision de las diferencias entre inventario fisico y contable: analizar si las discrepancias superan el umbral de materialidad del 2% del resultado antes de impuestos.
5. Propuesta de asientos de regularizacion por ajuste de existencias y periodificacion de costes de transporte pendientes.

Restricciones:
- Aplica muestreo estadistico por valor ABC (Pareto 80/20) para priorizar los articulos de mayor impacto economico.

Formato de salida: Informe de corte de inventarios en Markdown con tabla de diferencias cuantificadas y propuesta de asientos de ajuste.`,
        tags: ["inventarios", "cut-off", "existencias", "niif-pymes", "auditoría", "cierre"]
      },
      {
        id: "con-052",
        title: "Detección de Asientos Manuales Atípicos en Cuentas de Tesorería en Fines de Semana",
        desc: "Monitorea apuntes contables manuales registrados fuera de horario laboral o por usuarios sin atribuciones de pago.",
        model: "GPT-4o",
        prompt: `Eres un Auditor Interno y Especialista en Detección de Fugas de Capital y Control de Asientos Manuales.
[COPIA AQUI TU IDEA]

Crea el algoritmo de deteccion de asientos contables manuales anomalos (Manual Journal Entries / MJE) segun la NIA-ES 240 (Fraude):
1. Filtrado de asientos registrados directamente por usuarios manuales excluyendo las integraciones automaticas de ERP o facturacion.
2. Identificacion de factores temporales atipicos: asientos contabilizados en sabados, domingos, festivos oficiales o en horario nocturno (22:00 a 06:00).
3. Identificacion de contrapartidas inusuales: abonos en cuentas de clientes o tesoreria (subgrupo 57) contra cuentas de gasto extraordinario o partidas pendientes sin soporte documental.
4. Asientos registrados por usuarios con permisos no habituales (ej: usuario del departamento de TI o direccion registrando asientos en diario).
5. Asientos redondeados en cifras exactas de miles de euros y asientos anulados inmediatamente despues del cierre de balance provisional.

Restricciones:
- Requiere acceso a los metadatos de auditoria del ERP: Identificador de usuario (User ID), marca de tiempo de creacion (Creation Timestamp) y numero de terminal.

Formato de salida: Modulo de Python con analisis automatizado sobre fichero de volcado de diario y clasificacion de asientos segun indice de sospecha.`,
        tags: ["asientos-manuales", "mje", "nia-es-240", "fraude-interno", "tesorería", "auditoría-continua"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Exportación ERP, Cierre y Auditoría)",
    prompts: [
      {
        id: "con-026",
        title: "Exportación de Asientos Contables a Formatos Estándar ERP (SAGE, A3, Holded)",
        desc: "Genera archivos de importación planos (.txt, .csv) compatibles con los principales ERPs del mercado español.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Desarrollador de Integraciones Contables conectando aplicaciones externas con software de gestion contable.
[COPIA AQUI TU IDEA]

Desarrolla los modulos de exportacion del Libro Diario a formatos de importacion oficiales:
1. Formato A3ECO / A3Asesor (Wolters Kluwer): archivo de texto plano de ancho fijo con registro de cabecera de asiento, lineas de apunte con cuenta, concepto, documento, base, tipo de IVA y contrapartida.
2. Formato SAGE 50 / SAGE 200: estructura CSV normalizada con separador de punto y coma, codificacion ANSI/ISO-8859-1 y campos obligatorios de cabecera y desglose analitico.
3. Formato Holded / Contasimple: esquema JSON o CSV estandarizado con asignacion de tags y contactos fiscales.
4. Validacion previa antes de la exportacion: asegurar que todos los asientos del lote estan balanceados y que ninguna cuenta supera la longitud maxima de digitos.
5. Generacion de archivo de registro (log) que certifique el numero de asientos exportados y el importe total en el Debe y Haber.

Restricciones:
- Respeta de forma milimetrica los manuales de importacion de ficheros ASCII de cada fabricante de software.

Formato de salida: Modulo de Python 'erp_exporters.py' con funciones especificas para cada destino contable.`,
        tags: ["exportación", "sage", "a3eco", "holded", "integración-erp"]
      },
      {
        id: "con-027",
        title: "Cálculo de Tablas de Amortización Técnica y Fiscal del Inmovilizado",
        desc: "Genera el cuadro de amortización de activos fijos aplicando coeficientes lineales o tablas oficiales del Impuesto sobre Sociedades.",
        model: "DeepSeek V4",
        prompt: `Eres un Asesor Fiscal y Especialista en Contabilizacion del Inmovilizado Material e Intangible.
[COPIA AQUI TU IDEA]

Genera el cuadro de amortizacion y la contabilizacion periodica de los activos de la empresa:
1. Parametrizacion del activo: fecha de puesta en funcionamiento, coste de adquisicion, valor residual estimado y vida util util en anos o porcentaje anual.
2. Calculo segun Tablas Oficiales de Amortizacion del Impuesto sobre Sociedades (coeficiente lineal maximo y periodo maximo en anos).
3. Cuadro de amortizacion completo ano a ano: dotacion anual a la amortizacion, amortizacion acumulada al cierre y valor neto contable (VNC) remanente.
4. Generacion automatica del asiento contable de dotacion periodica: cargo a cuenta del Grupo 6 (6810 Amortizacion del inmovilizado material) con abono a cuenta correctora del Grupo 2 (2810 Amortizacion acumulada).
5. Tratamiento de bajas de inmovilizado: calculo del beneficio o perdida enajenacion de inmovilizado (cuentas 771 o 671) en caso de venta o achatarramiento.

Restricciones:
- Desglosa con claridad la diferencia entre amortizacion contable y amortizacion fiscalmente deducible en caso de amortizacion acelerada para PYMES.

Formato de salida: Script de Python que genere la tabla de amortizacion en DataFrame y el asiento contable correspondiente.`,
        tags: ["amortización", "inmovilizado", "tablas-fiscales", "asientos-cierre"]
      },
      {
        id: "con-028",
        title: "Automatización del Proceso de Cierre Contable de Ejercicio",
        desc: "Genera en cascada los asientos de variación de existencias, regularización de pérdidas/ganancias y cierre definitivo.",
        model: "DeepSeek V4",
        prompt: `Eres un Jefe de Contabilidad ejecutando el proceso formal de Cierre Contable del Ejercicio economico.
[COPIA AQUI TU IDEA]

Estructura y ejecuta la secuencia de asientos obligatorios de cierre conforme al PGC:
1. Asiento 1 - Variacion de Existencias: baja de las existencias iniciales y alta de las existencias finales segun inventario fisico (cuentas Grupo 3 contra 610/712).
2. Asiento 2 - Regularizacion de Ingresos y Gastos: saldo de todas las cuentas del Grupo 6 (compras y gastos) y Grupo 7 (ventas e ingresos) traspasando el saldo neto a la cuenta (129) 'Resultado del ejercicio'.
3. Asiento 3 - Contabilizacion del Impuesto sobre Sociedades: gasto por impuesto corriente (6300) y retenciones/pagos fraccionados (473) imputados.
4. Asiento 4 - Asiento de Cierre: cancelacion de todas las cuentas de Balance (Grupos 1 a 5), cargando las cuentas con saldo acreedor y abonando las de saldo deudor para dejar todos los mayores en saldo cero.
5. Asiento de Apertura del ejercicio siguiente: reversion exacta del asiento de cierre con fecha 1 de enero.

Restricciones:
- Comprueba que tras el asiento de regularizacion, ningun mayor de los Grupos 6 y 7 mantiene saldo vivo.

Formato de salida: Secuencia cronologica de asientos contables estructurados en Markdown con justificacion de cada paso.`,
        tags: ["cierre-contable", "regularización", "asiento-apertura", "ejercicio-fiscal"]
      },
      {
        id: "con-029",
        title: "Registro Inmutable de Auditoría de Asientos Contables para Cumplimiento Fiscal",
        desc: "Diseña el log de trazabilidad que garantiza la no alteración retroactiva de apuntes contables según la LGT.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Sistemas de Informacion Contable y Cumplimiento de la Ley General Tributaria (LGT art. 29.2.j).
[COPIA AQUI TU IDEA]

Disena la arquitectura de base de datos inmutable para el registro de asientos contables:
1. Estructura de tabla solo-insercion (Append-Only): prohibicion estricta de sentencias 'UPDATE' o 'DELETE' sobre la tabla del Libro Diario mediante politicas de seguridad a nivel de fila y triggers de base de datos.
2. Registro de metadatos forenses por asiento: timestamp UTC de grabacion, identificador de usuario, IP, version del software y hash criptografico SHA-256 de los datos del asiento.
3. Mecanismo de asientos rectificativos: si un asiento debe corregirse, generar un nuevo asiento correlativo de signo contrario o diferencial que referencie al asiento rectificado.
4. Exportacion certificada para inspeccion tributaria: volcado estandarizado que demuestre que no existen huecos de numeracion ni alteraciones en la serie cronologica de asientos.
5. Sellado periodico del libro diario: generacion de un resumen criptografico diario o mensual sellado en bloque.

Restricciones:
- Cumple con los requisitos normativos del Reglamento de sistemas informaticos de facturacion y contabilidad para evitar multas por software de doble uso.

Formato de salida: Sentencias DDL y triggers en SQL para PostgreSQL que impidan tecnicamente la modificacion de asientos contables.`,
        tags: ["inmutabilidad", "lgt", "auditoría", "seguridad-contable", "triggers"]
      },
      {
        id: "con-030",
        title: "Generador de Cartas Circulares de Confirmación de Saldos (Circularización)",
        desc: "Genera automáticamente cartas de circularización para confirmar saldos pendientes con clientes, proveedores y bancos.",
        model: "GPT-4o",
        prompt: `Eres un Auditor Financiero realizando la prueba de confirmacion externa de saldos (Circularizacion) segun la NIA-ES 505.
[COPIA AQUI TU IDEA]

Genera el lote de cartas circulares de confirmacion de saldos a fecha de cierre:
1. Modelo de circularizacion positiva para clientes: solicitud de confirmacion directa al equipo auditor del saldo deudor a fecha 31 de diciembre, adjuntando detalle de facturas pendientes.
2. Modelo de circularizacion ciega para proveedores: solicitud de envio de su estado de cuenta a fecha de cierre sin revelarles el saldo registrado en nuestros libros para contraste independiente.
3. Modelo de circularizacion bancaria estandarizada: solicitud a entidades financieras de todas las cuentas abiertas, lineas de credito, prestamos, derivados y garantias o avales prestados.
4. Advertencia expresa de que la contestacion debe remitirse directamente a la direccion del auditor externo y no a la empresa auditada.
5. Cuadro de control de circularizacion: registro de cartas enviadas, fecha de envio, respuestas conformes, discrepancias detectadas y procedimientos alternativos para cartas sin respuesta.

Restricciones:
- Redaccion profesional formal segun los modelos normalizados por el Instituto de Contabilidad y Auditoria de Cuentas (ICAC).

Formato de salida: Plantillas de comunicacion formal en Markdown y tabla de control de respuestas de circularizacion.`,
        tags: ["circularización", "auditoría-externa", "icac", "nia-505", "confirmación-saldos"]
      },
      {
        id: "con-053",
        title: "Formateador y Validador de Asientos para Importación Masiva en ERP A3 / Sage",
        desc: "Transforma propuestas de asientos en partida doble a formatos estructurados (.sua / .csv / .txt) compatibles con los principales ERPs.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador de Integraciones Contables y Enlaces de Datos con Software Profesional.
[COPIA AQUI TU IDEA]

Implementa el formateador y exportador de asientos contables en partida doble hacia los estandares de importacion de A3 Software, Sage 200 y Contasol:
1. Normalizacion de la estructura de apunte: Numero de asiento, Fecha, Subcuenta (con relleno de ceros segun longitud de plan contable), Concepto, Documento, Debe y Haber.
2. Formato de exportacion para A3 Asesor / A3 Eco: fichero de texto de ancho fijo o formato SUA estandarizado.
3. Formato de exportacion para Sage 200 / Sage Despachos: fichero CSV delimitado por punto y coma con cabeceras de campo especificas.
4. Validacion previa obligatoria antes de la generacion del fichero:
   - Suma total de Debe exactamente igual a suma total de Haber con 0.00 euros de descuadre.
   - Existencia previa de todas las subcuentas en el maestro contable o generacion del registro de alta automatica de subcuenta.
   - Fechas comprendidas dentro del ejercicio contable activo.
5. Gestion de caracteres especiales y codificacion estricta en UTF-8 o Windows-1252 segun el ERP receptor.

Restricciones:
- Bloquea incondicionalmente la exportacion si se detecta un descuadre aritmetico o una subcuenta con longitud incorrecta.

Formato de salida: Modulo de Python 'erp_entry_exporter.py' con perfiles configurables para A3, Sage y Contasol.`,
        tags: ["erp", "a3", "sage", "contasol", "exportación-asientos", "partida-doble"]
      },
      {
        id: "con-054",
        title: "Pista de Auditoría Inmutable en DuckDB con Hash SHA-256 de Libros Diarios",
        desc: "Calcula el hash criptográfico acumulado de cada apunte contable para garantizar que no ha existido alteración de libros.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor de Sistemas de Información Financiera y Arquitecto de Bases de Datos Inmutables.
[COPIA AQUI TU IDEA]

Disena la arquitectura de pista de auditoria inmutable sobre DuckDB para el registro de libros diarios y balances:
1. Creacion de la tabla 'audit_journal' en DuckDB con columnas inmutables: EntryID, TimestampUTC, UserID, AccountID, Debit, Credit, Description, DocumentHash y CumulativeHash.
2. Algoritmo de encadenamiento criptografico: CumulativeHash_N = SHA-256(CumulativeHash_{N-1} + EntryID + Debit + Credit + TimestampUTC).
3. Comprobacion periodica de integridad: script de verificacion que recalcula la cadena completa y confirma la ausencia de manipulaciones o borrados.
4. Generacion de certificados electronicos de cierre de diario con sellado temporal para presentacion en legalizacion de libros ante el Registro Mercantil.
5. Politica de retencion inmutable que impida el comando 'DELETE' o 'UPDATE' directo en la base de datos (solo se permiten asientos de rectificacion mediante 'INSERT').

Restricciones:
- Cumple con las exigencias del articulo 25 y siguientes del Codigo de Comercio sobre claridad y orden de los libros contables.

Formato de salida: Codigo SQL DDL para DuckDB y modulo en Python con funciones de insercion segura y verificacion de integridad de la cadena.`,
        tags: ["duckdb", "pista-auditoría", "sha-256", "inmutabilidad", "legalización-libros", "código-comercio"]
      },
      {
        id: "con-055",
        title: "Generador de la Memoria Económica de las Cuentas Anuales en Formato Oficial",
        desc: "Redacta las notas explicativas de la memoria abreviada y PYMES del PGC con tablas cuantitativas de movimientos de inmovilizado.",
        model: "GPT-4o",
        prompt: `Eres un Asesor Contable Senior y Responsable de Formulación de Cuentas Anuales Oficiales.
[COPIA AQUI TU IDEA]

Crea el generador formal de la Memoria Economica de las Cuentas Anuales segun los modelos oficiales del Registro Mercantil (PGC PYMES / Abreviado):
1. Redaccion estandarizada de las notas obligatorias de la memoria:
   - Nota 1: Actividad de la empresa y objeto social.
   - Nota 2: Bases de presentacion de las cuentas anuales (imagen fiel, principios contables aplicados, aspectos criticos de la valoracion de la incertidumbre).
   - Nota 3: Aplicacion del resultado (propuesta de distribucion a reservas voluntarias, reserva legal y dividendos).
   - Nota 4: Normas de registro y valoracion aplicadas (inmovilizado, existencias, moneda extranjera, provisiones, ingresos).
   - Nota 5: Cuadro de movimientos del inmovilizado material, intangible y financiero (entradas, salidas, traspasos, amortizaciones del ejercicio).
2. Nota de operaciones con partes vinculadas y remuneracion del organo de administracion.
3. Calculo e inclusion de la informacion sobre el periodo medio de pago a proveedores (Disposicion adicional tercera Ley 15/2010).
4. Exportacion del documento en formato compatible con el programa D2 del Colegio de Registradores de la Propiedad y Mercantiles de Espana.
5. Verificacion de consistencia: las cifras contenidas en el texto de la memoria deben coincidir exactamente con los saldos del Balance y Cuenta de Perdidas y Ganancias.

Restricciones:
- No utilices modelos desactualizados; respeta la ultima resolucion del ICAC sobre la memoria de cuentas anuales.

Formato de salida: Modulo en Python que ingeste los balances cerrados y genere el borrador completo de la memoria en formato Markdown y PDF.`,
        tags: ["memoria", "cuentas-anuales", "registro-mercantil", "pgc-pymes", "icac", "informe-anual"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Contabilidad & ERP
 */
export const CONTABILIDAD_PROMPTS = CONTABILIDAD_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "contabilidad",
    areaName: "Contabilidad & ERP",
    areaColor: "#D97706",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
