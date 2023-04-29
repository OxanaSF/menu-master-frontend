import { IRecipeIngredient } from "./IRecipeIngredient";

export interface IIngredient {
  ingredientId: number;
  name: string;
  recipeIngredients: IRecipeIngredient[];
}
