<template>
  <div>
    <h1>Collections</h1>
    <ul>
      <li v-for="collection in collections" :key="collection.id">
        ID: {{ collection.id }} | Name: {{ collection.name }} | Email: {{ collection.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/plugins/api';

export default {
  data() {
    return {
      collections: [],
    };
  },
  async mounted() {
    try {
      // Fetch collections data from the backend
      this.collections = await api.getAllCollections();

      // Check if data is fetched
      console.log('Collections:', this.collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  },
};
</script>
