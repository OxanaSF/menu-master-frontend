import React, { useState, useEffect } from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import { RecipeDto } from '../../models/dto/RecipeDto';
import SavedRecipeModal from './SavedRecipeModal';

interface SavedRecipeProps {
  recipe: RecipeModel;
  onClose: () => void;
}

const SavedRecipe: React.FC<SavedRecipeProps> = ({ recipe, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeModel | null>(
    null
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('showModal: ', showModal);
  };

  const fetchRecipeById = async (recipeId: number) => {
    if (!recipeId) {
      console.log('Recipe ID is invalid');
      return;
    }

    try {
      console.log('Fetching recipe from Spoonacular API...');
      const apiKey = '';
      const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information`;
      const params = new URLSearchParams({
        apiKey,
        includeNutrition: 'true',
      });

      const response = await fetch(`${apiUrl}?${params}`);
      if (response.ok) {
        const data = await response.json();
        const recipe = RecipeDto.transformRecipeData(data);
        setSelectedRecipe(recipe);
        handleOpenModal();
      } else {
        throw new Error('Failed to fetch recipe');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={recipe.id} className="col-12 col-md-4 mb-3">
      <div
        className="card"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          fetchRecipeById(recipe.spoonacularId);
        }}
      >
        <img
          src={recipe.imageUrl}
          className="card-img-top"
          style={{
            minHeight: '50px',
            objectFit: 'cover',
            fontSize: '10px',
          }}
          alt={recipe.name}
        />
        <div className="card-body">
          <h6
            className="card-title"
            style={{ fontSize: '8px', width: '100%', padding: '0' }}
          >
            {recipe.name}
          </h6>
        </div>
      </div>

      {showModal && (
        <SavedRecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SavedRecipe;

