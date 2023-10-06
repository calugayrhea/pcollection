<template>
  <div class="w-full">
    <Header />
    <h2 class="text-3xl font-semibold mb-4">Your Collections</h2>

    <div class="flex flex-col items-center mb-4">
      <div class="bg-white rounded-lg shadow-lg p-4 w-full lg:w-3/4 xl:w-3/4">
        <!-- Filter Input with Vertically Centered Search Icon -->
        <div class="relative">
          <img src="@/assets/images/search.png" alt="Search Icon"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          <input v-model="filter" placeholder="Filter collections..." class="pl-10 p-3 border rounded-md mb-4 w-full" />
        </div>
        <!-- End of Filter Input with Vertically Centered Search Icon -->

        <table class="w-full">
          <!-- Table Header -->
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Owner</th>
              <th class="p-3 text-left">Created</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr v-for="collection in displayedCollections" :key="collection.id" class="border-b border-gray-300">
              <td class="p-3">
                <div class="flex items-center">
                  <img src="@/assets/images/folder.png" alt="Folder Icon" class="w-6 h-6 mr-2 cursor-pointer" />
                  {{ collection.name.charAt(0).toUpperCase() + collection.name.slice(1) }}
                </div>
              </td>
              <td class="p-3">{{ collection.owner_email }}</td>
              <td class="p-3">{{ collection.created_at || 'N/A' }}</td>
              <td class="p-3 flex justify-start ml-2">
                <!-- Add an edit icon to open the modal -->
                <img src="@/assets/images/edit.png" alt="Edit Icon" class="cursor-pointer w-6 h-6" @click="openEditModal(collection)" />
                <img src="@/assets/images/delete.png" alt="Delete Icon" class="cursor-pointer w-6 h-6 mr-2" @click="deleteCollection(collection)" />
              </td>
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
            <div class="flex mt-2 lg:mt-0">
              <button v-for="page in pageCount" :key="page" @click="goToPage(page)"
                class="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer border border-gray-400 border-solid border-2"
                :class="{ 'bg-gray-300 text-gray-600': currentPage === page }">
                {{ page }}
              </button>
            </div>
          </div>
        </div>
        <!-- End of Pagination and Items per page dropdown with Border -->
      </div>
    </div>

<!-- Edit Modal -->
<div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
  <div class="bg-white p-4 rounded-lg shadow-lg w-96 h-auto overflow-y-auto">
    <h2 class="text-lg font-semibold mb-4 text-center">Edit Collection</h2>
    <form @submit.prevent="updateCollection" class="space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="editName" class="block text-sm font-medium text-gray-700">Name:</label>
        <input v-model="editedCollection.name" type="text" id="editName" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
      </div>
      <div class="flex flex-col space-y-2">
        <label for="editEmail" class="block text-sm font-medium text-gray-700">Email:</label>
        <input v-model="editedCollection.email" type="email" id="editEmail" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
      </div>
      <div class="text-center mt-4">
        <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">Update</button>
        <button type="button" class="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300" @click="closeEditModal">Cancel</button>
      </div>
    </form>
  </div>
</div>
<!-- End of Edit Modal -->



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
      loading: false,
      error: '',
      isEditModalOpen: false,
      editedCollection: {
        id: null,
        name: '',
        email: '',
      },
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
      this.loading = true;
      try {
        const collections = await api.getAllCollections();
        this.collections = collections;
      } catch (error) {
        console.error('Error fetching collections:', error);
        this.error = 'Failed to fetch collections. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
      }
    },
    openEditModal(collection) {
      this.isEditModalOpen = true;
      this.editedCollection.id = collection.id;
      this.editedCollection.name = collection.name;
      this.editedCollection.email = collection.owner_email;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editedCollection.id = null;
      this.editedCollection.name = '';
      this.editedCollection.email = '';
    },






async updateCollection() {
  try {
    const updatedCollection = this.editedCollection;
    const collectionId = updatedCollection.id;
    
    // Make sure the email in the request matches the owner's email for the collection
    if (updatedCollection.email === this.collections.find(collection => collection.id === collectionId).owner_email) {
      // Make the API call to update the collection
      await api.updateCollection(collectionId, updatedCollection);
      
      // If the update is successful, close the edit modal and reset the editedCollection
      this.closeEditModal();
    } else {
      // Handle the case where the provided email doesn't match the owner's email
      // You can show an error message or take other appropriate actions.
    }
  } catch (error) {
    console.error('Error updating collection:', error);
    // Handle the error, show an error message to the user, etc.
  }
}






























    // Implement the deleteCollection function
    // ...
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

<style scoped>
/* Add your custom styles here */
</style>
