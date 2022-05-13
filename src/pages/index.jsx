import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home';
import RegisterPage from './register';
import ProductListingPage from './product/listing';
import ProductUpdatePage from './product/update';
import CreateProductPage from './product/create';
import CategoryListingPage from './category/listing';
import CategoryUpdatePage from './category/update';
import CreateCategoryPage from './category/create';
import OverviewPage from './overview';
import CheckoutPage from './checkout';
import NotFoundPage from './not-found';

function Pages() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/product" element={<ProductListingPage />} />
      <Route exact path="/product/:productId" element={<ProductUpdatePage />} />
      <Route exact path="/create-product" element={<CreateProductPage />} />
      <Route exact path="/category" element={<CategoryListingPage />} />
      <Route exact path="/category/:categoryId" element={<CategoryUpdatePage />} />
      <Route exact path="/create-category" element={<CreateCategoryPage />} />
      <Route exact path="/cart" element={<OverviewPage />} />
      <Route exact path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Pages;
