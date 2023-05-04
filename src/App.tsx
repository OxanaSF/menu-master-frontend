import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { HomePage } from './layouts/HomePage/HomePage';
import { Recipes } from './layouts/Recipes/Recipes';
import { UserDashboard } from './layouts/UserDashboard/UserDashboard';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { PlanMeals } from './layouts/PlanMeals/PlanMeals';
import RegistrationForm from './auth/components/RegistrationForm';
import LoginForm from './auth/components/LoginForm';

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/dashboard"
            element={<UserDashboard loggedIn={loggedIn} handleLogout={handleLogout} />}
          />
          <Route path="/plan-meals" element={<PlanMeals />} />
          <Route path="/user-registration" element={<RegistrationForm />} />
          <Route path="/user-login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
