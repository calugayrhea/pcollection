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
      created_at: null, // Initialize created_at to null
    });

    const router = useRouter();

    const createCollection = async () => {
      try {
        const response = await api.createCollection(collection.value);
        const newCollection = response.collection;

        // Update the created_at attribute if it exists in the response
        if (newCollection.created_at) {
          collection.value.created_at = newCollection.created_at;
        }

        collection.value.name = '';
        collection.value.email = '';

        router.push({ name: 'collection-list' });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      collection,
      createCollection,
    };
  },
};
</script>
