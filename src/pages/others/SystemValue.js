import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SystemValueForm from '../../components/systemvalues/SystemValueForm';

const SystemValue = () => (
  <>
    <Helmet> <title>System Value | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <SystemValueForm  /> </Box>
      </Container>
    </Box>
  </>
);

export default SystemValue;
