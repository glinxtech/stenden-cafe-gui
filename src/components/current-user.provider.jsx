import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import apiClient from '../api-client';

export const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem('currentUsername'));

  async function login({ user, password }) {
    const authToken = await apiClient.post('/user/login', {
      username: user,
      password,
    })
      .then(res => res.token);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUsername', user);
    setUsername(user);
  }

  async function logout() {
    localStorage.clear();
    setUsername(null);
  }

  return (
    <CurrentUserContext.Provider
      value={useMemo(() => ({
        username: localStorage.getItem('authToken') && username,
        login,
        logout,
      }), [username])}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CurrentUserProvider;
