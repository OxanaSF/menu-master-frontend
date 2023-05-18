import { Link } from 'react-router-dom';
import './ExplorePopularRecipes.css'


export const ExplorePopularRecipes = () => {
  return (
    <div className="p-5 mb-4 bg-dark header explorePopularRecipes">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="display-5 fw-bold hero-text-h1">Find your recipe</h1>
          <p className="hero-text-h2" style={{ whiteSpace: 'nowrap' }}>
            Plan your meal, plan your life
          </p>
          <Link to="/recipes" className="btn btn-lg hero-text-h3">
            Explore popular recipes
          </Link>
        </div>
      </div>
    </div>
  );
};
