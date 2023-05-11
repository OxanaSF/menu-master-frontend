import React, { useState } from 'react';
import { RecipeModel } from '../models/RecipeModel';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RecipeDto } from '../models/dto/RecipeDto';
import RecipeModal from '../layouts/Recipes/RecipeModal';
import { selectUserId } from '../store/selectors/userSelectors';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

type RecipeProps = {
  recipe: RecipeModel;
  onSelect: (recipe: RecipeModel) => void;
  children?: React.ReactNode;
};

export const Recipe = ({ recipe, onSelect, children }: RecipeProps) => {
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
    console.log('Open modal');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNavigate = () => {
    navigate('../user-login');
  };

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
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
      <Modal>
        {showModal && (
          <RecipeModal recipe={recipe} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};
