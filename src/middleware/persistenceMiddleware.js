import { savePostsToStorage } from '../utils/storage';

// middleware de redux para persistir posts en AsyncStorage
export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // guardar posts cuando se obtienen o se agregan exitosamente
  if (
    action.type === 'posts/fetchPosts/fulfilled' ||
    action.type === 'posts/addPost/fulfilled'
  ) {
    const state = store.getState();
    savePostsToStorage(state.posts.items);
  }
  
  return result;
};

