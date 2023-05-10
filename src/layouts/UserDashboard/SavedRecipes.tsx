import { RecipeModel } from '../../models/RecipeModel';
import SavedRecipe from './SavedRecipe';

interface SavedRecipesProps {
  recipes: RecipeModel[];
}

const SavedRecipes = ({ recipes }: SavedRecipesProps) => {
  console.log(recipes);
  return (
    <div className="col-12 col-md-6">
      <div className="card mb-4" style={{ minHeight: '200px' }}>
        <div className="card-header">Your Saved Recipes</div>
        <div className="card-body">
          <div className="row">
            {recipes.map((recipe) => (
              <SavedRecipe
                recipe={recipe}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
