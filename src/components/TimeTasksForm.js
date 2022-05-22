import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { addTimeTask, editTimeTask } from '../redux/projectsSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const CustomForm = styled('form')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const TimeTasksForm = ({
  id,
  handleCancel,
  taskEditingId,
  projectContainingTask,
}) => {
  let timeTasksData;
  if (taskEditingId) {
    timeTasksData = projectContainingTask.timeTasks.find(
      (task) => task.id === taskEditingId
    );
  } else {
    timeTasksData = {
      title: '',
      description: '',
      duration: '',
    };
  }
  const [taskDetails, setTaskDetails] = useState(timeTasksData);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, duration } = taskDetails;
    if (
      !title ||
      !description ||
      !duration ||
      title.length <= 2 ||
      description.length <= 2
    ) {
      alert(
        'Please complete all the necessary fields before adding a new task!'
      );
      return;
    }
    if (taskEditingId) {
      dispatch(editTimeTask(taskDetails));
      handleCancel();
    } else {
      const taskToAdd = {
        ...taskDetails,
        id: uuidv4(),
        parentId: id,
      };
      dispatch(addTimeTask(taskToAdd));
      handleCancel();
    }
  };

  return (
    <CustomForm onSubmit={handleSubmit}>
      <TextField
        id="task-title"
        label="Task Title"
        variant="outlined"
        sx={{ margin: '15px 0px' }}
        type="text"
        name="title"
        value={taskDetails.title}
        onChange={(e) => handleInput(e)}
      />
      <TextField
        id="task-duration"
        label="Duration Time In Hours"
        variant="outlined"
        sx={{ margin: '15px 0px' }}
        type="number"
        name="duration"
        value={taskDetails.duration}
        onChange={(e) => handleInput(e)}
      />
      <TextField
        id="task-description"
        label="Task Description"
        multiline
        variant="outlined"
        sx={{ margin: '15px 0px' }}
        type="text"
        name="description"
        value={taskDetails.description}
        onChange={(e) => handleInput(e)}
      />
      {taskEditingId ? (
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: '20px' }}
          type="submit"
          color="secondary"
        >
          Edit Task
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: '20px' }}
          type="submit"
        >
          Add Task
        </Button>
      )}
    </CustomForm>
  );
};

export default TimeTasksForm;
