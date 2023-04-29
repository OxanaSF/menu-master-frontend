import { RecipeIngredientModel } from "../RecipeIngredientModel";
import { UserModel } from "../UserModel";


export interface IRecipe {
  recipe_id: number;
  name: string;
  cuisineType: string;
  instructions: string;
  description: string;
  servingSize: number;
  imageUrl: string;
  nutritionalInformation: string;
  recipeIngredients: RecipeIngredientModel[];
  users: UserModel[];
}
