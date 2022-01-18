import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SessionView from '../../components/sessions/SessionView';

const Session = () => (
  <>
    <Helmet> <title>Session | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <SessionView  /> </Box>
      </Container>
    </Box>
  </>
);

export default Session;
