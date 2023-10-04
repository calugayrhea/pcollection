<template>
  <div class="w-full">
    <Header />
    <h2 class="text-3xl font-semibold mb-4">Your Collections</h2>

    <div class="flex flex-col items-center mb-4">
      <div class="bg-white rounded-lg shadow-lg p-4 w-full lg:w-3/4 xl:w-3/4">
        <!-- Filter Input with Vertically Centered Search Icon -->
        <div class="relative">
          <img
            src="@/assets/images/search.png"
            alt="Search Icon"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
          <input
            v-model="filter"
            placeholder="Filter collections..."
            class="pl-10 p-3 border rounded-md mb-4 w-full"
          />
        </div>
        <!-- End of Filter Input with Vertically Centered Search Icon -->

        <table class="w-full">
          <!-- Table Header -->
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Owner</th>
              <th class="p-3 text-left">Created</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr
              v-for="collection in displayedCollections"
              :key="collection.id"
              class="border-b border-gray-300"
            >
              <td class="p-3">
                <div class="flex items-center">
                  <img
                    src="@/assets/images/folder.png"
                    alt="Folder Icon"
                    class="w-6 h-6 mr-2"
                  />
                  {{ collection.name.charAt(0).toUpperCase() + collection.name.slice(1) }}
                </div>
              </td>
              <td class="p-3">{{ collection.owner_email }}</td>
              <td class="p-3">{{ collection.created_at || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination and Items per page dropdown with Border -->
        <div class="mt-4 flex flex-col lg:flex-row justify-between items-center border-t border-gray-300 pt-4">
          <div class="text-gray-600 mb-2 lg:mb-0">
            Showing {{ startResult }} to {{ endResult }} of {{ totalResults }} results
          </div>
          <div class="flex items-center space-x-2">
            <label for="pageSize" class="mr-2">Items per page:</label>
            <select v-model="pageSize" id="pageSize" class="p-2 border rounded-md">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <!-- Pagination buttons with Border -->
            <div class="flex mt-2 lg:mt-0">
              <button
                v-for="page in pageCount"
                :key="page"
                @click="goToPage(page)"
                class="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer border border-gray-400 border-solid border-2"
                :class="{ 'bg-gray-300 text-gray-600': currentPage === page }"
              >
                {{ page }}
              </button>
            </div>
            <!-- End of Pagination buttons with Border -->
          </div>
        </div>
        <!-- End of Pagination and Items per page dropdown with Border -->
      </div>
    </div>
  </div>
</template>




<script>
import api from '@/plugins/api';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },

  data() {
    return {
      collections: [],
      filter: '',
      pageSize: 5,
      currentPage: 1,
    };
  },
  computed: {
    filteredCollections() {
      const filterText = this.filter.toLowerCase();
      return this.collections.filter(
        (collection) =>
          collection.name.toLowerCase().includes(filterText) ||
          collection.owner_email.toLowerCase().includes(filterText)
      );
    },
    displayedCollections() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredCollections.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.filteredCollections.length / this.pageSize);
    },
    startResult() {
      if (this.filteredCollections.length === 0) return 0;
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    endResult() {
      const end = this.currentPage * this.pageSize;
      return end > this.filteredCollections.length
        ? this.filteredCollections.length
        : end;
    },
    totalResults() {
      return this.filteredCollections.length;
    },
  },
  async mounted() {
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
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
      }
    },
  },
  watch: {
    pageSize: {
      handler(newPageSize) {
        this.currentPage = 1;
      },
      immediate: true,
    },
  },
};
</script>
