import { Link } from 'react-router-dom';

import './Heros.css';

export const Heros = () => {
  return (
    <div className="hero-container">
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-3 align-items-center left-hero-container">
          <div className="col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-md-6">
            <div className="container hero-par">
              <div>
                <h1 className="hero-par-h1 hero-par1-h1">
                  Revolutionize the way you eat with our web application
                </h1>
                <p className="lead mb-4 letter-spacing hero-par-text">
                  Say goodbye to the hassle of managing a special diet and let
                  our platform help you save time, reduce food waste, and
                  streamline your grocery shopping process. You can easily input
                  your dietary restrictions, preferred cuisine types, and
                  favorite recipes, while also discovering new recipes.
                </p>

                <Link
                  to="/user-registration"
                  className="btn main-color btn-lg text-white signup-btn"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-0 mb-3 align-items-center ">
          <div className="col-md-6">
            <div className="container hero-par">
              <div className="ml-2">
                <h1 className="hero-par-h1 hero-par2-h1">
                  Transform your eating habits
                </h1>
                <p className="lead mb-4 letter-spacing hero-par-text">
                  Are you tired of the same old meals every week? Our web
                  application can help you discover new recipes and ingredients
                  to spice up your meals. Input your dietary restrictions and
                  preferred cuisine types, and we'll provide you with
                  personalized recipe recommendations.
                </p>
                <Link
                  to="/user-registration"
                  className="btn main-color btn-lg text-white signup-btn"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="mt-2">
                <h1>Revolutionize the Way You Eat with Our Web Application</h1>
                <p className="lead mb-4">
                  Say goodbye to the hassle of managing a special diet and let
                  our platform help you save time, reduce food waste, and
                  streamline your grocery shopping process. You can easily input
                  your dietary restrictions, preferred cuisine types, and
                  favorite recipes, while also discovering new recipes. Stay
                  organized with a grocery list and meal planning features, and
                  never worry about missing an ingredient again. Join our
                  community of food enthusiasts and start exploring the endless
                  possibilities of our platform today.
                </p>
                <a className="btn main-color btn-lg text-white" href="">
                  Sign up
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="col-image-left"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="mt-2">
                <h1>Transform Your Eating Habits Today</h1>
                <p className="lead mb-4">
                  Are you tired of the same old meals every week? Our web
                  application can help you discover new recipes and ingredients
                  to spice up your meals. Input your dietary restrictions and
                  preferred cuisine types, and we'll provide you with
                  personalized recipe recommendations. Stay organized with our
                  grocery list and meal planning features, and never worry about
                  missing an ingredient again. Join our community of food
                  enthusiasts and start exploring the endless possibilities of
                  our platform today.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="col-image-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
