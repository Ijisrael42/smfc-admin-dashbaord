import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EarningView from '../../components/earnings/EarningView';

const Earning = () => (
  <>
    <Helmet> <title>Earning | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <EarningView  /> </Box>
      </Container>
    </Box>
  </>
);

export default Earning;
