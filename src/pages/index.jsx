import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home';
import RegisterPage from './register';
import CreateProductPage from './create-product';
import UpdateProductPage from './update-product';
import OverviewPage from './overview';
import CheckoutPage from './checkout';
import NotFoundPage from './not-found';

function Pages() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/product/create" element={<CreateProductPage />} />
      <Route exact path="/product/:productId" element={<UpdateProductPage />} />
      <Route exact path="/cart" element={<OverviewPage />} />
      <Route exact path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Pages;
