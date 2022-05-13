import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import apiClient from '../api-client';

export const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const [currentUsername, setUsername] = useState(localStorage.getItem('currentUsername'));

  async function login(values) {
    const authToken = await apiClient.post('/user/login', values).then(res => res.token);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUsername', values.username);
    setUsername(values.username);
  }

  async function logout() {
    localStorage.clear();
    setUsername(null);
  }

  return (
    <CurrentUserContext.Provider
      value={useMemo(() => ({
        username: localStorage.getItem('authToken') && currentUsername,
        login,
        logout,
      }), [currentUsername])}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CurrentUserProvider;
