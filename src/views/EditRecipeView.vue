<template>
  <h1 class="text-2xl font-bold mb-4">Edit {{ theData?.name }}</h1>
  <form @submit.prevent="editRecipe" class="space-y-4">
    <div>
      <input v-model="newName" type="text" class="p-2 border rounded w-full" />
    </div>
    <div>
      <textarea v-model="newDescription" class="p-2 border rounded w-full" />
    </div>
    <button type="submit" class="px-4 py-2 bg-orange-200 text-white rounded hover:bg-orange-700">
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useRecipeStore();

const route = useRoute();

const router = useRouter();

const theData = computed(() => store.recipes[store.getRecipeIndex(route.params.id as string)]);

const newName = computed(() => {
  const result = theData.value?.name ?? 'nothing';

  return result;
});
const newDescription = computed(() => {
  const result = theData.value?.description ?? 'nothing';

  return result;
});

const editRecipe = () => {
  const recipe = store.editRecipe({
    id: route.params.id as string,
    name: newName.value,
    description: newDescription.value
  });

  // redirect to newly created route
  router.push({
    name: 'recipe',
    params: {
      id: recipe?.id
    }
  });
};

onMounted(() => {
  const idFound = store.getRecipeById(route.params.id as string);

  if (!idFound) {
    router.push({
      name: 'not-found'
    });
  }
});
</script>
