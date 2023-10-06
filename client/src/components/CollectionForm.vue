<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <h1 class="text-3xl font-bold mb-4">Create a Collection</h1>
      <form @submit.prevent="createCollection" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            v-model="collection.name"
            required
            class="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-300"
          >
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="collection.email"
            required
            class="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-300"
          >
        </div>
        <!-- Display the created_at attribute (if it exists) -->
        <div v-if="collection.created_at">
          <label class="block text-sm font-medium text-gray-700">Created At:</label>
          <span>{{ collection.created_at }}</span>
        </div>
        <div>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Create Collection
          </button>
        </div>
      </form>
        <!-- Notification Modal -->
      <div v-if="notification.show" class="fixed inset-0 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div
            class="p-4 rounded-md flex flex-col items-center"
            :class="notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
          >
            <!-- Display larger icon at the top -->
            <img
              v-if="notification.type === 'success'"
              src="@/assets/images/right.png"
              alt="Success Icon"
              class="w-16 h-16 mb-4"
            />
            <img
              v-else
              src="@/assets/images/wrong.png"
              alt="Error Icon"
              class="w-16 h-16 mb-4"
            />
            <span
              class="text-lg"
              :class="notification.type === 'success' ? 'text-white' : 'text-white'"
            >
              {{ notification.message }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/api';

export default {
  setup() {
    const collection = ref({
      name: '',
      email: '',
      created_at: null, 
    });

    const notification = ref({ show: false, message: '', type: '' }); 

    const router = useRouter();

    const createCollection = async () => {
      try {
        console.log('Making API request...');
        const response = await api.createCollection(collection.value);
        console.log('API response:', response);

        notification.value = {
          message: response.message,
          type: 'success',
          show: true,
        };

        const newCollection = response.collection;

        if (newCollection.created_at) {
          collection.value.created_at = newCollection.created_at;
        }

        collection.value.name = '';
        collection.value.email = '';

        setTimeout(() => {
          router.push({ name: 'collection-list' });
        }, 1000); 

      } catch (error) {
        console.log('Error response:', error.response.data);
        console.error(error);

        if (error.response && error.response.data) {
          notification.value = {
            message: error.response.data.error,
            type: 'error',
            show: true,
          };
        } else {
          notification.value = {
            message: 'An error occurred while creating the collection.',
            type: 'error',
            show: true,
          };
        }
      }
    };

    return {
      collection,
      notification,
      createCollection,
    };
  },
};
</script>
