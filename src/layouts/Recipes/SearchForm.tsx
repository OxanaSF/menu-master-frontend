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

  const searchRecipes = async () => {
    const apiKey = '';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch`;

    const params = {
      apiKey,
      query,
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${apiUrl}?${queryString}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
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
