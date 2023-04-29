import { RecipeIngredientModel } from './RecipeIngredientModel';
import { UserModel } from './UserModel';

export interface RecipeModel {
  id: number | null | undefined;
  title: string | undefined;
  image: any;
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
