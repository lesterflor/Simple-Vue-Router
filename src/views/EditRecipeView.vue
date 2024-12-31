<template>
  <h1>Edit {{ theData?.name }}</h1>
  <form @submit.prevent="editRecipe">
    <div>
      <input v-model="newName" type="text" />
    </div>
    <div>
      <textarea v-model="newDescription" />
    </div>
    <button type="submit">Submit</button>
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
