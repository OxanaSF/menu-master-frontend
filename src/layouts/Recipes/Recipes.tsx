import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchForm from './SearchForm';
import { Recipe } from '../../components/Recipe';
import SearchedRecipe from './SearchedRecipe';
import { RecipeModel } from '../../models/RecipeModel';

const API_BASE_URL_RANDOM = 'http://localhost:8080/recipes';
const RECIPES_LIMIT = 21;

export function Recipes(): JSX.Element {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [searchedRecipes, setSearchedRecipes] = useState<RecipeModel[]>([]);
  const [searchSuccess, setSearchSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(API_BASE_URL_RANDOM, { params: { limit: RECIPES_LIMIT } })
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

  const onFormSubmit = async (searchResults: RecipeModel[]) => {
    setSearchedRecipes(searchResults);
    console.log(searchedRecipes);
    console.log(searchSuccess);
  };

  const renderGallery = (): JSX.Element => (
    <div className="carousel-inner" ref={carouselRef}>
      {Array.from({ length: recipes.length }).map((_, index) => (
        <div
          key={index}
          className="row d-flex justify-content-center align-items-center"
        >
          {Array.from({ length: 3 }).map((_, i) => {
            const recipeIndex = index * 3 + i;
            if (recipes[recipeIndex]) {
              return (
                <Recipe
                  key={recipes[recipeIndex].id}
                  recipe={recipes[recipeIndex]}
                  onSelect={(recipe: RecipeModel) => {
                    throw new Error('Function not implemented.');
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );




const renderSearchedGallery = (): JSX.Element | null => {
  if (searchedRecipes.length === 0) {
    return null;
  } else {
    return (
      <div>
        <div className="row d-flex justify-content-center align-items-center">
          {searchedRecipes.map((recipe: RecipeModel, index: number) => (
            <SearchedRecipe
              key={index}
              image={recipe.image}
              title={recipe.title || ''}
              recipe={recipe} 
            />
          ))}
        </div>
      </div>
    );
  }
};




  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div className="mt-5">
      <SearchForm
        onFormSubmit={onFormSubmit}
        setSearchSuccess={setSearchSuccess}
      />
      {renderSearchedGallery()}
      {!searchSuccess && renderGallery()}
    </div>
  );
}
