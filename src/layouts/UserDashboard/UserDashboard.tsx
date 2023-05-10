import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RecipeModel } from '../../models/RecipeModel';
// import backgroundImage from '../../Images/PublicImages/test.png';
import backgroundImage from '../../Images/PublicImages/dashboard-greens.png';

import {
  selectUserId,
  selectUserName,
} from '../../store/selectors/userSelectors';
import SavedRecipes from './SavedRecipes';

export const UserDashboard = () => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);

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

  return (
    <div
      className="container container-dash"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${backgroundImage})`,
      // }}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card mb-4 p-3" style={{ minHeight: '200px' }}>
            <h2>Welcome back, {userName}</h2>
            <p>Your account information:</p>
            <ul>
              <li>Name: {userName}</li>
              <li>Email: john.doe@example.com</li>
            </ul>
          </div>
        </div>

        {recipes && Array.isArray(recipes) && recipes.length > 0 && (
          <SavedRecipes recipes={recipes} />
        )}

        <div className="col-12 col-md-6">
          <div className="card mb-4" style={{ minHeight: '210px' }}>
            <div className="card-header">Your Grocery List</div>
            {/* <ul className="list-group list-group-flush">
              {recipes.map((recipe) => (
                <li key={recipe.id} className="list-group-item">
                  {recipe.name}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card mb-4" style={{ minHeight: '210px' }}>
            <div className="card-header">Your Weekly Plan</div>
            {/* <ul className="list-group list-group-flush">
              {recipes.map((recipe) => (
                <li key={recipe.id} className="list-group-item">
                  {recipe.name}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};
