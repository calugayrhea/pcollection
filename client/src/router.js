import { createRouter, createWebHistory } from 'vue-router';
import CollectionList from './components/CollectionList.vue';
import CollectionForm from './components/CollectionForm.vue';
import EditCollection from './components/Collections/EditCollection.vue'; 

const routes = [
  { path: '/', redirect: '/collection-form' },
  { path: '/collection-list', name: 'collection-list', component: CollectionList },
  { path: '/collection-form', name: 'collection-form', component: CollectionForm },
  // Add a route for editing collections with a dynamic parameter
  { path: '/edit-collection/:id', name: 'edit-collection', component: EditCollection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
