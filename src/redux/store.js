import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './projectsSlice';

export default configureStore({
  reducer: {
    projects: projectsSlice,
  },
});
