import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { deleteTimeTask } from '../redux/projectsSlice';

const CustomBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const TimeTasks = ({ timeTasks, setEnableEditing }) => {
  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteTimeTask(payload));
  };

  if (timeTasks.length <= 0) {
    return (
      <>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ textAlign: 'center' }}
        >
          There are no tasks at the moment. Try and add one.
        </Typography>
      </>
    );
  }

  return (
    <Container>
      {timeTasks.map((task) => {
        const { parentId, id, title, description, duration } = task;
        return (
          <Accordion key={id} elevation={6}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={id}>
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ lineBreak: 'anywhere' }}>
              <CustomBox>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    size="small"
                    color="info"
                    onClick={(e) =>
                      setEnableEditing({ isEditing: true, id: id })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={(e) => handleDelete({ id, parentId, duration })}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
                <Chip
                  size="large"
                  variant="outlined"
                  color="secondary"
                  label={`${duration} hours`}
                />
              </CustomBox>
              <Typography variant="subtitle1" component="p">
                {description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default TimeTasks;
