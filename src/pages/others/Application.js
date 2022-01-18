import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ApplicationView from '../../components/applications/ApplicationView';
import ApplicationListToolbar from '../../components/applications/ApplicationListToolbar';

const Application = () => (
  <>
    <Helmet> <title>Application | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <ApplicationListToolbar module="application" />
        <Box sx={{ pt: 3 }}>  <ApplicationView  /> </Box>
      </Container>
    </Box>
  </>
);

export default Application;
