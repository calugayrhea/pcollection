<template>
  <div class="photo-upload-page">
    <Header />
    <h2 class="text-3xl font-semibold mb-4">{{ collectionName }} - Collections Photo</h2>

    <div class="bg-white rounded-lg shadow-md p-4 mx-auto max-w-screen-xl">
      <form @submit.prevent="uploadPhotos" class="space-y-4">
        <div class="mb-4">
          <label for="photos" class="block font-semibold mb-2">Select Photos:</label>
          <input type="file" id="photos" ref="photosInput" multiple class="p-2 border rounded-md w-full"
            @change="onFileChange" />
        </div>

        <div v-if="selectedPhotos.length > 0" class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Selected Photos:</h3>
          <div class="flex flex-wrap">
            <template v-for="photo in selectedPhotos">
              <transition name="fade" mode="out-in">
                <img :src="photo" class="w-20 h-20 rounded-md ml-1" :class="{ 'opacity-0': fadeSelectedPhotos }"
                  :key="photo" />
              </transition>
            </template>
          </div>
        </div>
        <div class="flex items-center">
          <button type="submit" class="px-2 py-1 bg-indigo-500 text-white rounded-md">Save</button>
        </div>
      </form>
    </div>

    <div class="mx-auto mt-4 max-w-screen-xl">
      <div v-if="fetchedPhotos.length > 0">
        <div class="w-1/3 px-4 pb-4">
          <label for="photoSize" class="block font-semibold mb-2">Adjust Photo Size:</label>
          <input type="range" id="photoSize" v-model="photoSizePercentage" min="10" max="200" step="10" class="w-full" />
          <span class="text-sm">{{ photoSizePercentage }}%</span>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-4 max-w-screen-xl">
      <div v-if="fetchedPhotos.length > 0">
        <h3 class="text-lg font-semibold mb-2"></h3>
        <div class="flex flex-wrap">
          <template v-for="photo in fetchedPhotos">
            <img :src="photo.url" class="rounded-md ml-1" :style="{ width: photoSizePercentage + '%', height: 'auto' }" />
          </template>
        </div>
      </div>
    </div>

    <div v-if="showSuccessMessage || showErrorMessage" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-md p-4 w-1/2">
        <div v-if="showSuccessMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md"
          role="alert">
          <div class="flex items-center">
            <img src="@/assets/images/right.png" alt="Success Icon" class="w-6 h-6 mr-2" />
            <p class="font-semibold">{{ successMessage }}</p>
          </div>
        </div>
        <div v-if="showErrorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md"
          role="alert">
          <div class="flex items-center">
            <img src="@/assets/images/wrong.png" alt="Error Icon" class="w-6 h-6 mr-2" />
            <p class="font-semibold">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>





<script>
import api from '@/plugins/api';
import Header from '@/components/Header.vue';
const API_BASE_URL = 'http://localhost:3000/api';

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
      fetchedPhotos: [],
      fadeSelectedPhotos: false,
      photoSizePercentage: 30,
      fetchedPhotos: [
      ],
    };
  },

  async mounted() {
    await this.fetchCollectionInfo();
    await this.fetchAndDisplayFetchedPhotos();
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

    closeMessages() {
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
    },
    autoCloseMessages() {
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.showErrorMessage = false;
      }, 1000);
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
          this.fadeSelectedPhotos = true;
          this.showErrorMessage = true;
          this.errorMessage = response.error;
          photosInput.value = '';
          this.autoCloseMessages();
        } else if (response.message) {
          this.fadeSelectedPhotos = true;
          this.showSuccessMessage = true;
          this.successMessage = response.message;
          photosInput.value = '';
          this.autoCloseMessages();

          setTimeout(() => {
            this.fadeSelectedPhotos = false;
            this.selectedPhotos = [];
          }, 1000);

          await this.fetchAndDisplayFetchedPhotos();
        }
      } catch (error) {
        console.error('Error uploading photos:', error);

        if (error.response && error.response.data && error.response.data.error) {
          this.fadeSelectedPhotos = true;
          this.showErrorMessage = true;
          this.errorMessage = error.response.data.error;
          photosInput.value = '';
          this.autoCloseMessages();
        } else {
          this.fadeSelectedPhotos = true;
          this.showErrorMessage = true;
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          photosInput.value = '';
          this.autoCloseMessages();
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

    async fetchAndDisplayFetchedPhotos() {
      try {
        const collectionId = this.$route.params.collectionId;
        const photos = await api.getAllPhotosByCollectionId(collectionId);

        this.fetchedPhotos = photos.map((photo) => ({
          url: `${API_BASE_URL}/${photo.file_path.replace(/\\/g, '/')}`,
        }));
      } catch (error) {
        console.error('Error fetching and displaying fetched photos:', error);
      }
    },

  },
};
</script>