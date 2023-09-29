<template>
    <div>
      <h1 class="text-3xl font-bold mb-4">Upload Photos to Collection</h1>
      <form @submit.prevent="uploadPhotos" class="space-y-4">
        <div>
          <label for="photo" class="block text-sm font-medium text-gray-700">Select Photos:</label>
          <input
            type="file"
            id="photo"
            ref="photoInput"
            accept="image/*"
            multiple
            class="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-300"
          >
        </div>
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title (optional):</label>
          <input
            type="text"
            id="title"
            v-model="photoTitle"
            class="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-300"
          >
        </div>
        <div>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Upload Photos
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import api from '@/plugins/api';

export default {
  data() {
    return {
      photoTitle: '',
    };
  },
  methods: {
    async uploadPhotos() {
      try {
        const photoInput = this.$refs.photoInput;
        if (!photoInput.files.length) {
          console.error('No photos selected.');
          return;
        }

        const formData = new FormData();
        formData.append('collectionId', /* Add the collection ID here */);
        formData.append('title', this.photoTitle);

        // Append selected photos to the form data
        for (let i = 0; i < photoInput.files.length; i++) {
          formData.append('photos', photoInput.files[i]);
        }

        // Send the form data to the backend for photo upload
        const response = await api.uploadPhotos(formData);

        // Handle success or display an appropriate message
        console.log('Photos uploaded successfully:', response);

        // Reset the form fields
        this.photoTitle = '';
        photoInput.value = '';
      } catch (error) {
        console.error('Error uploading photos:', error);
      }
    },
  },
};
</script>
