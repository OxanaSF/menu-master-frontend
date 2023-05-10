import React, { useState } from 'react';
import { RecipeModel } from '../../models/RecipeModel';

interface SearchFormProps {
  onFormSubmit: (formData: RecipeModel[]) => void;
  setSearchSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onFormSubmit,
  setSearchSuccess,
}) => {
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeModel | null>(
    null
  );

  const searchRecipes = async () => {
    const apiUrl = 'http://localhost:8080/recipes/complexSearch';

    const params = {
      query,
      limit: '20',
      instructionsRequired: 'true',
      addRecipeInformation: 'true',
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${apiUrl}?${queryString}`;

    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const searchResults = data.results || [];
      console.log(searchResults);
      onFormSubmit(searchResults);
      setSearchSuccess(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes();
  };

  const handleRecipeClick = (recipe: RecipeModel) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleFormSubmit} className="mb-5 search-bar">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes..."
            />
            <div className="input-group-append">
              <button type="submit" className="btn main-color text-white ml-2">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
