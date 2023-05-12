import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RecipeModel } from '../../models/RecipeModel';
import backgroundImage from '../../Images/PublicImages/dashboard-greens.png';
import { useNavigate } from 'react-router-dom';

import {
  selectUserId,
  selectUserName,
} from '../../store/selectors/userSelectors';
import SavedRecipes from './SavedRecipes';

export const UserDashboard = () => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/recipes/${userId}/recipes`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRecipes(data);
          console.log(data);
        } else {
          console.log('Failed to fetch recipes:', response.status);
        }
      } catch (error) {
        console.log('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);



  return (
    <div
      className="container container-dash"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card mb-4 p-3" style={{ minHeight: '160px' }}>
            <h2>Welcome back, {userName}</h2>
          </div>
          <div className="card mb-4" style={{ minHeight: '230px' }}>
            <div className="card-header">Your Grocery List</div>
          </div>
        </div>

        {recipes && Array.isArray(recipes) && recipes.length > 0 && (
          <SavedRecipes recipes={recipes}/>
        )}
      </div>
    </div>
  );
};
