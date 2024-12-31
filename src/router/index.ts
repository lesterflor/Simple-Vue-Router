import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FavoritesView from '@/views/FavoritesView.vue';
import AddRecipesView from '@/views/AddRecipesView.vue';
import RecipeView from '@/views/RecipeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import EditRecipeView from '@/views/EditRecipeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: AddRecipesView
    },
    {
      path: '/edit-recipe/:id',
      name: 'edit-recipe',
      component: EditRecipeView,
      alias: '/edit/:id'
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeView,
      alias: '/meal/:id'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
});

export default router;
