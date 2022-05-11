import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import apiClient from './api-client';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  function add(item) {
    setItems(prev => prev.concat({
      ...item,
      amount: 1,
      paid: 0,
      toPay: 0,
    }));
  }

  function remove(itemId) {
    setItems(prev => prev.filter(p => p.id !== itemId));
  }

  function setAmount(itemId, amount) {
    setItems(prev => prev.map(p => (p.id !== itemId ? p : {
      ...p,
      amount,
    })));
  }

  function setToPay(itemId, toPay) {
    setItems(prev => prev.map(p => (p.id !== itemId ? p : { ...p, toPay })));
  }

  function setPaid(itemId, paid) {
    setItems(prev => prev.map(p => (p.id !== itemId ? p : { ...p, paid })));
  }

  function Pay() {
    const itemsToPay = items.reduce((filtered, item) => {
      if (item.toPay > 0) filtered.push(item.id);
      return filtered;
    });

    apiClient.get('/product', ) // PICKUP

    setItems(prev => prev.map(p => (p.toPay === 0 ? p : { ...p, paid: (p.paid + p.toPay) })));
    if (items.every(item => item.paid === item.amount)) {

    }
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  return (
    <CartContext.Provider
      value={useMemo(() => ({
        items,
        add,
        remove,
        setAmount,
        setToPay,
        setPaid,
        Pay,
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
