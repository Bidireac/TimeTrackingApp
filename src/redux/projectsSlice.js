import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: localStorage.getItem('AllAvailableProjects')
      ? JSON.parse(localStorage.getItem('AllAvailableProjects'))
      : [],
  },
  reducers: {
    addProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    deleteProject: (state, action) => {
      const filteredProjects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      state.projects = filteredProjects;
    },
    enableProjectEditing: (state, action) => {
      const updatingProjects = state.projects.map((project) => {
        if (project.id === action.payload) {
          project.isEditing = !project.isEditing;
          return project;
        } else {
          project.isEditing = false;
          return project;
        }
      });
      state.projects = updatingProjects;
    },
    updateProject: (state, action) => {
      const tempState = state.projects.map((project) => {
        if (project.id === action.payload.id) {
          const updatedProject = { ...action.payload, isEditing: false };
          return updatedProject;
        } else {
          return project;
        }
      });
      state.projects = tempState;
    },
    addTimeTask: (state, action) => {
      const tempState = state.projects.map((project) => {
        if (project.id === action.payload.parentId) {
          project.timeTasks = [...project.timeTasks, action.payload];
          return project;
        } else {
          return project;
        }
      });
      state.projects = tempState;
    },
    deleteTimeTask: (state, action) => {
      const { id, parentId } = action.payload;
      const tempState = state.projects.map((project) => {
        if (project.id === parentId) {
          const filteredTasks = project.timeTasks.filter(
            (task) => task.id !== id
          );
          project.timeTasks = filteredTasks;
          return project;
        } else {
          return project;
        }
      });
      state.projects = tempState;
    },
    editTimeTask: (state, action) => {
      const { parentId, id } = action.payload;
      const tempState = state.projects.map((project) => {
        if (project.id === parentId) {
          const tempTimeTasks = project.timeTasks.map((task) => {
            if (task.id === id) {
              return (task = action.payload);
            } else {
              return task;
            }
          });
          project.timeTasks = tempTimeTasks;
          return project;
        } else {
          return project;
        }
      });
      state.projects = tempState;
    },
  },
});

export const {
  addProject,
  deleteProject,
  enableProjectEditing,
  updateProject,
  addTimeTask,
  deleteTimeTask,
  editTimeTask,
} = projectsSlice.actions;

export default projectsSlice.reducer;
