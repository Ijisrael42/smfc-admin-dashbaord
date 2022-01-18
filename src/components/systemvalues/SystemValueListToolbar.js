import { Box, Button, } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const SystemValueListToolbar = (props) => (
  <Box {...props}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
      {/* <Button> Import </Button>  <Button sx={{ mx: 1 }}> Export </Button> */}
      <Button component={RouterLink}  to={`/app/${props.module}/create`} color="primary" variant="contained" > Add System Value </Button>
    </Box>    
  </Box>
);

export default SystemValueListToolbar;
