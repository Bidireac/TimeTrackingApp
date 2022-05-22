import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import ActionButtons from './ActionButtons';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTableContainer = styled(TableContainer)({
  height: '100%',
  width: '70%',
  margin: '40px 0px 0px 10px',
  alignSelf: 'flex-start',
});

const ProjectsTable = ({ projects }) => {
  if (projects.length <= 0) {
    return (
      <Box
        sx={{
          height: '100%',
          width: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          There are no active projects at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <CustomTableContainer sx={{ width: { xs: '95%', lg: '70%' } }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => {
            const { id, title, description } = project;
            return (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {title.length > 20 ? `${title.substring(0, 20)}...` : title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {description.length > 40
                    ? `${description.substring(0, 40)}...`
                    : description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <ActionButtons id={id} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default ProjectsTable;
