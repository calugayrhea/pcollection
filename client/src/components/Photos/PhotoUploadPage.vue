<template>
  <div class="photo-upload-page">
    <Header />
    <h2 class="text-3xl font-semibold mb-4">{{ collectionName }} - Upload Photos</h2>

    <div class="bg-gradient-to-r from-blue-500 to-indigo-700 rounded-lg shadow-md p-4 mx-auto max-w-screen-xl">
      <form @submit.prevent="uploadPhotos" class="space-y-4">
        <div class="mb-4">
          <label for="photos" class="block font-semibold text-white mb-2">Select Photos:</label>
          <input type="file" id="photos" ref="photosInput" multiple class="p-2 border rounded-md w-full bg-gray-100 text-indigo-800" @change="onFileChange" />
        </div>
        <div v-if="selectedPhotos.length > 0" class="mb-4">
          <h3 class="text-lg font-semibold text-white mb-2">Selected Photos:</h3>
          <div class="flex flex-wrap items-center">
            <template v-for="photo in selectedPhotos">
              <img :src="photo" class="w-20 h-20 rounded-md m-1 border border-indigo-500" />
            </template>
          </div>
        </div>

        <div class="flex justify-center">
          <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition duration-300">
            <span class="mr-2">Save</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 inline">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </button>
        </div>
      </form>
    </div>

    <div v-if="showSuccessMessage" class="mt-4">
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm">
        <p class="font-semibold">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="showErrorMessage" class="mt-4">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
        <p class="font-semibold">{{ errorMessage }}</p>
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
      showSuccessMessage: false,
      successMessage: '',
      showErrorMessage: false,
      errorMessage: '',
      collectionName: '',
      selectedPhotos: [], 
    };
  },

  async mounted() {
    await this.fetchCollectionInfo();
  },

  methods: {
    async fetchCollectionInfo() {
      try {
        const collectionId = this.$route.params.collectionId;
        const collection = await api.getCollectionById(collectionId);

        this.collectionName = collection.name;
      } catch (error) {
        console.error('Error fetching collection info:', error);
      }
    },

    async uploadPhotos() {
      const formData = new FormData();
      const photosInput = this.$refs.photosInput;

      for (let i = 0; i < photosInput.files.length; i++) {
        formData.append('photos', photosInput.files[i]);
      }

      try {
        const response = await api.uploadPhotos(this.$route.params.collectionId, formData);

        if (response.error) {
          this.showErrorMessage = true;
          this.errorMessage = response.error;
          photosInput.value = '';
        } else if (response.message) {
          this.showSuccessMessage = true;
          this.successMessage = response.message;
          photosInput.value = '';
        }
      } catch (error) {
        console.error('Error uploading photos:', error);

        if (error.response && error.response.data && error.response.data.error) {
          this.showErrorMessage = true;
          this.errorMessage = error.response.data.error;
          photosInput.value = '';
        } else {
          this.showErrorMessage = true;
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          photosInput.value = '';
        }
      }
    },
    onFileChange(event) {
      const files = event.target.files;
      this.selectedPhotos = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const objectURL = URL.createObjectURL(file);
        this.selectedPhotos.push(objectURL);
      }
    },
  },
};
</script>
