import React from 'react';
import CartProvider from './components/cart.provider';
import Layout from './components/layout';
import Pages from './pages';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Pages />
      </Layout>
    </CartProvider>
  );
}

export default App;
