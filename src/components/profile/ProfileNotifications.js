import { Box, Button, Card, CardContent,  CardHeader, Checkbox, Divider, FormControlLabel, Grid, Typography, 
Backdrop, Snackbar, Alert, AlertTitle, CircularProgress, Switch, } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { accountService } from '../../services/accountService'; 
import { config } from '../../helpers/config';
import { messaging } from '../../helpers/firebase';
import { useNavigate } from 'react-router-dom';

const ProfileNotifications = (props) => {

  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState("success");
  const [alert, setAlert] = useState();

  const delay = 5000;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const setAlertBody = ( state, onOff ) => { 
    const stateMessage = state === "success" ? "Success" : "Error";
    const alert = (<>
      <AlertTitle>{stateMessage}</AlertTitle> 
      You have successfully — <strong>Turned {onOff} Notification!</strong>
    </>);
    setAlert(alert); handleClose(); handleClick(); setTimeout(() => navigate(0), delay);
  }

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const handleClick = () => { setOpenSnackBar(true); };
  const handleChange = (event) => { 
    setChecked(event.target.checked); 
    enableDisable(event.target.checked);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackBar(false);
  };

  useEffect(() => {
    ( async () => {
      const user = await accountService.userValue;
      console.log(user);
      const isToken = ( user && user.device_token !== "" ) ? true : false;
      setUser(user); setChecked(isToken);
    })();

  }, []);

  const enableDisable = async (isEnabled) => {

    if( isEnabled === checked ) return;
    setChecked(isEnabled); handleToggle();

    if( isEnabled === true ) enable();
    else if( isEnabled === false ) update("");
  };

  const enable = async () => {

    try {
      const currentToken = await messaging.getToken({ vapidKey: config.vapidKey });
      console.log(currentToken);
      if (currentToken) update(currentToken);
      else { setAlertBody( "error", "on" ); }
    } 
    catch (err) { setAlertBody( "error", "on" ); }
  }

  const update = ( token ) => {

    accountService.update(user.id, { device_token: token })
    .then(response => {       
      if( token === "" ) setAlertBody( "success", "off" );
      else setAlertBody( "success", "on" );
    })
    .catch(error => { 
        if( token === "" ) setAlertBody( "success", "off" );
        else setAlertBody( "success", "on" );
    });
  };

  return (
    <>
      <form {...props}>
        <Card>
          <CardHeader subheader="Manage the notifications" title="Notifications" />
          <Divider />
          <CardContent>
            <Grid container spacing={6} wrap="wrap" >
              <Grid item md={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }} xs={12} >
                <Typography color="textPrimary" gutterBottom variant="h6" > Notifications </Typography>
                <FormControlLabel 
                  control={<Switch checked={checked} onChange={handleChange} />} label="Push Notification" />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex',  justifyContent: 'flex-end', p: 2 }} >
            <Button color="primary" variant="contained" > Save </Button>
          </Box>
        </Card>
      </form>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop> 
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>   */} 
      <Snackbar open={openSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={delay} onClose={handleCloseSnackbar}>
        <Alert variant="filled" onClose={handleCloseSnackbar} severity={state} sx={{ width: '100%' }}> {alert} </Alert>
      </Snackbar>
    </>
  );
}
export default ProfileNotifications;
