import { RecipeModel } from '../../models/RecipeModel';
import SavedRecipe from './SavedRecipe';

type SavedRecipesProps = {
  recipes: RecipeModel[];
  handleDeleteRecipe: () => void;
};

const SavedRecipes: React.FC<SavedRecipesProps> = ({
  recipes,
  handleDeleteRecipe,
}) => {
  // console.log(recipes);
  return (
    <div className="col-12 col-md-6 saved-recipes-container">
      {/* <div className="card mb-4" style={{ minHeight: '200px' }}> */}
      <div className="card mb-4">
        <div className="card-header">Your Saved Recipes</div>
        <div className="card-body">
          <div className="row saved-cards">
            {recipes.map((recipe) => (
              <SavedRecipe
                recipe={recipe}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
                setUpdateDashboard={function (value: boolean): void {
                  throw new Error('Function not implemented.');
                }}
                handleDeleteRecipe={handleDeleteRecipe}
                key={recipe.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
