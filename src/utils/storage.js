import AsyncStorage from '@react-native-async-storage/async-storage';

const POSTS_STORAGE_KEY = '@miniblog_posts';

// guardar posts en AsyncStorage
export const savePostsToStorage = async (posts) => {
  try {
    const jsonValue = JSON.stringify(posts);
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error al guardar posts en storage:', error);
  }
};

// cargar posts desde AsyncStorage
export const loadPostsFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error al cargar posts desde storage:', error);
    return null;
  }
};

// limpiar posts guardados
export const clearPostsStorage = async () => {
  try {
    await AsyncStorage.removeItem(POSTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar posts del storage:', error);
  }
};

