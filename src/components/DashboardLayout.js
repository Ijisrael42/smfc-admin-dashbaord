import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import * as React from 'react';

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      // paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  const toggleDrawerOpen = () => { setState(true); };
  const toggleDrawerClose = () => { setState(false); };
  const location = useLocation();
  const str = location.pathname.split("/")[2];
  const name = str[0].toUpperCase() + str.slice(1);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar bannerName={name} open={open} handleDrawerOpen={handleDrawerOpen} toggleDrawer={toggleDrawerOpen} state={state} />
      <DashboardSidebar open={open} handleDrawerClose={handleDrawerClose} toggleDrawer={toggleDrawerClose} state={state} />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
