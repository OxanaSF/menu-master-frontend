import { IngredientModel } from "./IngredientModel";
import { RecipeModel } from "./RecipeModel";

export interface RecipeIngredientModel {
  recipeIngredientId: number;
  recipe: RecipeModel;
  ingredient: IngredientModel;
}
