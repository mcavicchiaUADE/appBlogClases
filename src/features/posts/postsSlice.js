import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadPostsFromStorage } from '../../utils/storage';
import { postsApi } from '../../services/api';
import { API_CONFIG } from '../../constants/api';

const initialState = { // definimos estado iniciall
  items: [],
  status: 'idle',
  error: null,
  is_adding_post: false,
  is_loading_from_storage: true,
  form: {
    title: '',
    body: '',
    title_error: '',
    body_error: '',
    is_expanded: false,
  },
};

// thunk para cargar posts desde storage
export const loadPostsFromStorageThunk = createAsyncThunk(
  'posts/loadFromStorage',
  async () => {
    const posts = await loadPostsFromStorage();
    return posts || [];
  }
);

// thunk para obtener publicaciones
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await postsApi.fetchPosts(API_CONFIG.POSTS_LIMIT);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener publicaciones');
    }
  }
);

// thunk para crear publicación
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (new_post, { rejectWithValue }) => {
    try {
      const data = await postsApi.createPost(new_post);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear publicación');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // reducers para el formulario
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
      // limpiar error cuando el usuario escribe
      if (field === 'title') {
        state.form.title_error = '';
      } else if (field === 'body') {
        state.form.body_error = '';
      }
    },
    setFormError: (state, action) => {
      const { field, error } = action.payload;
      state.form[`${field}_error`] = error;
    },
    clearForm: (state) => {
      state.form = {
        title: '',
        body: '',
        title_error: '',
        body_error: '',
        is_expanded: state.form.is_expanded,
      };
    },
    toggleForm: (state) => {
      state.form.is_expanded = !state.form.is_expanded;
    },
    setFormExpanded: (state, action) => {
      state.form.is_expanded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // casos para loadPostsFromStorageThunk
      .addCase(loadPostsFromStorageThunk.pending, (state) => {
        state.is_loading_from_storage = true;
      })
      .addCase(loadPostsFromStorageThunk.fulfilled, (state, action) => {
        state.is_loading_from_storage = false;
        state.items = action.payload;
        // si hay posts guardados, el estado es 'succeeded', sino 'idle'
        state.status = action.payload.length > 0 ? 'succeeded' : 'idle'; // aca manejamos lo estados originales
      })
      .addCase(loadPostsFromStorageThunk.rejected, (state) => {
        state.is_loading_from_storage = false;
      })
      // casos para fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Error al obtener publicaciones';
      })
      // casos para addPost
      .addCase(addPost.pending, (state) => {
        state.is_adding_post = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.is_adding_post = false;
        // insertar el nuevo post al inicio
        state.items.unshift(action.payload);
        state.error = null;
        // limpiar el formulario después de publicar
        state.form = {
          title: '',
          body: '',
          title_error: '',
          body_error: '',
          is_expanded: false,
        };
      })
      .addCase(addPost.rejected, (state, action) => {
        state.is_adding_post = false;
        state.error = action.payload || action.error.message || 'Error al crear publicación';
      });
  },
});

// exportar acciones del formulario
export const {
  setFormField,
  setFormError,
  clearForm,
  toggleForm,
  setFormExpanded,
} = postsSlice.actions;

export default postsSlice.reducer;

