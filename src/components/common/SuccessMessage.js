import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// componente para mostrar mensajes de éxito
const SuccessMessage = ({ message = 'Publicación creada exitosamente', visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.success_message_container}>
      <View style={styles.success_message}>
        <Text style={styles.success_message_text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  success_message_container: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1001,
    pointerEvents: 'none',
    transform: [{ translateY: -25 }],
  },
  success_message: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  success_message_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuccessMessage;

