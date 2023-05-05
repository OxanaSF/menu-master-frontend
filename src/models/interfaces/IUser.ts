import { RecipeModel } from '../RecipeModel';

export interface IUser {
  user_id: string;
  username: string;
  password: string;
  dietaryRestrictions: string;
  preferredCuisineTypes: string;
  groceryList: string;
  individualMenu: string;
  favoriteRecipes: RecipeModel[];
}
