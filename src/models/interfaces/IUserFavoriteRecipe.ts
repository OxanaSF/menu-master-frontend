import { IUser } from "./IUser";
import { IRecipe } from "./IRecipe";

export interface IUserFavoriteRecipe {
  id: number;
  user: IUser;
  recipe: IRecipe;
}
