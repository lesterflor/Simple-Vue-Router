import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface IRecipe {
  id: string;
  name: string;
  description: string;
}

type NewRecipe = Omit<IRecipe, 'id'>;

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<IRecipe[]>([]);

  const favoriteIds = ref<string[]>([]);

  const toggleFavorite = (id: string) => {
    if (favoriteIds.value?.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);
    } else {
      favoriteIds.value?.push(id);
    }
  };

  const isFavorite = (id: string) => favoriteIds.value?.includes(id);

  const addRecipe = (recipe: NewRecipe): IRecipe => {
    // create the stored recipe
    const newRecipe = {
      ...recipe,
      id: Date.now().toString()
    };

    // push it to the store
    recipes.value.push(newRecipe);

    // return the new recipe to the calling view
    return newRecipe;
  };

  const getRecipeById = (id: string) => recipes.value.find((recipe) => recipe.id === id);

  const getRecipeIndex = (id: string) => recipes.value.findIndex((obj) => obj.id === id);

  //const searchQuery = ref('');

  const filteredRecipes = (searchQuery: string) =>
    recipes.value.filter((recipe) => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const editRecipe = (recipe: IRecipe) => {
    let foundRecipe = getRecipeById(recipe.id);

    const index = getRecipeIndex(recipe.id);

    if (foundRecipe) {
      foundRecipe = {
        ...recipe,
        name: recipe.name,
        description: recipe.description
      };

      recipes.value[index] = foundRecipe;
    } else {
      console.error(`Recipe ${recipe.name} was not found!`);
    }

    return foundRecipe;
  };

  const favoriteRecipes = computed(() =>
    recipes.value.filter((rec) => favoriteIds.value.includes(rec.id))
  );

  return {
    recipes,
    addRecipe,
    getRecipeById,
    filteredRecipes,
    editRecipe,
    getRecipeIndex,
    toggleFavorite,
    isFavorite,
    favoriteIds,
    favoriteRecipes
  };
});
