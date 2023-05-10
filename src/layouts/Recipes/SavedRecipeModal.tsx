import React from 'react';
import { Modal } from 'react-bootstrap';
import { RecipeModel } from '../../models/RecipeModel';
import { RecipeDto } from '../../models/dto/RecipeDto';

interface SavedRecipeModalProps {
  recipe: RecipeModel;
  onClose: () => void;
}

const SavedRecipeModal: React.FC<SavedRecipeModalProps> = ({ recipe, onClose }) => {
  const recipeDto: RecipeDto = RecipeDto.fromRecipeModel(recipe);
  const formattedInstructions = RecipeDto.formatInstructions(recipeDto.instructions);


  console.log(recipeDto)
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{recipeDto.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={recipeDto.imageUrl}
                alt={recipeDto.name}
                style={{ width: '80%', marginBottom: '20px' }}
              />
              <h5>Dietary Information</h5>
              <ul>
                <li>Vegetarian: {recipeDto.vegetarian ? 'Yes' : 'No'}</li>
                <li>Vegan: {recipeDto.vegan ? 'Yes' : 'No'}</li>
                <li>Very Healthy: {recipeDto.veryHealthy ? 'Yes' : 'No'}</li>
                {/* Add other dietary information */}
              </ul>
              <p style={{ fontSize: '14px' }}>{recipeDto.description}</p>
            </div>
            <div className="col-md-6">
              <h5>Instructions</h5>
              <div
                style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  fontSize: '14px',
                }}
              >
                {Array.isArray(formattedInstructions) && formattedInstructions.length > 0 ? (
                  <ol>
                    {formattedInstructions.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>No instructions available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SavedRecipeModal;
