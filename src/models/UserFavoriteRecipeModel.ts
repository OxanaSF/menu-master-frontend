import { IRecipe } from "./interfaces/IRecipe";
import { IUser } from "./interfaces/IUser";
import { IUserFavoriteRecipe } from "./interfaces/IUserFavoriteRecipe";


export class UserFavoriteRecipeModel implements IUserFavoriteRecipe {
  id: number;
  user: IUser;
  recipe: IRecipe;

  constructor(userFavoriteRecipe: IUserFavoriteRecipe) {
    this.id = userFavoriteRecipe.id;
    this.user = userFavoriteRecipe.user;
    this.recipe = userFavoriteRecipe.recipe;
  }
}
