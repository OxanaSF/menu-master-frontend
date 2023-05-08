import React from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faCarrot,
  faHeartbeat,
  faBan,
  faCheese,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';

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
              <p style={{ fontSize: '14px' }}>{description}</p>
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
                        <li key={index}>{step.step}</li>
                      )
                    )}
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

export default RecipeModal;
