import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RecipeModel } from '../../models/RecipeModel';
import backgroundImage from '../../Images/PublicImages/test22.png';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  selectUserId,
  selectUserName,
} from '../../store/selectors/userSelectors';
import SavedRecipes from './SavedRecipes';

import './UserDashboard.css';

export const UserDashboard = () => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [mealPlan, setMealPlan] = useState<any>(null);

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
        setRecipes(data);
      } else {
        console.log('Failed to fetch recipes:', response.status);
      }
    } catch (error) {
      console.log('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [userId]);

  const handleDeleteRecipe = () => {
    fetchRecipes();
  };

  useEffect(() => {
    handleDeleteRecipe();
  }, []);

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/meal-plans/${userId}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          setMealPlan(response.data);
        } else {
          console.log('Failed to fetch meal plans:', response.status);
        }
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };

    fetchMealPlan();
  }, [userId]);

  return (
    <div className="container-dash">
      <div className="row container-dash-row">
        <div className="col-12 col-md-6">
          <div className="card mb-4 p-3" style={{ minHeight: '160px' }}>
            <h1 className="text4">Welcome back, {userName}!</h1>
          </div>

          <div className="card mb-5" style={{ minHeight: '270px' }}>
            <div className="card-header">Your Saved Meal Plans</div>
            <div className="card-body text5">
              {mealPlan && mealPlan.length > 0 ? (
                mealPlan.map(
                  (plan: {
                    id: React.Key | null | undefined;
                    planName:
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
                  }) => (
                    <div key={plan.id}>
                      <h3>- {plan.planName}</h3>
                      {/* Render the meal plan data here */}
                    </div>
                  )
                )
              ) : (
                <h3>No saved Meal Plans.</h3>
              )}
            </div>
          </div>

          <div className="card mb-5" style={{ minHeight: '270px' }}>
            <div className="card-header">Your Grocery List</div>
            <div className="card-body text5">
              {' '}
              <h3>No items in your Grocery list.</h3>
            </div>
          </div>
        </div>

        {recipes && Array.isArray(recipes) && recipes.length > 0 && (
          <SavedRecipes
            recipes={recipes}
            handleDeleteRecipe={handleDeleteRecipe}
          />
        )}
      </div>
    </div>
  );
};
