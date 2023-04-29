import { RecipeIngredientModel } from "./RecipeIngredientModel";

export interface IngredientModel {
  ingredientId: number;
  name: string;
  recipeIngredients: RecipeIngredientModel[];
}
