import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
// import apiClient from '../api-client';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  function add(item) {
    if (items.some(i => i.id === item.id)) {
      setItems(prev => prev.map(p => (p.id !== item.id ? p : {
        ...p,
        amount: p.amount + 1,
      })));
    } else {
      setItems(prev => prev.concat({
        ...item,
        amount: 1,
        paid: 0,
        toPay: 0,
      }));
    }
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

  function done() {
    return items.every(item => item.paid === item.amount);
  }

  function pay() {
    setItems(prev => prev.map(
      p => (p.toPay === 0 ? p : { ...p, toPay: 0, paid: (p.paid + p.toPay) }),
    ));
  }

  function checkout() {
    if (done()) {
      setItems([]);
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
        done,
        pay,
        checkout,
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
