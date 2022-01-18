import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentView from '../../components/students/StudentView';
import StudentListToolbar from '../../components/students/StudentListToolbar';

const Student = () => (
  <>
    <Helmet> <title>Student | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <StudentListToolbar module="student" />
        <Box sx={{ pt: 3 }}>  <StudentView  /> </Box>
      </Container>
    </Box>
  </>
);

export default Student;
