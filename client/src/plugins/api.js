import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export default {
  async createCollection(collectionData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/collections`, collectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllCollections() {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getCollectionById(collectionId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections/${collectionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateCollection(collectionId, collectionData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/collections/${collectionId}`, collectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteCollection(collectionId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/collections/${collectionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async uploadPhotos(collectionId, files) {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('photos', file);
      });

      const response = await axios.post(`${API_BASE_URL}/collections/${collectionId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllPhotosByCollectionId(collectionId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections/${collectionId}/photos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deletePhoto(collectionId, photoId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/collections/${collectionId}/photos/${photoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
