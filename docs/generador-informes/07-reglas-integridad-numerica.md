# REGLAS DE INTEGRIDAD NUMÉRICA

## Reglas que el servidor debe validar ANTES de enviar el informe al usuario

### 1. Coherencia de mercado
```
TAM > SAM > SOM
```
Si no se cumple, el informe es inválido.

### 2. Unit economics viables
```
LTV > 3 × CAC
Margen bruto > 60%
Payback < 18 meses
Break-even en clientes < 200 (para startup)
```

### 3. Precio coherente con el modelo
```
Si modelo = "saas_mensual" → precio debe ser €/mes (rango 9-999)
Si modelo = "hardware_saas" → precio debe incluir componente de hardware
Si modelo = "licencia" → precio debe ser €/año o €/perpetua
```

### 4. Competencia coherente
```
Al menos 1 competidor debe ser "directo"
Al menos 1 competidor debe ser "indirecto"
Todos los nombres deben ser reales (no inventados)
```

### 5. Palabras del informe
```
950 ≤ wordCount ≤ 1050
Si wordCount < 900 → reintentar Llamada 2 con instrucción de extender
Si wordCount > 1100 → reintentar Llamada 2 con instrucción de comprimir
```

## Código de validación

```javascript
function validateReport(report, researchData, userAnswers) {
  const errors = [];
  const warnings = [];
  
  // 1. Mercado coherente
  if (researchData.mercado.tam.valor <= researchData.mercado.sam.valor) {
    errors.push("CRÍTICO: TAM debe ser mayor que SAM");
  }
  if (researchData.mercado.sam.valor <= researchData.mercado.som.valor) {
    errors.push("CRÍTICO: SAM debe ser mayor que SOM");
  }
  
  // 2. Competencia
  if (researchData.competidores.length < 5) {
    errors.push("CRÍTICO: Se necesitan al menos 5 competidores");
  }
  const directos = researchData.competidores.filter(c => c.tipo === "directo");
  if (directos.length < 1) {
    warnings.push("ADVERTENCIA: No hay competidores directos identificados");
  }
  
  // 3. Tendencias
  if (researchData.tendencias.length < 3) {
    errors.push("CRÍTICO: Se necesitan al menos 3 tendencias");
  }
  
  // 4. Palabras
  const wordCount = report.split(/\s+/).length;
  if (wordCount < 900) {
    warnings.push(`Informe corto (${wordCount} palabras). Mínimo recomendado: 950.`);
  }
  if (wordCount > 1100) {
    warnings.push(`Informe largo (${wordCount} palabras). Máximo recomendado: 1050.`);
  }
  
  // 5. Placeholders prohibidos
  const placeholders = ["ni idea", "no lo sé", "pendiente", "TBD", "por definir", "xxx"];
  for (const p of placeholders) {
    if (report.toLowerCase().includes(p)) {
      errors.push(`CRÍTICO: Placeholder detectado: "${p}"`);
    }
  }
  
  return { errors, warnings, wordCount };
}
```
