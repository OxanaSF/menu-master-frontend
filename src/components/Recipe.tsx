import { RecipeModel } from "../models/RecipeModel"; 
import axios from 'axios';
import { RecipeDto } from "../models/dto/RecipeDto";

type RecipeProps = {
  recipe: RecipeModel;
  onSelect: (recipe: RecipeModel) => void;
};

export const Recipe = ({ recipe, onSelect }: RecipeProps) => {
  const handleSelect = () => {
    onSelect(recipe);
  };

  const handleSave = () => {
    const recipeDto = RecipeDto.fromRecipeModel(recipe);
    axios.post('http://localhost:8080/recipes', recipeDto)
      .then(() => {
        console.log('Recipe saved successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center" onClick={handleSelect}>
        <div
          style={{
            height: '150px',
            overflow: 'hidden',
          }}
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <h6 className="mt-2" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
          {recipe.name}
        </h6>
        <button className="btn main-color text-white" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
