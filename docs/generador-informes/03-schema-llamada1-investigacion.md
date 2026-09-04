# JSON SCHEMA — LLAMADA 1 (INVESTIGACIÓN CON GROUNDING)

## Configuración de la llamada

```json
{
  "model": "gemini-2.5-flash",
  "temperature": 0.3,
  "topP": 0.8,
  "topK": 40,
  "maxOutputTokens": 8192,
  "groundingConfig": {
    "groundingCapability": "grounding with google search"
  },
  "generationConfig": {
    "responseMimeType": "application/json",
    "responseSchema": "VER ABAJO"
  }
}
```

## Schema

```json
{
  "type": "object",
  "required": ["categoria_producto", "competidores", "mercado", "tendencias"],
  "properties": {
    "categoria_producto": {
      "type": "string",
      "enum": [
        "hardware_software_ia",
        "saas_b2b",
        "saas_b2c",
        "marketplace_plataforma",
        "api_infraestructura",
        "servicio_profesional_ia",
        "hibrido"
      ]
    },
    "competidores": {
      "type": "array",
      "minItems": 5,
      "maxItems": 8,
      "items": {
        "type": "object",
        "required": ["nombre", "tipo", "modelo_negocio", "precio_estimado", "fortalezas", "debilidades", "gap_vs_horizon"],
        "properties": {
          "nombre": {
            "type": "string",
            "description": "Nombre real del competidor"
          },
          "tipo": {
            "type": "string",
            "enum": ["directo", "indirecto", "sustituto"],
            "description": "directo = mismo producto; indirecto = misma categoría; sustituto = resuelve el mismo problema de otra forma"
          },
          "modelo_negocio": {
            "type": "string",
            "description": "Ej: SaaS 99€/mes, licencia 500€, hardware+servicio, etc."
          },
          "precio_estimado": {
            "type": "string",
            "description": "Rango de precio estimado"
          },
          "fortalezas": {
            "type": "array",
            "items": {"type": "string"},
            "minItems": 1,
            "maxItems": 3
          },
          "debilidades": {
            "type": "array",
            "items": {"type": "string"},
            "minItems": 1,
            "maxItems": 3
          },
          "gap_vs_horizon": {
            "type": "string",
            "description": "Qué NO hace este competidor que Horizon SÍ hace"
          },
          "fuente": {
            "type": "string",
            "description": "URL o referencia del dato"
          },
          "verificable": {
            "type": "boolean",
            "description": "true si el dato viene de búsqueda; false si es inferencia"
          }
        }
      }
    },
    "mercado": {
      "type": "object",
      "required": ["tam", "sam", "som", "fuente_principal", "calculado_por"],
      "properties": {
        "tam": {
          "type": "object",
          "required": ["valor", "moneda", "periodo", "descripcion"],
          "properties": {
            "valor": {"type": "number"},
            "moneda": {"type": "string", "enum": ["EUR", "USD"]},
            "periodo": {"type": "string", "description": "Ej: 2025, 2025-2028"},
            "descripcion": {"type": "string"},
            "fuente": {"type": "string"},
            "verificable": {"type": "boolean"}
          }
        },
        "sam": {
          "type": "object",
          "required": ["valor", "moneda", "periodo", "descripcion"],
          "properties": {
            "valor": {"type": "number"},
            "moneda": {"type": "string", "enum": ["EUR", "USD"]},
            "periodo": {"type": "string"},
            "descripcion": {"type": "string"},
            "metodo_calculo": {"type": "string", "description": "Ej: TAM × 35% (mercado español de software profesional)"}
          }
        },
        "som": {
          "type": "object",
          "required": ["valor", "moneda", "periodo", "descripcion"],
          "properties": {
            "valor": {"type": "number"},
            "moneda": {"type": "string", "enum": ["EUR", "USD"]},
            "periodo": {"type": "string"},
            "descripcion": {"type": "string"},
            "metodo_calculo": {"type": "string", "description": "Ej: SAM × 4% en 24 meses"}
          }
        },
        "fuente_principal": {
          "type": "string",
          "description": "Fuente de datos de mercado más relevante"
        },
        "calculado_por": {
          "type": "string",
          "enum": ["bottom_up", "top_down", "mixto"],
          "description": "Método de cálculo utilizado"
        }
      }
    },
    "tendencias": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "required": ["tendencia", "impacto_en_horizon", "relevancia"],
        "properties": {
          "tendencia": {"type": "string"},
          "impacto_en_horizon": {
            "type": "string",
            "enum": ["muy_positivo", "positivo", "neutro", "negativo", "muy_negativo"]
          },
          "relevancia": {"type": "string", "description": "Por qué importa para este producto concreto"}
        }
      }
    },
    "benchmarks_unit_economics": {
      "type": "object",
      "description": "Valores de referencia del sector para validar los unit economics del usuario",
      "properties": {
        "cac_medio_sector": {"type": "string", "description": "Coste de adquisición medio del sector"},
        "ltv_cac_ratio_esperado": {"type": "string", "description": "Ratio LTV/CAC típico del sector"},
        "churn_medio_sector": {"type": "string", "description": "Churn mensual medio del sector"},
        "margen_bruto_esperado": {"type": "string", "description": "Margen bruto típico del sector"}
      }
    }
  }
}
```

## Validación post-generación (código server-side)

```javascript
function validateResearch(data) {
  const errors = [];
  
  // Validar que TAM > SAM > SOM
  if (data.mercado.tam.valor <= data.mercado.sam.valor) {
    errors.push("TAM debe ser mayor que SAM");
  }
  if (data.mercado.sam.valor <= data.mercado.som.valor) {
    errors.push("SAM debe ser mayor que SOM");
  }
  
  // Validar al menos 5 competidores
  if (data.competidores.length < 5) {
    errors.push("Se necesitan al menos 5 competidores");
  }
  
  // Validar que no hay competidores duplicados
  const nombres = data.competidores.map(c => c.nombre.toLowerCase());
  const duplicados = nombres.filter((n, i) => nombres.indexOf(n) !== i);
  if (duplicados.length > 0) {
    errors.push(`Competidores duplicados: ${duplicados.join(", ")}`);
  }
  
  // Validar que al menos 2 son verificables
  const verificables = data.competidores.filter(c => c.verificable).length;
  if (verificables < 2) {
    errors.push("Al menos 2 competidores deben tener datos verificables");
  }
  
  // Validar tendencias
  if (data.tendencias.length < 3) {
    errors.push("Se necesitan al menos 3 tendencias");
  }
  
  return errors;
}
```
