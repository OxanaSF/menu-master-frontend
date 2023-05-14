import React, { useState } from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import { RecipeDto } from '../../models/dto/RecipeDto';
import SavedRecipeModal from './SavedRecipeModal';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface SavedRecipeProps {
  recipe: RecipeModel;
  onClose: () => void;
  setUpdateDashboard: (value: boolean) => void;
  handleDeleteRecipe: () => void;
}

const SavedRecipe: React.FC<SavedRecipeProps> = ({
  recipe,
  onClose,
  setUpdateDashboard,
  handleDeleteRecipe,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeModel | null>(
    null
  );
  const userId = useSelector(selectUserId);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('showModal: ', showModal);
  };

  const handleDelete = async (recipeId: number) => {
    console.log('Start deleting fetch');
    try {
      const response = await fetch(
        `http://localhost:8080/recipes/${userId}/recipes/${recipeId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Recipe deleted successfully');
        handleDeleteRecipe();
      } else {
        console.log('Failed to delete recipe:', response.status);
      }
    } catch (error) {
      console.log('Error deleting recipe:', error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/recipes/${userId}/recipes`
      );
      if (response.ok) {
        const data = await response.json();
      } else {
        console.log('Failed to fetch recipes:', response.status);
      }
    } catch (error) {
      console.log('Error fetching recipes:', error);
    }
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
        style={{ cursor: 'pointer', minHeight: '200px' }}
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
          <h6 className="card-title text6">{recipe.name}</h6>
        </div>
      </div>
      <div className="mt-2">
        <button
          className="btn btn-sm "
          onClick={() => handleDelete(recipe.spoonacularId)}
        >
          <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} />
        </button>
      </div>

      {showModal && (
        <SavedRecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SavedRecipe;
