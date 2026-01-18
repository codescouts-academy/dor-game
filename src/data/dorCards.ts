export type CardCategory = 
  | "Independiente" 
  | "Negociable" 
  | "Valorizado" 
  | "Estimable" 
  | "Small" 
  | "Testeable"
  | "Personalizado";

export type ColumnType = "yes" | "not-yet" | "no" | "deck";

export interface DorCard {
  id: number;
  category: CardCategory;
  title: string;
  description: string;
}

export const dorCards: DorCard[] = [
  // Independiente (1-4)
  {
    id: 1,
    category: "Independiente",
    title: "Las dependencias internas están resueltas",
    description: "Si el ítem tiene dependencias de otros ítems del Backlog de Producto, todos estos ya están terminados."
  },
  {
    id: 2,
    category: "Independiente",
    title: "Las dependencias están visualizadas",
    description: "Todas las dependencias fueron identificadas y se registraron claramente en el tablero y/o herramientas correspondientes."
  },
  {
    id: 3,
    category: "Independiente",
    title: "Las dependencias externas están acordadas",
    description: "Se identificaron las personas responsables, se comprometieron fechas de resolución y se definieron eventuales interfaces."
  },
  {
    id: 4,
    category: "Independiente",
    title: "Las dependencias externas están resueltas",
    description: "Todas las dependencias externas que podrían bloquear el ítem ya fueron resueltas."
  },
  // Negociable (5-8)
  {
    id: 5,
    category: "Negociable",
    title: "Se entiende la necesidad del usuario",
    description: "Está claramente definido el motivo/propósito que impulsa el ítem a desarrollar: ¿Para qué lo vamos a hacer?"
  },
  {
    id: 6,
    category: "Negociable",
    title: "La descripción está abierta a refinamientos",
    description: "Los detalles no están fijados, requieren conversaciones con usuarios/clientes/referentes y permiten incorporar retroalimentación."
  },
  {
    id: 7,
    category: "Negociable",
    title: "El equipo define cómo construir",
    description: "El equipo puede definir cómo construir el ítem (diseño, consideraciones técnicas, identificar alternativas, etc.)."
  },
  {
    id: 8,
    category: "Negociable",
    title: "Solo el equipo formula el 'cómo'",
    description: "No está definido cómo construir el ítem. El equipo es el responsable de hacerlo."
  },
  // Valorizado (9-12)
  {
    id: 9,
    category: "Valorizado",
    title: "Se identificaron los usuarios clave",
    description: "Sabemos para quienes se está desarrollando el ítem, a quienes le aportará valor, cómo, etc."
  },
  {
    id: 10,
    category: "Valorizado",
    title: "Valor de negocio definido",
    description: "Para el ítem, usando una escala de referencia acordada. Por ejemplo: Alta/Media/Baja, 0 a 100, $$$, etc."
  },
  {
    id: 11,
    category: "Valorizado",
    title: "Participación adecuada en la definición del valor",
    description: "Ocurrieron las conversaciones necesarias con todas las personas involucradas para definir el valor de negocio del ítem."
  },
  {
    id: 12,
    category: "Valorizado",
    title: "El valor de negocio permite priorizar",
    description: "No todos los ítems tienen el valor de negocio más alto posible. El valor indica claramente las prioridades a seguir."
  },
  // Estimable (13-16)
  {
    id: 13,
    category: "Estimable",
    title: "El ítem se definió y registró claramente",
    description: "En la herramienta o tablero correspondiente, con los datos necesarios y con el formato acordado."
  },
  {
    id: 14,
    category: "Estimable",
    title: "El equipo está listo para estimar",
    description: "Ya fueron evacuadas las dudas sobre las necesidades a resolver para estar en condición de estimar."
  },
  {
    id: 15,
    category: "Estimable",
    title: "Se estimó en una escala relativa",
    description: "Por ejemplo: puntos de historia con Fibonacci, días ideales, tamaño de T-Shirt, u otra escala basada en esfuerzo o complejidad."
  },
  {
    id: 16,
    category: "Estimable",
    title: "Todo el equipo participó de la estimación",
    description: "La estimación del ítem fue consensuada entre todos los miembros del equipo."
  },
  // Small (17-20)
  {
    id: 17,
    category: "Small",
    title: "Tiene pocos criterios de aceptación",
    description: "La cantidad de criterios de aceptación del ítem no supera un umbral acordado por el equipo."
  },
  {
    id: 18,
    category: "Small",
    title: "El tamaño estimado es pequeño",
    description: "En la unidad de estimación de esfuerzo, tamaño o complejidad usada (puntos de historia, días ideales, T-Shirt, etc.)."
  },
  {
    id: 19,
    category: "Small",
    title: "No tiene sentido subdividir más",
    description: "El ítem es lo suficiente pequeño y no se ven beneficios en dividirlo en varios sub-ítems."
  },
  {
    id: 20,
    category: "Small",
    title: "No hay riesgos de aumento del tamaño",
    description: "No se identifican riesgos mayores que puedan provocar un incremento del tamaño, esfuerzo o complejidad del ítem."
  },
  // Testeable (21-25)
  {
    id: 21,
    category: "Testeable",
    title: "Criterios de aceptación definidos y claros",
    description: "No hay dudas sobre los criterios de aceptación, y están registrados en las herramientas acordadas."
  },
  {
    id: 22,
    category: "Testeable",
    title: "Criterios de aceptación acordados con usuarios",
    description: "O con clientes, representantes del negocio, referentes del tema u otros sectores involucrados."
  },
  {
    id: 23,
    category: "Testeable",
    title: "Se generó la documentación necesaria",
    description: "Por ejemplo: UX/UI, Reglas de negocio, especificaciones técnicas, etc."
  },
  {
    id: 24,
    category: "Testeable",
    title: "Se acordó la provisión de recursos de prueba",
    description: "Se identificaron las personas responsables y se comprometieron fechas para la provisión de los recursos necesarios para testear."
  },
  {
    id: 25,
    category: "Testeable",
    title: "Los recursos de prueba están disponibles",
    description: "Todos los recursos que podrían afectar o retrasar la ejecución de las pruebas ya están disponibles."
  }
];

export const categoryColors: Record<CardCategory, string> = {
  "Independiente": "bg-category-independent",
  "Negociable": "bg-category-negotiable",
  "Valorizado": "bg-category-valuable",
  "Estimable": "bg-category-estimable",
  "Small": "bg-category-small",
  "Testeable": "bg-category-testable",
  "Personalizado": "bg-primary"
};

export const categoryBorderColors: Record<CardCategory, string> = {
  "Independiente": "border-category-independent",
  "Negociable": "border-category-negotiable",
  "Valorizado": "border-category-valuable",
  "Estimable": "border-category-estimable",
  "Small": "border-category-small",
  "Testeable": "border-category-testable",
  "Personalizado": "border-primary"
};

export function shuffleCards(cards: DorCard[]): DorCard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Category order for INVEST
const categoryOrder: CardCategory[] = [
  "Independiente",
  "Negociable", 
  "Valorizado",
  "Estimable",
  "Small",
  "Testeable"
];

// Order cards by category (INVEST order), keeping cards within each category in their original order
export function orderCardsByCategory(cards: DorCard[]): DorCard[] {
  return [...cards].sort((a, b) => {
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  });
}
