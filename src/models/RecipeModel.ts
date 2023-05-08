import { RecipeIngredientModel } from './RecipeIngredientModel';
import { UserModel } from './UserModel';

export interface RecipeModel {
  spoonacularId: any;
  vegetarian: boolean;
  vegan: boolean;
  veryHealthy: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  cheap: boolean;
  analyzedInstructions: any;
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
