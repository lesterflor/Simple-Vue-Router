<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      {{ recipe?.name }}
    </h1>
    <p class="mb-4">{{ recipe?.description }}</p>
  </div>

  <div class="flex items-center gap-4">
    <div>
      <RouterLink
        :to="{
          name: 'edit-recipe',
          params: {
            id: recipe?.id
          }
        }"
        >Edit</RouterLink
      >
    </div>
    <button
      v-if="recipe"
      @click="recipeStore.toggleFavorite(recipe.id)"
      class="px-4 py-2 bg-orange-200 text-white rounded hover:bg-orange-700"
    >
      {{ isFavorite ? 'Remove from favourites' : 'Add to favourites' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const route = useRoute();
const recipeStore = useRecipeStore();

const recipe = computed(() => recipeStore.getRecipeById(route.params.id as string));

const isFavorite = computed(() => (recipe.value ? recipeStore.isFavorite(recipe.value.id) : false));
</script>
