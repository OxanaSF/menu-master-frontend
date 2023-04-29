import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { RecipeHome } from './RecipeHome';
import type { RecipeModel } from '../../../models/RecipeModel';
import { Carousel } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_BASE_URL = 'http://localhost:8080/recipes';
const RECIPES_LIMIT = 10;

export function RecipeCarousel(): JSX.Element {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = new Carousel(carouselRef.current, {
        interval: 3000,
        pause: false,
        ride: 'carousel',
        wrap: true, // allow carousel to wrap around to the beginning
      });

      
    }
  }, [isLoading]);
  

  const renderRecipeCarousel = (): JSX.Element => (
    <div className="carousel-inner" ref={carouselRef}>
      {[...recipes, ...recipes, ...recipes].map(
        (recipe: RecipeModel, index: number) => (
          <div
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            key={index}
          >
            <div className="row d-flex justify-content-center align-items-center">
              {[...Array(3)].map((_, i) => {
                const recipeIndex = index * 3 + i;
                if (recipes[recipeIndex]) {
                  return (
                    <RecipeHome
                      key={recipeIndex}
                      recipe={recipes[recipeIndex]}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        )
      )}
    </div>
  );

  const renderMobileCarousel = (): JSX.Element => (
    <div className="d-lg-none mt-3">
      <div className="row d-flex justify-content-center align-items-center">
        {recipes.slice(0, 3).map((recipe: RecipeModel, index: number) => (
          <RecipeHome key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }
  return (
    <div className="container mt-5">

      {renderRecipeCarousel()}
    </div>
  );
}
