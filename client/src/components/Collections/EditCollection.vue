<template>
  <div class="flex flex-col h-screen">
    <Header class="w-full" />
    <div class="flex-grow flex flex-col items-center py-8">
      <h3 class="text-2xl font-semibold mb-4">Edit Collection</h3>
      <form @submit.prevent="updateCollection" class="bg-white p-6 rounded-lg shadow-md w-80">
        <div class="mb-4">
          <label for="editName" class="block text-gray-700">Name:</label>
          <input v-model="editedCollection.name" type="text" id="editName" class="border rounded-md p-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="editEmail" class="block text-gray-700">Owner Email:</label>
          <input v-model="editedCollection.owner_email" type="text" id="editEmail" class="border rounded-md p-2 w-full" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Update</button>
          <button @click="cancelEdit" class="bg-gray-300 text-gray-600 px-4 py-2 rounded-md ml-2">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>


import Header from '@/components/Header.vue';
import api from '@/plugins/api';

export default {
  components: {
    Header,
  },
  data() {
    return {
      collectionId: this.$route.params.id,
      editedCollection: {},
      errorMessage: '',
    };
  },
  computed: {
    isUserOwner() {
      return this.userEmailAddress === this.editedCollection.owner_email;
    },
  },
  methods: {
    async fetchData() {
      try {
        const collection = await api.getCollectionById(this.collectionId);
        if (collection) {
          this.editedCollection = { ...collection };
        } else {
          // Handle case where collection is not found
          this.errorMessage = 'Collection not found.';
        }
      } catch (error) {
        this.errorMessage = 'Failed to fetch collection data. Please try again.';
        console.error(error);
      }
    },
    async updateCollection() {
  if (this.isUserOwner) {
    try {
      const response = await api.updateCollection(this.collectionId, this.editedCollection);
      if (response) {
        this.$router.push({ name: 'collection-list' }); // Redirect to collection-list route
      }
    } catch (error) {
      this.errorMessage = 'Failed to update the collection. Please try again.';
      console.error(error);
    }
  } else {
    this.errorMessage = 'You are not the owner of this collection. Editing is not allowed.';
  }
},


    cancelEdit() {
      this.$emit('cancel-edit');
    },
  },
  created() {
    this.fetchData();
  },
};
</script>