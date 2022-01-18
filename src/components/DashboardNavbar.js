import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  // AppBar, 
  Badge, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DashboardNavbar = ({ open, handleDrawerOpen, toggleDrawer, state, bannerName, ...rest }) => {
  // const [notifications] = useState([]);

  return (
    <AppBar position="fixed" open={open} elevation={0} {...rest} >
        {/* Displays on the big screen */}

        <Hidden smDown>
          <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <h2>{ bannerName ? bannerName : "Mini variant drawer" }</h2>
              </Typography>

          </Toolbar>
        </Hidden>
        
        {/* Displays on the small screen */}
        <Hidden mdUp>
          <Toolbar >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <h2>{ bannerName ? bannerName : "Mini variant drawer" }</h2>
              </Typography>

          </Toolbar>
        </Hidden>
      </AppBar>
  );
};

/*** <AppBar
elevation={0}
{...rest}
>
<Toolbar>
  <RouterLink to="/"> <Logo /> </RouterLink>
  <Box sx={{ flexGrow: 1 }} />
  <Hidden xlDown>
    <IconButton color="inherit" size="large">
      <Badge badgeContent={notifications.length} color="primary" variant="dot" >
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <IconButton color="inherit" size="large"> <InputIcon /> </IconButton>
  </Hidden>
  <Hidden lgUp>
    <IconButton color="inherit" onClick={onMobileNavOpen} size="large"> <MenuIcon /> </IconButton>
  </Hidden>
</Toolbar>
</AppBar> */

/* 
DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
}; */

export default DashboardNavbar;
