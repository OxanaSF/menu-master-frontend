import { RecipeModel } from '../RecipeModel';

export class RecipeDto {
  recipeId: number | null | undefined;
  name: string | undefined;
  cuisineType: string | undefined;
  description: string | undefined;
  servingSize: number | null | undefined;
  imageUrl: string | undefined | ' ';
  nutritionalInformation: string | undefined;
  instructions: string[] | undefined;
  spoonacularId: number | undefined;
  servingsSize: number | undefined;
  vegetarian: any;
  vegan: any;
  veryHealthy: any;

  static fromRecipeModel(recipe: RecipeModel): RecipeDto {
    const recipeDto = new RecipeDto();

    recipeDto.recipeId = recipe.id;
    recipeDto.name = recipe.title;
    recipeDto.cuisineType = recipe.cuisines?.join(', ') || 'No cuisine type';
    recipeDto.description = recipe.summary || 'No description';
    recipeDto.servingSize = recipe.servings || 0;
    recipeDto.imageUrl = recipe.image || '';
    recipeDto.spoonacularId = recipe.id !== null ? recipe.id : undefined;

  
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


  static transformRecipeData = (data: any): RecipeModel => {
    // console.log('data.instructions:', data.instructions);
  
    const recipe: RecipeModel = {
      id: data.id,
      title: data.title,
      description: data.description,
      imageUrl: data.image,
      instructions: data.analyzedInstructions
      ? data.analyzedInstructions.flatMap((section: any) =>
          section.steps.map((step: any) => step.step)
        )
      : [],
      cuisineType: data.cuisines,
      servings: data.servings,
      nutritionalInformation: data.nutrition,
      nutrition: undefined,
      diets: undefined,
      summary: '',
      cuisines: undefined,
      spoonacularId: undefined,
      vegetarian: false,
      vegan: false,
      veryHealthy: false,
      glutenFree: false,
      dairyFree: false,
      cheap: false,
      analyzedInstructions: undefined,
      image: '',
      recipe_id: 0,
      name: '',
      servingSize: 0,
      recipeIngredients: [],
      users: [],
    };
  
    // console.log('recipe:', recipe);
    // console.log('instructions:', recipe.instructions);
    
  
    return recipe;
  };


  // static formatInstructions(instructions: string[] | undefined): string {
  //   if (!instructions || instructions.length === 0) {
  //     return 'No instructions available.';
  //   }

  //   return instructions
  //     .map((instruction, index) => {
  //       return `${index + 1}. ${instruction}`;
  //     })
  //     .join('\n');
  // }
}
