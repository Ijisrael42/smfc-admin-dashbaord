import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { accountService } from '../../services/accountService'; 
import { useForm, Controller } from "react-hook-form";
import * as Yup from 'yup';
import useResolver from "../../helpers/resolver";
import { Backdrop, Snackbar, Alert, AlertTitle, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
 
const ProfilePassword = (props) => {

  const delay = 5000;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [user, setUser] = useState(false);
  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const handleClick = () => { setOpenSnackBar(true); };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackBar(false);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirm: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const { control, handleSubmit, errors } = useForm({ resolver: useResolver(validationSchema), });
  useEffect( () => { ( async () => { setUser(await accountService.userValue); })(); },[]);

  const update = (data) => {
    handleToggle();
    accountService.update(user.id, data)
    .then( response => { handleClick(); setTimeout(() => navigate(0), delay); })
    .catch( error => console.log(error) );
  };

  return (
    <>
      <form {...props} onSubmit={handleSubmit(update)}>
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <Controller control={control} name="password" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                <TextField fullWidth label="Password" margin="normal" type="password"
                onChange={onChange} value={value} variant="outlined" />          
              )}
            />
            { errors && errors['password'] && ( <Alert variant="outlined" severity="error">{errors['password'].message} </Alert>) }
            <Controller control={control} name="confirm" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                <TextField fullWidth label="Confirm password" margin="normal" type="password"
                onChange={onChange} value={value} variant="outlined" />          
              )}
            />
            { errors && errors['confirm'] && ( <Alert variant="outlined" severity="error">{errors['confirm'].message} </Alert>) }

          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end',  p: 2 }} >
            <Button type="submit" color="primary" variant="contained" >  Update </Button>
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
        <Alert variant="filled" onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle> You have successfully — <strong>Updated your Password!</strong>
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfilePassword;
