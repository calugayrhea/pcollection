<template>
  <div class="w-full relative">
    <Header style="z-index: 2;" /> 
    
    <div class="w-full lg:w-3/4 xl:w-3/4 mt-4" style="z-index: 1;"> 
      <h2 class="text-3xl font-semibold mb-4">Edit Collection</h2>

      <div class="bg-white rounded-lg shadow-lg p-4"> 
        <form @submit.prevent="updateCollection" class="space-y-4">
          <div class="flex flex-col space-y-2">
            <label for="editName" class="block text-sm font-medium text-gray-700">Name:</label>
            <input v-model="editedCollection.name" type="text" id="editName" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
          </div>
          <div class="flex flex-col space-y-2">
            <label for="editEmail" class="block text-sm font-medium text-gray-700">Email:</label>
            <input v-model="editedCollection.email" type="email" id="editEmail" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
          </div>
          <div class="flex space-x-2 justify-end">
            <button type="button" class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/api';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  setup() {
    const editedCollection = ref({
      id: null,
      name: '',
      email: '',
    });

    const router = useRouter();

    const updateCollection = async () => {
      try {
        const collectionId = editedCollection.value.id;
        const newCollectionData = {
          name: editedCollection.value.name,
          email: editedCollection.value.email,
        };

        const response = await api.updateCollection(collectionId, newCollectionData);

        if (response && response.message === 'Successfully updated') {
          router.push({ name: 'collection-list' });
        } else {
          // Handle the case where the API response indicates an error
          // You can show an error message or take other appropriate actions.
        }
      } catch (error) {
        console.error('Error updating collection:', error);
        // Handle the error, show an error message to the user, etc.
      }
    };

    return {
      editedCollection,
      updateCollection,
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>

