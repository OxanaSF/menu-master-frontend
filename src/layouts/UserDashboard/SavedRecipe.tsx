import React, { useState } from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import { Modal } from 'react-bootstrap';
import SavedRecipeModal from '../Recipes/SavedRecipeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faCarrot,
  faHeartbeat,
  faBan,
  faCheese,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';

interface SavedRecipeProps {
  recipe: RecipeModel;
  onClose: () => void;
}

const SavedRecipe: React.FC<SavedRecipeProps> = ({ recipe, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    console.log('showModal: ', showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('showModal: ', showModal);
  };

  return (
    <div key={recipe.id} className="col-12 col-md-4 mb-3">
      <div
        className="card"
        style={{ cursor: 'pointer' }}
        onClick={handleOpenModal}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <SavedRecipeModal recipe={recipe} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default SavedRecipe;
