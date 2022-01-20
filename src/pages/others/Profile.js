import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProfileNotifications from '../../components/profile/ProfileNotifications';
import ProfilePassword from '../../components/profile/ProfilePassword';

const Profile = () => (
  <>
    <Helmet> <title>Profile | Material Kit</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <ProfileNotifications />
        <Box sx={{ pt: 3 }}> <ProfilePassword /> </Box>
      </Container>
    </Box>
  </>
);

export default Profile;
