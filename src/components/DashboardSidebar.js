// import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {  Avatar, Box, Button, Divider, Hidden, List, Typography } from '@material-ui/core';
import { AlertCircle as AlertCircleIcon, BarChart as BarChartIcon, Lock as LockIcon, Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon, User as UserIcon, UserPlus as UserPlusIcon, Users as UsersIcon } from 'react-feather';
import NavItem from './NavItem';
import { Drawer as MuiDrawer, Tooltip, ListItem, ListItemIcon, IconButton, ListItemText } from '@mui/material';
import { MoveToInbox as InboxIcon, Mail as MailIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,
  Article as ArticleIcon, AccessibilityNew as AccessibilityNewIcon, Group as GroupIcon, HelpOutline as HelpOutlineIcon,
  Videocam as VideocamIcon, DynamicFeed as DynamicFeedIcon, Paid as PaidIcon, }  from '@mui/icons-material/';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

const user = { avatar: '/static/images/avatars/avatar_6.png', jobTitle: 'Senior Developer', name: 'Katarina Smith' };

const items1 = [
  { href: '/app/dashboard', icon: BarChartIcon, title: 'Dashboard' },
  { href: '/app/customers', icon: UsersIcon, title: 'Customers' },
  { href: '/app/products', icon: ShoppingBagIcon, title: 'Products' },
  { href: '/app/account', icon: UserIcon, title: 'Account' },
  { href: '/app/settings', icon: SettingsIcon, title: 'Settings' },
  { href: '/login', icon: LockIcon, title: 'Login' },
  { href: '/register', icon: UserPlusIcon, title: 'Register' },
  { href: '/404', icon: AlertCircleIcon, title: 'Error' }
];

const items = [
  { href: '/app/fields', icon: BarChartIcon, title: 'Fields' },
  { href: '/app/applications', icon: ArticleIcon, title: 'Applications' },
  { href: '/app/tutors', icon: AccessibilityNewIcon, title: 'Tutors' },
  { href: '/app/students', icon: GroupIcon, title: 'Students' },
  { href: '/app/questions', icon: DynamicFeedIcon, title: 'Questions' },
  { href: '/app/sessions', icon: VideocamIcon, title: 'Sessions' },
  { href: '/app/earnings', icon: PaidIcon, title: 'Earnings' },
  { href: '/app/systemvalues', icon: SettingsIcon, title: 'System Values' },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerLg = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DashboardSidebar = ({ open, handleDrawerClose, toggleDrawer, state }) => {
  // const location = useLocation();
  const theme = useTheme();

  const list = (anchor) => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}
    >
      <List>
        {items.map((item,key) => ( 
          <ListItem component={RouterLink} to={item.href} button key={key}>
            <ListItemIcon> <item.icon /> </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      
    </Box>
  );

// Drawer

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }} >
        <Avatar component={RouterLink} src={user.avatar}
          sx={{ cursor: 'pointer', width: 64, height: 64 }} to="/app/account" />
        <Typography color="textPrimary" variant="h5" > {user.name} </Typography>
        <Typography color="textSecondary" variant="body2" > {user.jobTitle} </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => ( <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} /> ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ backgroundColor: 'background.default',  m: 2, p: 2 }} >
        <Typography align="center" gutterBottom variant="h4" > Need more? </Typography>
        <Typography align="center" variant="body2" >Upgrade to PRO version and access 20 more screens </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }} >
          <Button color="primary" component="a" href="https://react-material-kit.devias.io" variant="contained" >
            See PRO version
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
    
      <Hidden smDown>
        <DrawerLg variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {items.map((item,key) => (
              <Tooltip key={key} title={item.title} placement="right">
                <ListItem component={RouterLink} to={item.href} button >
                  <ListItemIcon> <item.icon /> </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Tooltip> 
            ))}
          </List>

          {/*
           <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </DrawerLg>
      </Hidden>

      <Hidden lgUp>
        <Drawer anchor="left" open={state} sx={ state ? { zIndex: 9999 } : {} } onClose={toggleDrawer} >
          {list("left")} </Drawer>
      </Hidden>
    </>
  );
};

/*** 
 * 
<Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
*/

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
