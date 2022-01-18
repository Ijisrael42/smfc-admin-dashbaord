import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FieldForm from '../../components/fields/FieldForm';

const Field = () => (
  <>
    <Helmet> <title>Field | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <FieldForm  /> </Box>
      </Container>
    </Box>
  </>
);

export default Field;
