import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { CurrentUserContext } from './current-user.provider';

function LogoutButton() {
  const { logout } = useContext(CurrentUserContext);
  return (
    <Button variant="link" onClick={logout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
