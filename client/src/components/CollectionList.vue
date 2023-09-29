<template>
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-semibold mb-4">Your Collections</h2>

    <!-- Filter Input -->
    <input
      v-model="filter"
      placeholder="Filter collections..."
      class="p-3 border rounded-md mb-4 w-full lg:w-1/2 xl:w-1/3"
    />

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div
        v-for="collection in displayedCollections"
        :key="collection.id"
        class="bg-white shadow-md rounded-md p-4"
      >
        <!-- Collection Icon (You can use an icon library like FontAwesome) -->
        <div class="text-3xl text-gray-500 mb-2">
          <i class="far fa-folder"></i>
        </div>
        <h3 class="text-xl font-semibold line-clamp-2">{{ collection.name }}</h3>
        <p class="text-gray-500 line-clamp-1">Owner: {{ collection.owner_email }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 text-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 mr-2 bg-gray-300 text-gray-600 rounded-md cursor-pointer"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage * pageSize >= filteredCollections.length"
        class="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
      >
        Next
      </button>
    </div>
  </div>
</template>
















<script>
import api from '@/plugins/api';

export default {
  data() {
    return {
      collections: [], // Store collections retrieved from the backend
      filter: '', // Filter text
      pageSize: 5, // Number of items per page
      currentPage: 1, // Current page
    };
  },
  computed: {
    // Filtered collections based on filter text
    filteredCollections() {
      const filterText = this.filter.toLowerCase();
      return this.collections.filter(
        (collection) =>
          collection.name.toLowerCase().includes(filterText) ||
          collection.owner_email.toLowerCase().includes(filterText)
      );
    },
    // Paginate displayed collections based on current page and page size
    displayedCollections() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredCollections.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    // Fetch collections from the backend when the component is mounted
    await this.fetchCollections();
  },
  methods: {
    async fetchCollections() {
      try {
        const collections = await api.getAllCollections();
        this.collections = collections;
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredCollections.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
