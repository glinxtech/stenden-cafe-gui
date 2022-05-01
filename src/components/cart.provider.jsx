import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function add(item) {
    setItems(prev => prev.concat({ ...item, amount: 1 }));
  }

  function remove(itemId) {
    setItems(prev => prev.filter(p => p.id !== itemId));
  }

  function setAmount(itemId, amount) {
    setItems(prev => prev.map(p => (p.id !== itemId ? p : { ...p, amount })));
  }

  return (
    <CartContext.Provider
      value={useMemo(() => ({
        items,
        add,
        remove,
        setAmount,
      }), [items])}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
