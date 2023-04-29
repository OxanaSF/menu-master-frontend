import React from 'react';
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

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/plan-meals" element={<PlanMeals />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
