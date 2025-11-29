import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import { persistenceMiddleware } from '../middleware/persistenceMiddleware';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignorar acciones de AsyncStorage en el check de serialización
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(persistenceMiddleware),
});

export default store;

