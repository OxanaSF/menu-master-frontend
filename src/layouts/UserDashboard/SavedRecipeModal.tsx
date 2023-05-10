import React from 'react';
import { Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faCarrot,
  faHeartbeat,
  faBan,
  faCheese,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeModel } from '../../models/RecipeModel';

interface SavedRecipeModalProps {
  recipe: RecipeModel | null;
  onClose: () => void;
}

const SavedRecipeModal: React.FC<SavedRecipeModalProps> = ({
  recipe,
  onClose,
}) => {
  if (!recipe) {
    return null;
  }

  const {
    vegetarian,
    vegan,
    veryHealthy,
    glutenFree,
    dairyFree,
    cheap,
    instructions,
    imageUrl,
    name,
  } = recipe;

  console.log(recipe);

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={imageUrl}
                alt={name}
                style={{ width: '80%', marginBottom: '20px' }}
              />
              <h5>Dietary Information</h5>
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className={vegetarian ? 'diet-icon-active' : 'diet-icon'}
                  />{' '}
                  Vegetarian
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCarrot}
                    className={vegan ? 'diet-icon-active' : 'diet-icon'}
                  />{' '}
                  Vegan
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faHeartbeat}
                    className={veryHealthy ? 'diet-icon-active' : 'diet-icon'}
                  />{' '}
                  Very Healthy
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faBan}
                    className={glutenFree ? 'diet-icon-active' : 'diet-icon'}
                  />{' '}
                  Gluten Free
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheese}
                    className={dairyFree ? 'diet-icon-active' : 'diet-icon'}
                  />{' '}
                  Dairy Free
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className={cheap ? 'diet-icon-active' : 'diet-icon'}
                  />{' '}
                  Cheap
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Instructions</h5>
              <div className="modal-text-overlay">
                {Array.isArray(instructions) && instructions.length > 0 ? (
                  <ol>
                    {instructions.map((step: string, index: number) => (
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
