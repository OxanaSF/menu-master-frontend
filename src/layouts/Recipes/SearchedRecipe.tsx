import React from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import { RecipeDto } from '../../models/dto/RecipeDto';
import axios from 'axios';

interface SearchedRecipeProps {
  key: number;
  image: string;
  title: string;
  recipe: RecipeModel; 
}

const SearchedRecipe: React.FC<SearchedRecipeProps> = ({
  key,
  image,
  title,
  recipe,
}) => {
  const handleSave = () => {
    const recipeDto = RecipeDto.fromRecipeModel(recipe);
    axios
      .post('http://localhost:8080/recipes', recipeDto)
      .then(() => {
        console.log('Recipe saved successfully');
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div
      className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3 searched-recipes-list"
      key={key}
    >
      <div className="text-center">
        {image && <img src={image} alt={title || ''} />}
        {title && <p>{title}</p>}
        <button className="btn main-color text-white mb-4" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SearchedRecipe;
