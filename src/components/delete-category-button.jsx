import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import apiClient from '../api-client';

function DeleteCategoryButton({ categoryId, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function onClick() {
    setIsDeleting(true);
    return apiClient.delete(`/category/${categoryId}`)
      .then(onSuccess)
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <Button size="sm" variant="danger" disabled={isDeleting} onClick={onClick}>
      <FaTrash />
    </Button>
  );
}

DeleteCategoryButton.propTypes = {
  categoryId: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default DeleteCategoryButton;
