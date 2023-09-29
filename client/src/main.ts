import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router instance

import './assets/main.css'; // Import your CSS files
import './index.css'; // Import your index.css file

createApp(App)
  .use(router) // Use the router
  .mount('#app');
