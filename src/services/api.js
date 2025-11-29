import { API_ENDPOINTS, API_CONFIG } from '../constants/api';

// servicio para llamadas a la api de posts
export const postsApi = {
  // obtenemos la laista de posts desde la api
  fetchPosts: async (limit = API_CONFIG.POSTS_LIMIT) => {
    const response = await fetch(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}?_limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Error al obtener publicaciones');
    }
    return response.json();
  },

  // crea un nuevo post en la api
  createPost: async (post) => {
    const response = await fetch(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.POSTS}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      }
    );
    if (!response.ok) {
      throw new Error('Error al crear publicación');
    }
    return response.json();
  },
};

