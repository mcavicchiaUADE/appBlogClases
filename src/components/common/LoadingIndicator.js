import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// componente para mostrar un indicador de carga
const LoadingIndicator = ({ message = 'Cargando publicaciones...' }) => {
  return (
    <View style={styles.loading_container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loading_text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading_container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
  },
  loading_text: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default LoadingIndicator;

