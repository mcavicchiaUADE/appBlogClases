import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../constants/validation';

// valida el título de un post
export const validateTitle = (title) => {
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return VALIDATION_MESSAGES.TITLE_REQUIRED;
  }
  if (trimmed.length < VALIDATION_RULES.TITLE_MIN_LENGTH) {
    return VALIDATION_MESSAGES.TITLE_TOO_SHORT;
  }
  return null;
};

// valida el bodyde un post
export const validateBody = (body) => {
  const trimmed = body.trim();
  if (trimmed.length === 0) {
    return VALIDATION_MESSAGES.BODY_REQUIRED;
  }
  if (trimmed.length < VALIDATION_RULES.BODY_MIN_LENGTH) {
    return VALIDATION_MESSAGES.BODY_TOO_SHORT;
  }
  return null;
};

// valida el posteo completo
export const validatePost = (post) => {
  const titleError = validateTitle(post.title);
  const bodyError = validateBody(post.body);
  
  return {
    isValid: !titleError && !bodyError,
    errors: {
      title: titleError,
      body: bodyError,
    },
  };
};

