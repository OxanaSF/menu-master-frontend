import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Recipe } from '../../components/Recipe';
import type { RecipeModel } from '../../models/RecipeModel'; 
import { Carousel } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_BASE_URL = 'http://localhost:8080/recipes';
const RECIPES_LIMIT = 21;

export function Recipes(): JSX.Element {
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



  const renderGallery= (): JSX.Element => (
    <div className="carousel-inner" ref={carouselRef}>
      {[...recipes, ...recipes, ...recipes].map(
        (recipe: RecipeModel, index: number) => (
          
            <div className="row d-flex justify-content-center align-items-center">
              {[...Array(3)].map((_, i) => {
                const recipeIndex = index * 3 + i;
                if (recipes[recipeIndex]) {
                  return (
                    <Recipe
                      key={recipeIndex}
                      recipe={recipes[recipeIndex]}
                    />
                  );
                }
                return null;
              })}
            </div>
          
        )
      )}
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
      <div className="homepage-carousel-title">
        <h3 className="mb-5">Find your next recipe.</h3>
      </div>

      {renderGallery()}
    </div>
  );
}
