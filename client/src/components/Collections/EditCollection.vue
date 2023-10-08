
<template>
  <div class="w-full relative flex justify-center items-center min-h-screen">
    <!-- Removed Header -->

    <div class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2"> 
      <div class="bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-3xl font-semibold mb-4">Edit Collection</h2>

        <form @submit.prevent="updateCollection" class="space-y-4">
          <div class="flex flex-col space-y-2">
            <label for="editName" class="block text-sm font-medium text-gray-700">Name:</label>
            <input v-model="editedCollection.name" type="text" id="editName" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
          </div>
          <div class="flex flex-col space-y-2">
            <label for="editEmail" class="block text-sm font-medium text-gray-700">Email:</label>
            <input v-model="editedCollection.owner_email" type="email" id="editEmail" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
          </div>
          <!-- Error message display -->
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
          <div class="flex space-x-2 justify-end">
            <button @click="cancelUpdate" type="button" class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md hover-bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
      owner_email: '',
    });

    const originalCollection = ref(null);

    const router = useRouter();

    const errorMessage = ref(''); 

    const updateCollection = async () => {
      try {
        const collectionId = editedCollection.value.id;
        const newName = editedCollection.value.name;
        const newEmail = editedCollection.value.owner_email;

        if (newEmail !== originalCollection.value.owner_email) {

          errorMessage.value = "Authorization Failedssss: You don't have permission to update this collection.";
          return;
        }

        const response = await api.updateCollection(collectionId, {
          name: newName,
          email: newEmail, 
        });

        console.log('Update Response:', response);
        if (response) {
          router.push('/collection-list');
        }
      } catch (error) {
        console.error('Error updating collection:', error);
      }
    };

    const cancelUpdate = () => {
      router.push('/collection-list');
    };

    onMounted(async () => {
      try {
        const collectionId = router.currentRoute.value.params.id;
        const response = await api.getCollectionById(collectionId);
        if (response) {
          editedCollection.value = { ...response };
          originalCollection.value = { ...response };
        }
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    });

    return {
      editedCollection,
      updateCollection,
      cancelUpdate,
      errorMessage, 
    };
  },
};
</script>
