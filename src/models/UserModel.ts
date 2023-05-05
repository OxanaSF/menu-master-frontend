import { RecipeModel } from "./RecipeModel";
import { IUser } from "./interfaces/IUser";



export class UserModel implements IUser {
  user_id: string; 
  username: string;
  password: string;
  dietaryRestrictions: string;
  preferredCuisineTypes: string;
  groceryList: string;
  individualMenu: string;
  favoriteRecipes: RecipeModel[];

  constructor(user: IUser) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.password = user.password;
    this.dietaryRestrictions = user.dietaryRestrictions;
    this.preferredCuisineTypes = user.preferredCuisineTypes;
    this.groceryList = user.groceryList;
    this.individualMenu = user.individualMenu;
    this.favoriteRecipes = user.favoriteRecipes;
  }
}
