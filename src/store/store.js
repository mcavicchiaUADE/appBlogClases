import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import { persistenceMiddleware } from '../middleware/persistenceMiddleware';

export const store = configureStore({ // configuramos el store
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // ignoramos las acciones de persistencia
      },
    }).concat(persistenceMiddleware), // agregamos el middleware de persistencia
});

export default store;

