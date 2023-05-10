import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { HomePage } from './layouts/HomePage/HomePage';
import { Recipes } from './layouts/Recipes/Recipes';
import { UserDashboard } from './layouts/UserDashboard/UserDashboard';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import PlanMeals from './layouts/PlanMeals/PlanMeals';
import RegistrationForm from './auth/components/RegistrationForm';
import LoginForm from './auth/components/LoginForm';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/selectors/authSelectors';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if the content is loaded
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    // Simulate the loading process
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Adjust the duration as needed
  }, []);

  return (
    <BrowserRouter>
      <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="loading-overlay">
          {/* Add your loading animation here */}
          {/* Example: <div className="spinner"></div> */}
        </div>
        <Navbar />
        <div className={`container-main ${isLoaded ? 'loaded' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<Recipes />} />
            {Boolean(isLoggedIn) && <Route path="/dashboard/:id" element={<UserDashboard />} />}

            <Route path="/plan-meals" element={<PlanMeals />} />
            <Route path="/user-registration" element={<RegistrationForm />} />
            <Route path="/user-login" element={<LoginForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
