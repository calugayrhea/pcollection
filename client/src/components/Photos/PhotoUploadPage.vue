<template>
  <div class="photo-upload-page">
    <Header />
    <h2 class="text-3xl font-semibold mb-4">{{ collectionName }} - Upload Photos</h2>

    <form @submit.prevent="uploadPhotos">
      <div class="mb-4">
        <label for="photos" class="block font-semibold mb-2">Select Photos:</label>
        <input type="file" id="photos" ref="photosInput" multiple class="p-2 border rounded-md w-full" />
      </div>

      <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md">Upload</button>
    </form>

    <div v-if="showSuccessMessage" class="mt-4">
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md" role="alert">
        <p class="font-semibold">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="showErrorMessage" class="mt-4">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
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
}














  },
};
</script>
