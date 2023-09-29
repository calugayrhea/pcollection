import { createRouter, createWebHistory } from 'vue-router';
import CollectionList from './components/CollectionList.vue';
import CollectionForm from './components/CollectionForm.vue';

const routes = [
  { path: '/', redirect: '/collection-form' }, // Redirect to collection-form
  { path: '/collection-list', name: 'collection-list', component: CollectionList },
  { path: '/collection-form', name: 'collection-form', component: CollectionForm },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
