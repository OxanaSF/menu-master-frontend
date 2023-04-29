import { useState, useEffect } from 'react';
import axios from 'axios';

import type { RecipeModel } from '../../models/RecipeModel';
import { Recipe } from '../../components/Recipe';

const API_BASE_URL = 'http://localhost:8080/recipes/favorites';

const FAVORITE_RECIPES_LIMIT = 6;

export function FavoriteRecipes(): JSX.Element {
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(API_BASE_URL, { params: { limit: FAVORITE_RECIPES_LIMIT } })
      .then((response) => {
        setFavoriteRecipes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setHttpError('An error occurred while fetching the favorite recipes.');
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="homepage-carousel-title">
        <h3>My Favorite Recipes</h3>
      </div>
      <div className="row mt-5">
        {favoriteRecipes.map((recipe: RecipeModel) => (
          <div className="col-lg-4 mb-4" key={recipe.id}>
            <Recipe recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
