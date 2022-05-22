import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Main, Project, Error } from './pages';

function App() {
  const projects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    localStorage.setItem('AllAvailableProjects', JSON.stringify(projects));
  }, [projects]);

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Box>
  );
}

export default App;
