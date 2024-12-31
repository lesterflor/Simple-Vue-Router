<template>
  <div>Recipe {{ $route.params.id }}</div>
  <nav>
    <ul>
      <li>
        <RouterLink
          :to="{
            name: 'recipe',
            params: {
              id: 1
            }
          }"
          >Recipe 1</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :to="{
            name: 'recipe',
            params: {
              id: 3
            }
          }"
          >Recipe 3</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const route = useRoute();
console.log(route);

onMounted(() => {
  console.log(`fetching data on mounted`);
});

watch(
  () => route.params.id,
  () => {
    console.log('fetching inside watch');
  },
  { immediate: true }
);
</script>
