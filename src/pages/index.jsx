import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home';
import NotFoundPage from './not-found';
import OverviewPage from './overview';
import CheckoutPage from './checkout';

function Pages() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cart" element={<OverviewPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default Pages;
