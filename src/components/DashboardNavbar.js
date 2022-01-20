import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu as MenuIcon, Input as InputIcon, NotificationsOutlined as NotificationsIcon } from '@material-ui/icons';
import Logo from './Logo';
import { styled, useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MuiDrawer, Hidden, IconButton, Toolbar, AppBar as MuiAppBar, MenuItem, Typography, Menu } from '@mui/material';
import React from 'react';
import { accountService } from '../services/accountService'; 

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
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => { setAuth(event.target.checked); };
  const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  const logout = () => {
    const response = accountService.logout();
    if ( response === 'success' ) navigate('/');
    else response.then(() => navigate('/'));
  }

  return (
    <AppBar position="fixed" open={open} elevation={0} {...rest} >
        {/* Displays on the big screen */}

        <Hidden smDown>
          <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
                sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                <h2>{ bannerName ? bannerName : "Mini variant drawer" }</h2>
              </Typography>

              <div>
                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
                  aria-haspopup="true" onClick={handleMenu} color="inherit" >
                  <AccountCircle />
                </IconButton>
                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                  keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                  open={Boolean(anchorEl)} onClose={handleClose} >
                  <MenuItem component={RouterLink} to="/app/profile" >Profile</MenuItem>
                  <MenuItem onClick={() => logout()}>Log Out</MenuItem>
                </Menu>
              </div>
              
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
