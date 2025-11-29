import { createSelector } from '@reduxjs/toolkit';

const selectPostsState = (state) => state.posts;

// selector base para el estado de posts
export const selectPostsState_base = selectPostsState;

// selector para los items (posts)
export const selectPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.items
);

// selector para el estado de carga
export const selectPostsStatus = createSelector(
  [selectPostsState],
  (postsState) => postsState.status
);

// selector para verificar si está cargando
export const selectIsLoadingPosts = createSelector(
  [selectPostsStatus],
  (status) => status === 'loading'
);

// selector para verificar si está cargando desde storage
export const selectIsLoadingFromStorage = createSelector(
  [selectPostsState],
  (postsState) => postsState.is_loading_from_storage
);

// selector para el error
export const selectPostsError = createSelector(
  [selectPostsState],
  (postsState) => postsState.error
);

// selector para verificar si se está agregando un post
export const selectIsAddingPost = createSelector(
  [selectPostsState],
  (postsState) => postsState.is_adding_post
);

// selector para el estado del formulario
export const selectFormState = createSelector(
  [selectPostsState],
  (postsState) => postsState.form
);

// selector para verificar si el formulario es válido
export const selectIsFormValid = createSelector(
  [selectFormState],
  (form) => {
    const title = form.title.trim();
    const body = form.body.trim();
    return (
      title.length >= 3 &&
      body.length >= 10 &&
      !form.title_error &&
      !form.body_error
    );
  }
);

// selector para verificar si el formulario está expandido
export const selectIsFormExpanded = createSelector(
  [selectFormState],
  (form) => form.is_expanded
);

