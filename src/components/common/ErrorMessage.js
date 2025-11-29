import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// componente para mostrar mensajes de error con acción de recuperación
const ErrorMessage = ({ title, message, suggestion, onRetry }) => {
  return (
    <View style={styles.error_container}>
      <View style={styles.error_content}>
        <Text style={styles.error_title}>{title}</Text>
        <Text style={styles.error_text}>{message}</Text>
        {suggestion && <Text style={styles.error_suggestion}>{suggestion}</Text>}
        {onRetry && (
          <TouchableOpacity style={styles.retry_button} onPress={onRetry}>
            <Text style={styles.retry_button_text}>Reintentar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error_container: {
    backgroundColor: '#FFF3E0',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  error_content: {
    flex: 1,
  },
  error_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  error_text: {
    color: '#E65100',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  error_suggestion: {
    fontSize: 13,
    color: '#E65100',
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 20,
  },
  retry_button: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  retry_button_text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorMessage;

