import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CurrentUserProvider from './components/current-user.provider';
import CartProvider from './components/cart.provider';
import Layout from './components/layout';
import Pages from './pages';

function App() {
  return (
    <Router>
      <CurrentUserProvider>
        <CartProvider>
          <Layout>
            <Pages />
          </Layout>
        </CartProvider>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;
