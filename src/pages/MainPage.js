import React from 'react';
import { Divider, Stack } from '@mui/material';
import { ProjectForm, ProjectsTable } from '../components';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const projects = useSelector((state) => state.projects.projects);
  const updatingProject = projects.find(
    (project) => project.isEditing === true
  );

  return (
    <Stack
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
      sx={{
        height: '100%',
        overflow: 'hidden',
        flexDirection: { xs: 'column-reverse', lg: 'row' },
      }}
    >
      <ProjectsTable projects={projects} />
      <Divider
        orientation="vertical"
        sx={{
          height: '75%',
          display: { xs: 'none', lg: 'block' },
          padding: '5px',
        }}
      />
      {updatingProject ? (
        <ProjectForm updatingProject={updatingProject} />
      ) : (
        <ProjectForm />
      )}
    </Stack>
  );
};

export default MainPage;
