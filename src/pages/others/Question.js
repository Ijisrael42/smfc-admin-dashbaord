import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import QuestionView from '../../components/questions/QuestionView';

const Question = () => (
  <>
    <Helmet> <title>Question | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <QuestionView  /> </Box>
      </Container>
    </Box>
  </>
);

export default Question;
