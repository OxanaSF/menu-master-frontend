import React, { useState } from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import { RecipeDto } from '../../models/dto/RecipeDto';
import axios from 'axios';
import RecipeModal from './RecipeModal';

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
  const [showModal, setShowModal] = useState(false);

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3 searched-recipes-list"
      key={key}
    >
      <div className="text-center">
        {image && <img src={image} alt={title || ''} />}
        {title && <p>{title}</p>}
        <button
          className="btn main-color text-white mb-5 searched-recipe-btn"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="btn main-color text-white mb-5"
          onClick={handleOpenModal}
        >
          View Details
        </button>
      </div>

      {showModal && <RecipeModal recipe={recipe} onClose={handleCloseModal} />}
    </div>
  );
};

export default SearchedRecipe;
