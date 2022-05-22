import styled from '@emotion/styled';
import { Paper, Typography, Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { TimeTasks, TimeTasksForm } from '../components';
import { ArrowBack, Add, HighlightOff } from '@mui/icons-material';

const CustomBox = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fafafa',
});

const CustomPaper = styled(Paper)({
  width: '65%',
  height: '80%',
  overflowY: 'scroll',
  padding: '20px 0px',
});

const NavContainer = styled(Container)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
});

const ProjectPage = () => {
  const params = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const projectData = projects.find((project) => project.id === params.id);
  const { id, title, description, timeTasks } = projectData;
  const [addTasks, setAddTasks] = useState(false);
  const [enableEditing, setEnableEditing] = useState({
    isEditing: false,
    id: '',
  });
  const [allocatedHours, setAllocatedHours] = useState(0);

  const handleCancel = () => {
    setAddTasks(false);
    setEnableEditing({
      isEditing: false,
      id: '',
    });
  };

  useEffect(() => {
    const arrayOfHours = projectData.timeTasks.map((task) => task.duration);
    const totalAmount = arrayOfHours.reduce(
      (previousValue, currentValue) =>
        parseInt(previousValue) + parseInt(currentValue),
      0
    );
    setAllocatedHours(totalAmount);
  }, [projectData]);

  return (
    <CustomBox>
      <CustomPaper
        elevation={24}
        sx={{
          width: { xs: '100%', lg: '65%' },
          height: { xs: '100%', lg: '80%' },
        }}
      >
        <NavContainer>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="info">
              <ArrowBack /> Go Back
            </Button>
          </NavLink>
          {addTasks || enableEditing.isEditing ? (
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancel <HighlightOff />
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="info"
              onClick={() => setAddTasks(true)}
            >
              <Add /> Add Task
            </Button>
          )}
        </NavContainer>
        <Typography
          variant="h4"
          component="h2"
          color="secondary"
          sx={{ margin: '20px', lineBreak: 'anywhere', textAlign: 'center' }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ margin: '20px', lineBreak: 'anywhere' }}
        >
          {description}
        </Typography>
        <Typography variant="subtitle1" component="h2" sx={{ margin: '20px' }}>
          The total amount of hours needed to complete all the tasks from below
          is{' '}
          <Typography variant="h6" component="span" color="secondary">
            {allocatedHours}
          </Typography>
          .
        </Typography>
        {enableEditing.isEditing ? (
          <Container
            sx={{
              width: '65%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '15px',
            }}
          >
            <TimeTasksForm
              id={id}
              taskEditingId={enableEditing.id}
              projectContainingTask={projectData}
              handleCancel={handleCancel}
            />
          </Container>
        ) : (
          <Container
            sx={{
              width: { xs: '100%', lg: '65%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '15px',
            }}
          >
            {addTasks ? (
              <TimeTasksForm id={id} handleCancel={handleCancel} />
            ) : (
              <TimeTasks
                timeTasks={timeTasks}
                setEnableEditing={setEnableEditing}
              />
            )}
          </Container>
        )}
      </CustomPaper>
    </CustomBox>
  );
};

export default ProjectPage;
