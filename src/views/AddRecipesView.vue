<template>
  <h1 class="text-2xl font-bold mb-4">Add Recipe</h1>
  <form @submit.prevent="addRecipe" class="space-y-4">
    <div>
      <input
        type="text"
        v-model="name"
        placeholder="Recipe name"
        required
        class="p-2 border rounded w-full"
      />
    </div>
    <div>
      <textarea
        v-model="description"
        class="p-2 border rounded w-full"
        placeholder="Recipe description"
        required
      />
    </div>
    <button type="submit" class="px-4 py-2 bg-orange-200 text-white rounded hover:bg-orange-700">
      Add
    </button>
  </form>
</template>

<script setup lang="ts">
import { useRecipeStore, type IRecipe } from '@/stores/recipe';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useRecipeStore();

const name = ref('');
const description = ref('');

const router = useRouter();

const addRecipe = () => {
  // update store
  const recipe: IRecipe = store.addRecipe({
    name: name.value,
    description: description.value
  });

  // redirect to newly created route
  router.push({
    name: 'recipe',
    params: {
      id: recipe.id
    }
  });
};
</script>
