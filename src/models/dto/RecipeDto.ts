import { RecipeModel } from "../RecipeModel";

export class RecipeDto {
  id: number | undefined;
  name: string | undefined;
  imageUrl: string | undefined;
  instructions: string | undefined;
  servingSize: number | undefined;

  static fromRecipeModel(recipeModel: RecipeModel): RecipeDto {
    const recipeDto = new RecipeDto();
    recipeDto.id = recipeModel.id || 0;
    recipeDto.name = recipeModel.name;
    recipeDto.imageUrl = recipeModel.imageUrl;
    recipeDto.instructions = recipeModel.instructions;
    recipeDto.servingSize = recipeModel.servingSize;
    return recipeDto;
  }
}
