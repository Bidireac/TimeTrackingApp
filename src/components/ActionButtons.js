import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteProject, enableProjectEditing } from '../redux/projectsSlice';

const ActionButtons = ({ id }) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(enableProjectEditing(id));
  };

  const handleDelete = () => {
    dispatch(deleteProject(id));
  };

  return (
    <ButtonGroup variant="text" aria-label="action buttons group">
      <Button>
        <NavLink
          to={`/project/${id}`}
          style={{ textDecoration: 'none', color: '#1976d2' }}
        >
          View
        </NavLink>
      </Button>
      <Button onClick={handleUpdate}>Update</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </ButtonGroup>
  );
};

export default ActionButtons;
