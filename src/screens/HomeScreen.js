// 29-11-2025 modificar, quedo una super clase, URGENTE
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, loadPostsFromStorageThunk } from '../features/posts/postsSlice';
import {
  selectPosts,
  selectPostsStatus,
  selectIsLoadingPosts,
  selectIsLoadingFromStorage,
  selectPostsError,
  selectIsFormExpanded,
} from '../features/posts/postsSelectors';
import PostCard from '../components/posts/PostCard';
import PostForm from '../components/posts/PostForm';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import { usePostForm } from '../hooks/usePostForm';

// pantalla principal del miniblog
const HomeScreen = () => {
  const dispatch = useDispatch();
  
  // selectores de redux
  const items = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const is_loading_posts = useSelector(selectIsLoadingPosts);
  const is_loading_from_storage = useSelector(selectIsLoadingFromStorage);
  const error = useSelector(selectPostsError);
  const is_form_expanded = useSelector(selectIsFormExpanded);
  
  // estado local para ui
  const [refreshing, setRefreshing] = useState(false);
  const [show_success_message, setShowSuccessMessage] = useState(false);
  
  // hook del formulario
  const { toggle } = usePostForm();

  // cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(loadPostsFromStorageThunk());
      dispatch(fetchPosts());
    };
    loadInitialData();
  }, [dispatch]);

  // manejar refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchPosts());
    setRefreshing(false);
  };

  // manejar éxito al publicar
  const handlePostSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // renderizar un post
  const renderPost = ({ item, index }) => <PostCard item={item} index={index} />;

  return (
    <View style={styles.container}>
      {/* encabezado */}
      <View style={styles.header_container}>
        <Text style={styles.header}>MiniBlog de Clases</Text>
        <Text style={styles.header_subtitle}>
          {items.length} publicación{items.length !== 1 ? 'es' : ''}
        </Text>
      </View>

      {/* indicador de carga */}
      {is_loading_posts && !refreshing && !is_loading_from_storage && (
        <LoadingIndicator />
      )}

      {/* mensaje de error */}
      {error && status === 'failed' && !is_loading_posts && (
        <ErrorMessage
          title="Error de conexión"
          message={
            error.includes('obtener')
              ? 'No se pudieron cargar las publicaciones. Verifica tu conexión a internet.'
              : error
          }
          suggestion="Sugerencias:\n• Verifica que tengas conexión a internet activa\n• Intenta activar/desactivar el WiFi o datos móviles\n• Si el problema persiste, verifica la configuración de red"
          onRetry={() => dispatch(fetchPosts())}
        />
      )}

      {/* lista de publicaciones, tener cuidado con esto porque puede haber error problema de renderizado completo */}
      <FlatList
        data={items}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `local-${index}`
        }
        renderItem={renderPost}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          !is_loading_posts && (
            <View style={styles.empty_container}>
              <Text style={styles.empty_text}>No hay publicaciones todavía.</Text>
              <Text style={styles.empty_hint}>
                Crea tu primera publicación usando el formulario de abajo
              </Text>
            </View>
          )
        }
        contentContainerStyle={
          items.length === 0 ? styles.empty_list_container : styles.list_container
        }
        showsVerticalScrollIndicator={true}
      />

      {/* botón flotante nueva publicación */}
      <TouchableOpacity
        style={styles.floating_button}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <View style={styles.floating_button_content}>
          <Text style={styles.floating_button_icon}>
            {is_form_expanded ? '✕' : '+'}
          </Text>
          <Text style={styles.floating_button_text}>
            {is_form_expanded ? 'Cerrar' : 'Nueva publicación'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* mensaje de éxito */}
      <SuccessMessage visible={show_success_message} />

      {/* formulario de creación */}
      <PostForm
        isExpanded={is_form_expanded}
        onToggle={toggle}
        onSuccess={handlePostSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header_container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  header_subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontWeight: '500',
  },
  list_container: {
    padding: 16,
    paddingBottom: 12,
  },
  empty_list_container: {
    flexGrow: 1,
  },
  empty_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  empty_text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  empty_hint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  floating_button: { // se ve feo, modificar
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floating_button_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floating_button_icon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  floating_button_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
