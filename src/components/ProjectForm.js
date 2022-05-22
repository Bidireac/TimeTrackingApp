import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
  addProject,
  enableProjectEditing,
  updateProject,
} from '../redux/projectsSlice';

const ProjectFormContainer = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CustomForm = styled('form')({
  height: '100%',
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

let projectData = {
  title: '',
  description: '',
  timeTasks: [],
  allocatedHours: 0,
  isEditing: false,
};

const ProjectForm = ({ updatingProject }) => {
  const [projectDetails, setProjectDetails] = useState(projectData);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = projectDetails;
    if (
      !title ||
      !description ||
      title.length <= 2 ||
      description.length <= 2
    ) {
      alert(
        'Please complete all the necessary fields before adding a new project!'
      );
      return;
    }

    if (projectDetails.isEditing) {
      dispatch(updateProject(projectDetails));
      setProjectDetails(projectData);
    } else {
      const newProject = {
        ...projectDetails,
        id: uuidv4(),
      };
      dispatch(addProject(newProject));
      setProjectDetails(projectData);
    }
  };

  useEffect(() => {
    if (updatingProject) {
      projectData = updatingProject;
    } else {
      projectData = {
        title: '',
        description: '',
        timeTasks: [],
        allocatedHours: 0,
        isEditing: false,
      };
    }
    setProjectDetails(projectData);
  }, [updatingProject]);

  return (
    <ProjectFormContainer flex={4} sx={{ width: { xs: '90%', lg: '30%' } }}>
      <CustomForm onSubmit={handleSubmit}>
        <TextField
          id="project-name"
          label="Project Name"
          variant="standard"
          sx={{ margin: '20px 0px' }}
          type="text"
          name="title"
          value={projectDetails.title}
          onChange={(e) => handleInput(e)}
        />
        <TextField
          id="project-description"
          label="Project Description"
          multiline
          maxRows={10}
          variant="standard"
          sx={{ margin: '20px 0px' }}
          type="text"
          name="description"
          value={projectDetails.description}
          onChange={(e) => handleInput(e)}
        />
        {projectDetails.isEditing ? (
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            sx={{ width: '100%' }}
          >
            <Button
              size="small"
              color="secondary"
              sx={{ marginTop: '20px', width: '50%' }}
              type="submit"
            >
              Update Project
            </Button>
            <Button
              size="small"
              color="error"
              sx={{ marginTop: '20px', width: '50%' }}
              type="button"
              onClick={() => dispatch(enableProjectEditing(projectDetails.id))}
            >
              Cancel Update
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="outlined"
            size="medium"
            sx={{ marginTop: '20px', width: '50%' }}
            type="submit"
          >
            Add Project
          </Button>
        )}
      </CustomForm>
    </ProjectFormContainer>
  );
};

export default ProjectForm;
