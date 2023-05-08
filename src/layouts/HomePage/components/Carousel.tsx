import { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeHome } from './RecipeHome';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecipeModel } from '../../../models/RecipeModel';

const API_BASE_URL = 'http://localhost:8080/recipes';
const RECIPES_LIMIT = 12;

export function RecipeCarousel(): JSX.Element {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(API_BASE_URL, { params: { limit: RECIPES_LIMIT } })
      .then((response) => {
        setRecipes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setHttpError('An error occurred while fetching the recipes.');
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  // Group recipes into chunks of three
  const recipeChunks: RecipeModel[][] = [];
  for (let i = 0; i < recipes.length; i += 3) {
    recipeChunks.push(recipes.slice(i, i + 3));
  }

  return (
    <div className="container mt-5 justify-content-center carousel-container">
      <Carousel wrap controls={false} indicators={false}>
        {recipeChunks.map((chunk: RecipeModel[], index: number) => (
          <Carousel.Item key={index}>
            <div className="row recipe-carousel-row">
              {chunk.map((recipe: RecipeModel) => (
                <div className="col-md-4" key={recipe.id}>
                  <RecipeHome recipe={recipe} />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
