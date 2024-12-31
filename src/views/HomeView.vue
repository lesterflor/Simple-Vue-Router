<template>
  <main>
    <h1>Recipe Book</h1>
    <div>
      <input v-model="searchQuery" type="text" placeholder="Search recipes" />
    </div>
    <RecipeList :recipes="filteredRecipes" />
  </main>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { computed, ref } from 'vue';
import RecipeList from '@/components/RecipeList.vue';

const recipeStore = useRecipeStore();

const searchQuery = ref('');
const filteredRecipes = computed(() => recipeStore.filteredRecipes(searchQuery.value));
</script>
