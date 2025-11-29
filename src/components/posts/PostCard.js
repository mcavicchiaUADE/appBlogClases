import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// componente para mostrar una tarjeta de post individual
const PostCard = ({ item, index }) => {
  // calcular fecha relativa
  const postDate = new Date();
  postDate.setDate(postDate.getDate() - (item.id || index));
  
  const now = new Date();
  const diffMs = now - postDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  let relativeDate = '';
  if (diffMins < 1) {
    relativeDate = 'Hace unos momentos';
  } else if (diffMins < 60) {
    relativeDate = `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    relativeDate = `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  } else if (diffDays < 7) {
    relativeDate = `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
  } else {
    relativeDate = postDate.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <View style={styles.card}>
      <View style={styles.card_header}>
        <View style={styles.badge}>
          <Text style={styles.badge_text}>#{index + 1}</Text>
        </View>
        {item.userId && (
          <Text style={styles.card_author}>Usuario {item.userId}</Text>
        )}
      </View>
      <Text style={styles.post_title}>{item.title}</Text>
      <Text style={styles.post_body}>{item.body}</Text>
      <View style={styles.card_footer}>
        <Text style={styles.card_date}>{relativeDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badge_text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  card_author: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  post_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
    lineHeight: 24,
  },
  post_body: {
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 22,
    marginBottom: 12,
  },
  card_footer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
    marginTop: 8,
  },
  card_date: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});

export default PostCard;

