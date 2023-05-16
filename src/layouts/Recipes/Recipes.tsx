import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchedRecipe from './SearchedRecipe';
import { RecipeModel } from '../../models/RecipeModel';
import SearchForm from './SearchForm';

export function Recipes(): JSX.Element {
  const [searchedRecipes, setSearchedRecipes] = useState<RecipeModel[]>([]);
  const [searchSuccess, setSearchSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const [query, setQuery] = useState('');

  const handleNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    const searchRecipes = async () => {
      const apiUrl = 'http://localhost:8080/recipes/complexSearch';

      const params = {
        query: query || 'salad',
        limit: '20',
        instructionsRequired: 'true',
        addRecipeInformation: 'true',
      };

      const queryString = new URLSearchParams(params).toString();
      const url = `${apiUrl}?${queryString}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setSearchedRecipes(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setIsLoading(false);
        setHttpError('Error fetching recipes');
      }
    };
    searchRecipes();
  }, []);

  const onFormSubmit = async (searchResults: RecipeModel[]) => {
    setSearchedRecipes(searchResults);
    console.log('searchedRecipes:', searchResults);
    console.log(searchSuccess);
  };

  const renderSearchedGallery = (): JSX.Element | null => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-4">
          <div className="row">
            {searchedRecipes.map((recipe: RecipeModel, index: number) => {
              return (
                <SearchedRecipe
                  key={index}
                  image={recipe.image}
                  title={recipe.title || ''}
                  recipe={recipe}
                  handleNotification={handleNotification}
                />
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="mt-5">
      <SearchForm
        onFormSubmit={onFormSubmit}
        setSearchSuccess={setSearchSuccess}
      />
      {showNotification && (
        <div
          className="notification"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(14, 173, 205)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 9999,
          }}
        >
          Recipe saved successfully!
        </div>
      )}
      {renderSearchedGallery()}
    </div>
  );
}
