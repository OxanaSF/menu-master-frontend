import React from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import Modal from 'react-bootstrap/Modal';

interface RecipeModalProps {
  recipe: RecipeModel;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const {
    vegetarian,
    vegan,
    veryHealthy,
    glutenFree,
    dairyFree,
    cheap,
    analyzedInstructions,
    image,
    description,
  } = recipe;

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={image}
                alt={recipe.title}
                style={{ width: '80%', marginBottom: '20px' }}
              />
              <h5>Dietary Information</h5>
              <ul>
                <li>Vegetarian: {vegetarian ? 'Yes' : 'No'}</li>
                <li>Vegan: {vegan ? 'Yes' : 'No'}</li>
                <li>Very Healthy: {veryHealthy ? 'Yes' : 'No'}</li>
                <li>Gluten Free: {glutenFree ? 'Yes' : 'No'}</li>
                <li>Dairy Free: {dairyFree ? 'Yes' : 'No'}</li>
                <li>Cheap: {cheap ? 'Yes' : 'No'}</li>
              </ul>
              <p style={{ fontSize: '14px' }}>{description}</p>
            </div>
            <div className="col-md-6">
              <h5>Instructions</h5>
              {analyzedInstructions.length > 0 &&
              analyzedInstructions[0].steps ? (
                <ol>
                  {analyzedInstructions[0].steps.map(
                    (
                      step: {
                        step:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <li key={index} style={{ fontSize: '14px' }}>
                        {step.step}
                      </li>
                    )
                  )}
                </ol>
              ) : (
                <p style={{ fontSize: '14px' }}>No instructions available.</p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeModal;
