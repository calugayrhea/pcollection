import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

async function apiCall(method, url, data) {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  async createCollection(collectionData) {
    return apiCall('post', `${API_BASE_URL}/collections`, collectionData);
  },

  async getAllCollections() {
    return apiCall('get', `${API_BASE_URL}/collections`);
  },

  async getCollectionById(collectionId) {
    return apiCall('get', `${API_BASE_URL}/collections/${collectionId}`);
  },

  async updateCollection(collectionId, collectionData) {
    return apiCall('put', `${API_BASE_URL}/collections/${collectionId}`, collectionData);
  },

  async deleteCollection(collectionId) {
    return apiCall('delete', `${API_BASE_URL}/collections/${collectionId}`);
  },

  async uploadPhotos(collectionId, formData) {
    return apiCall('post', `${API_BASE_URL}/collections/${collectionId}/photos`, formData);
  },

  async getAllPhotosByCollectionId(collectionId) {
    return apiCall('get', `${API_BASE_URL}/collections/${collectionId}/photos`);
  },

  async deletePhoto(collectionId, photoId, email) {
    return apiCall('delete', `${API_BASE_URL}/collections/${collectionId}/photos/${photoId}`, { email });
  },
};
