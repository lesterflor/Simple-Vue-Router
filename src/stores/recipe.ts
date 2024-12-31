import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface IRecipe {
  id: string;
  name: string;
  description: string;
}

type NewRecipe = Omit<IRecipe, 'id'>;

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<IRecipe[]>([]);

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

  //const searchQuery = ref('');

  const filteredRecipes = (searchQuery: string) =>
    recipes.value.filter((recipe) => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return {
    recipes,
    addRecipe,
    getRecipeById,
    filteredRecipes
  };
});
