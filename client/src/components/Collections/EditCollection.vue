<template>
  <div class="w-full relative flex justify-center items-center min-h-screen">
    <div class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2">
      <div class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-3xl font-semibold mb-4">Edit Collection</h2>
        <div v-show="responseMessage || errorMessage" class="fixed bottom-0 right-0 mb-4 mr-4 z-50 transition-transform transform translate-x-full">
          <div
            class="bg-white rounded-lg shadow-md p-4 flex items-center transition-transform transform -translate-x-full"
            :class="{ 'translate-x-0': responseMessage || errorMessage }"
          >
            <img
              v-if="responseMessage"
              src="@/assets/images/right.png"
              alt="Right Icon"
              class="w-6 h-6 text-green-500 mr-2"
            />
            <p v-show="responseMessage" class="text-green-500 font-bold ml-2">{{ responseMessage }}</p>

            <img
              v-if="errorMessage"
              src="@/assets/images/wrong.png"
              alt="Wrong Icon"
              class="w-6 h-6 text-red-500 mr-2"
            />
            <p v-show="errorMessage" class="text-red-500 font-bold ml-2">{{ errorMessage }}</p>
          </div>
        </div>

        <form @submit.prevent="updateCollection" class="space-y-4">
          <div class="flex flex-col space-y-2">
            <label for="editName" class="block text-sm font-medium text-gray-700">Name:</label>
            <input v-model="editedCollection.name" type="text" id="editName" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
          </div>
          <div class="flex flex-col space-y-2">
            <label for="editEmail" class="block text-sm font-medium text-gray-700">Email:</label>
            <input v-model="editedCollection.owner_email" type="email" id="editEmail" required class="p-2 border rounded-md focus:ring focus:ring-indigo-300">
          </div>
          <div class="flex space-x-2 justify-end">
            <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">Update</button>
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
    const responseMessage = ref('');

    const updateCollection = async () => {
      try {
        const collectionId = editedCollection.value.id;
        const newName = editedCollection.value.name;
        const newEmail = editedCollection.value.owner_email;

        const response = await api.updateCollection(collectionId, {
          name: newName,
          email: newEmail,
        });

        if (response.message) {
          responseMessage.value = response.message;

          setTimeout(() => {
            responseMessage.value = '';
            router.push('/collection-list');
          }, 1000);
        }
      } catch (error) {
        console.error('Error updating collection:', error);

        if (error.response && error.response.data) {
          errorMessage.value = error.response.data.error;

          setTimeout(() => {
            errorMessage.value = '';
          }, 1000);
        } else {
          errorMessage.value = 'An error occurred while updating the collection.';
        }
      }
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
      errorMessage,
      responseMessage,
    };
  },
};
</script>
