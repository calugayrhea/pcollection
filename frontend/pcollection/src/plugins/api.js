// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

export default {

  async getAllCollections() {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
