import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TutorView from '../../components/tutors/TutorView';
import TutorListToolbar from '../../components/tutors/TutorListToolbar';

const Tutor = () => (
  <>
    <Helmet> <title>Tutor | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <TutorListToolbar module="tutor" />
        <Box sx={{ pt: 3 }}>  <TutorView  /> </Box>
      </Container>
    </Box>
  </>
);

export default Tutor;
