import React, { useState } from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import { RecipeDto } from '../../models/dto/RecipeDto';
import axios from 'axios';
import RecipeModal from './RecipeModal';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors';
import { useNavigate } from 'react-router-dom';

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

  const userId = useSelector(selectUserId);

  const navigate = useNavigate();

  const handleSave = () => {
    const recipeDto = RecipeDto.fromRecipeModel(recipe);
    const spoonacularId = recipe.id;
    console.log(recipe);
    console.log('Recipe instructions: ', recipe.instructions);
    console.log('spoonacularId', spoonacularId);
    axios
      .post(
        `http://localhost:8080/recipes/${userId}/recipes/${spoonacularId}`,
        recipeDto
      )
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

  const handleNavigate = () => {
    navigate('../user-login');
  };

  return (
    <div
      className="col-xs-6 col-sm-6 col-md-4 col-lg-3 searched-recipes-list"
      key={key}
      style={{
        minHeight: '300px',
      }}
       >
      <div className="text-center">
        {image && (
          <img
            src={image}
            alt={title || ''}
            style={{
              width: '100%',
            }}
          />
        )}
        {title && <p>{title}</p>}

        {userId && (
          <button
            className="btn main-color text-white mb-5 searched-recipe-btn"
            onClick={handleSave}
            style={{
              marginRight: '10px',
            }}
          >
            Save
          </button>
        )}

        {!userId && (
          <button
            className="btn main-color text-white mb-5"
            onClick={handleNavigate}
            style={{
              marginRight: '10px',
            }}
          >
            Save
          </button>
        )}

        <button
          className="btn main-color  text-white mb-5"
          onClick={handleOpenModal}
        >
          View
        </button>
      </div>

      {showModal && <RecipeModal recipe={recipe} onClose={handleCloseModal} />}
    </div>
  );
};

export default SearchedRecipe;
