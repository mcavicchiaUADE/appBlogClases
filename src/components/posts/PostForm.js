import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../features/posts/postsSlice';
import { selectIsAddingPost } from '../../features/posts/postsSelectors';
import { usePostForm } from '../../hooks/usePostForm';
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../../constants/validation';
import { API_CONFIG } from '../../constants/api';

// formulario para crear nuevos posts
const PostForm = ({ isExpanded, onToggle, onSuccess }) => {
  const dispatch = useDispatch();
  const is_adding_post = useSelector(selectIsAddingPost);
  const { form, updateField, setError, reset, setExpanded, isValid } = usePostForm();
  const prevTitleErrorRef = useRef('');
  const prevBodyErrorRef = useRef('');

  // validación con debounce para el título
  useEffect(() => {
    const trimmedTitle = form.title.trim();
    
    if (trimmedTitle.length >= VALIDATION_RULES.TITLE_MIN_LENGTH) {
      if (prevTitleErrorRef.current) {
        prevTitleErrorRef.current = '';
        setError('title', '');
      }
      return;
    }
    
    const timeoutId = setTimeout(() => {
      const newError = trimmedTitle.length > 0 && trimmedTitle.length < VALIDATION_RULES.TITLE_MIN_LENGTH
        ? VALIDATION_MESSAGES.TITLE_TOO_SHORT
        : '';
      
      if (newError !== prevTitleErrorRef.current) {
        prevTitleErrorRef.current = newError;
        setError('title', newError);
      }
    }, VALIDATION_RULES.DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [form.title, setError]);

  // validación con debounce para el contenido
  useEffect(() => {
    const trimmedBody = form.body.trim();
    
    if (trimmedBody.length >= VALIDATION_RULES.BODY_MIN_LENGTH) {
      if (prevBodyErrorRef.current) {
        prevBodyErrorRef.current = '';
        setError('body', '');
      }
      return;
    }
    
    const timeoutId = setTimeout(() => {
      const newError = trimmedBody.length > 0 && trimmedBody.length < VALIDATION_RULES.BODY_MIN_LENGTH
        ? VALIDATION_MESSAGES.BODY_TOO_SHORT
        : '';
      
      if (newError !== prevBodyErrorRef.current) {
        prevBodyErrorRef.current = newError;
        setError('body', newError);
      }
    }, VALIDATION_RULES.DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [form.body, setError]);

  const handleAddPost = () => {
    if (!form.title.trim() || !form.body.trim()) {
      Alert.alert(
        'Campos incompletos',
        VALIDATION_MESSAGES.FIELDS_INCOMPLETE,
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    if (!isValid) {
      Alert.alert(
        'Validación fallida',
        VALIDATION_MESSAGES.VALIDATION_FAILED,
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    const new_post = {
      title: form.title.trim(),
      body: form.body.trim(),
      userId: API_CONFIG.DEFAULT_USER_ID,
    };

    dispatch(addPost(new_post));
    reset();
    setExpanded(false);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClean = () => {
    Alert.alert(
      'Limpiar formulario',
      '¿Estás seguro de que deseas limpiar el formulario? Se perderán los datos ingresados.',
      [
        { text: 'Continuar editando', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: () => {
            reset();
          },
        },
      ]
    );
  };

  if (!isExpanded) return null;

  return (
    <View style={styles.form_overlay}>
      <TouchableOpacity
        style={styles.form_overlay_backdrop}
        activeOpacity={1}
        onPress={onToggle}
      />
      <View style={styles.form}>
        <View style={styles.form_header_container}>
          <Text style={styles.form_title}>Nueva publicación</Text>
          {(form.title || form.body) && (
            <TouchableOpacity onPress={handleClean} style={styles.cancel_button}>
              <Text style={styles.cancel_button_text}>Limpiar</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.form_content}>
          {/* campo título */}
          <View>
            <Text style={styles.label}>
              Título <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                form.title_error ? styles.input_error : null,
                form.title.trim().length >= VALIDATION_RULES.TITLE_MIN_LENGTH && !form.title_error
                  ? styles.input_success
                  : null,
              ]}
              placeholder="Escribe un título para tu publicación"
              placeholderTextColor="#999"
              value={form.title}
              onChangeText={(value) => updateField('title', value)}
              maxLength={VALIDATION_RULES.TITLE_MAX_LENGTH}
            />
            {/* barra de progreso */}
            {form.title.trim().length > 0 && (
              <View style={styles.progress_container}>
                <View style={styles.progress_bar_background}>
                  <View
                    style={[
                      styles.progress_bar_fill,
                      {
                        width: `${Math.min((form.title.trim().length / VALIDATION_RULES.TITLE_MIN_LENGTH) * 100, 100)}%`,
                        backgroundColor: form.title.trim().length >= VALIDATION_RULES.TITLE_MIN_LENGTH ? '#4CAF50' : '#FF9800',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progress_text}>
                  {form.title.trim().length}/{VALIDATION_RULES.TITLE_MIN_LENGTH} caracteres
                  {form.title.trim().length < VALIDATION_RULES.TITLE_MIN_LENGTH && ` (faltan ${VALIDATION_RULES.TITLE_MIN_LENGTH - form.title.trim().length})`}
                </Text>
              </View>
            )}
            {form.title_error ? (
              <Text style={styles.error_hint}>{form.title_error}</Text>
            ) : form.title.trim().length > 0 && form.title.trim().length < VALIDATION_RULES.TITLE_MIN_LENGTH ? (
              <Text style={styles.warning_hint}>
                Mínimo {VALIDATION_RULES.TITLE_MIN_LENGTH} caracteres ({form.title.trim().length}/{VALIDATION_RULES.TITLE_MIN_LENGTH})
              </Text>
            ) : null}
          </View>

          {/* campo contenido */}
          <View style={styles.content_container}>
            <Text style={styles.label}>
              Contenido <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.multiline,
                form.body_error ? styles.input_error : null,
                form.body.trim().length >= VALIDATION_RULES.BODY_MIN_LENGTH && !form.body_error
                  ? styles.input_success
                  : null,
              ]}
              placeholder="Escribe el contenido de tu publicación..."
              placeholderTextColor="#999"
              value={form.body}
              onChangeText={(value) => updateField('body', value)}
              multiline
              numberOfLines={4}
              maxLength={VALIDATION_RULES.BODY_MAX_LENGTH}
            />
            {/* barra de progreso */}
            {form.body.trim().length > 0 && (
              <View style={styles.progress_container}>
                <View style={styles.progress_bar_background}>
                  <View
                    style={[
                      styles.progress_bar_fill,
                      {
                        width: `${Math.min((form.body.trim().length / VALIDATION_RULES.BODY_MIN_LENGTH) * 100, 100)}%`,
                        backgroundColor: form.body.trim().length >= VALIDATION_RULES.BODY_MIN_LENGTH ? '#4CAF50' : '#FF9800',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progress_text}>
                  {form.body.trim().length}/{VALIDATION_RULES.BODY_MIN_LENGTH} caracteres
                  {form.body.trim().length < VALIDATION_RULES.BODY_MIN_LENGTH && ` (faltan ${VALIDATION_RULES.BODY_MIN_LENGTH - form.body.trim().length})`}
                  {form.body.trim().length >= VALIDATION_RULES.BODY_MIN_LENGTH && ` (máximo ${VALIDATION_RULES.BODY_MAX_LENGTH})`}
                </Text>
              </View>
            )}
            {form.body_error ? (
              <Text style={styles.error_hint}>{form.body_error}</Text>
            ) : form.body.trim().length > 0 && form.body.trim().length < VALIDATION_RULES.BODY_MIN_LENGTH ? (
              <Text style={styles.warning_hint}>
                Mínimo {VALIDATION_RULES.BODY_MIN_LENGTH} caracteres ({form.body.trim().length}/{VALIDATION_RULES.BODY_MIN_LENGTH})
              </Text>
            ) : form.body.trim().length >= VALIDATION_RULES.BODY_MIN_LENGTH ? (
              <Text style={styles.success_hint}>
                ({form.body.trim().length}/{VALIDATION_RULES.BODY_MAX_LENGTH})
              </Text>
            ) : null}
          </View>

          {/* botón publicar */}
          <PostFormButton isValid={isValid} onPress={handleAddPost} isAdding={is_adding_post} />
        </View>
      </View>
    </View>
  );
};

// botón de publicar
const PostFormButton = ({ isValid, onPress, isAdding }) => {
  return (
    <TouchableOpacity
      style={[styles.button, !isValid && styles.button_disabled]}
      onPress={onPress}
      disabled={!isValid || isAdding}
      activeOpacity={0.8}
    >
      {isAdding ? (
        <View style={styles.button_content}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={[styles.button_text, { marginLeft: 8 }]}>Publicando...</Text>
        </View>
      ) : (
        <Text style={styles.button_text}>Publicar</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  form_overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 300,
    zIndex: 999,
  },
  form_overlay_backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  form: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  form_header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
    backgroundColor: '#FFE0B2',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFCC80',
  },
  form_content: {
    padding: 16,
    maxHeight: '70%',
  },
  form_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  cancel_button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancel_button_text: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#D32F2F',
  },
  input: {
    borderWidth: 2,
    borderColor: '#FFCC80',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  input_error: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFEBEE',
  },
  input_success: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8F4',
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  content_container: {
    marginTop: 12,
  },
  progress_container: {
    marginTop: 8,
    marginBottom: 4,
  },
  progress_bar_background: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progress_bar_fill: {
    height: '100%',
    borderRadius: 3,
  },
  progress_text: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  error_hint: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
  },
  warning_hint: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
  },
  success_hint: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  button_disabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
    marginTop: 60,
  },
  button_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button_text: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default PostForm;

