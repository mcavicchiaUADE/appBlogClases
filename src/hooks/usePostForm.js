import { useSelector, useDispatch } from 'react-redux';
import { setFormField, setFormError, clearForm, toggleForm, setFormExpanded } from '../features/posts/postsSlice';
import { VALIDATION_RULES } from '../constants/validation';
import { validateTitle, validateBody } from '../utils/validators';

// hook personalizado para manejar el formulario de posts
export const usePostForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.posts.form);

  // actualiza un campo del formulario
  const updateField = (field, value) => {
    dispatch(setFormField({ field, value }));
  };

  // establece un error en un campo del formulario
  const setError = (field, error) => {
    dispatch(setFormError({ field, error }));
  };

  // limpia todos los campos del formulario
  const reset = () => {
    dispatch(clearForm());
  };

  // alterna el estado de expansión del formulario
  const toggle = () => {
    dispatch(toggleForm());
  };

  // establece el estado de expansión del formulario
  const setExpanded = (expanded) => {
    dispatch(setFormExpanded(expanded));
  };

  // valida un campo específico
  const validateField = (field, value) => {
    if (field === 'title') {
      const error = validateTitle(value);
      if (error) {
        setError('title', error);
      }
      return !error;
    } else if (field === 'body') {
      const error = validateBody(value);
      if (error) {
        setError('body', error);
      }
      return !error;
    }
    return true;
  };

  // verifica si el formulario es válido
  const isValid = () => {
    const titleValid = form.title.trim().length >= VALIDATION_RULES.TITLE_MIN_LENGTH;
    const bodyValid = form.body.trim().length >= VALIDATION_RULES.BODY_MIN_LENGTH;
    return titleValid && bodyValid && !form.title_error && !form.body_error;
  };

  return {
    form,
    updateField,
    setError,
    reset,
    toggle,
    setExpanded,
    validateField,
    isValid: isValid(),
  };
};

