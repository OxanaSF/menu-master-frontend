import { RecipeModel } from '../RecipeModel';

export class RecipeDto {
  recipeId: number | null | undefined;
  name: string | undefined;
  cuisineType: string | undefined;
  description: string | undefined;
  servingSize: number | null | undefined;
  imageUrl: string | undefined;
  nutritionalInformation: string | undefined;
  instructions: string | undefined;
  spoonacularId: number | undefined;
  servingsSize: number | undefined;

  static fromRecipeModel(recipe: RecipeModel): RecipeDto {
    const recipeDto = new RecipeDto();

    recipeDto.recipeId = recipe.id;
    recipeDto.name = recipe.title;
    recipeDto.cuisineType = recipe.cuisines?.join(', ') || 'No cuisine type';
    recipeDto.description = recipe.summary || 'No description';
    recipeDto.servingSize = recipe.servings || 0;
    recipeDto.imageUrl = recipe.image || '';
    recipeDto.spoonacularId = recipe.id !== null ? recipe.id : undefined;

    const steps = recipe.analyzedInstructions?.[0]?.steps || [];
    recipeDto.instructions = JSON.stringify(
      steps.map((step: { step: any }) => step.step) || 'No instructions'
    );

    const nutritionalInfo: { [key: string]: string } = {};
    if (recipe.diets?.includes('gluten free'))
      nutritionalInfo['glutenFree'] = 'Gluten-Free';
    if (recipe.diets?.includes('dairy free'))
      nutritionalInfo['dairyFree'] = 'Dairy-Free';
    if (recipe.diets?.includes('pescatarian'))
      nutritionalInfo['pescatarian'] = 'Pescatarian';

    recipeDto.nutritionalInformation =
      Object.keys(nutritionalInfo).length > 0
        ? JSON.stringify(nutritionalInfo)
        : 'No nutritional information';

    return recipeDto;
  }
}
