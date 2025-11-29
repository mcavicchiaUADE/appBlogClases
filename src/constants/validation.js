export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 3,
  BODY_MIN_LENGTH: 10,
  TITLE_MAX_LENGTH: 100,
  BODY_MAX_LENGTH: 500,
  DEBOUNCE_DELAY: 4000, // 4 segundos
};

export const VALIDATION_MESSAGES = {
  TITLE_TOO_SHORT: 'El título debe tener al menos 3 caracteres',
  BODY_TOO_SHORT: 'El contenido debe tener al menos 10 caracteres',
  TITLE_REQUIRED: 'El título es obligatorio',
  BODY_REQUIRED: 'El contenido es obligatorio',
  FIELDS_INCOMPLETE: 'Por favor completa todos los campos obligatorios antes de publicar.',
  VALIDATION_FAILED: 'El título debe tener al menos 3 caracteres y el contenido al menos 10 caracteres.',
};

