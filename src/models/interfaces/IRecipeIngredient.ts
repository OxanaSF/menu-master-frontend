import { IIngredient } from "./IIngredient";
import { IRecipe } from "./IRecipe";

export interface IRecipeIngredient {
  recipeIngredientId: number;
  recipe: IRecipe;
  ingredient: IIngredient;
}
