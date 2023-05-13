import { Link } from 'react-router-dom';

export const ExplorePopularRecipes = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="display-5 fw-bold text">Find your recipe</h1>
          <p className="text2" style={{ whiteSpace: 'nowrap' }}>
            Plan your meal, plan your life
          </p>
          <Link to="/recipes" className="btn main-color btn-lg text-white btn-hero text3">
            Explore popular recipes
          </Link>
        </div>
      </div>
    </div>
  );
};
