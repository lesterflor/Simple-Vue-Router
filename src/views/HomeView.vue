<template>
  <main>
    <h1 class="text-2xl font-bold mb-4">Recipe Book</h1>
    <div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes"
        class="border rounded mb-4 w-full"
      />
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
