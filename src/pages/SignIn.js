import { Helmet } from 'react-helmet';
import { Box, Container, Button, Typography, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import useResolver from '../helpers/resolver';
import { useParams, useNavigate, useLocation } from 'react-router';
import * as Yup from 'yup';
import { Backdrop, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { accountService } from '../services/accountService'; 

const SignIn = (props) => {

  const [account, setSystemValue] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const route = location.pathname.split("/")[2];

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };  
  const validationSchema = Yup.object().shape({ email: Yup.string().required('Email is required')});

  const { control, handleSubmit, errors, reset } = useForm();

  const login = (data) => {

    handleToggle();
    accountService.login(data.email, data.password)
    .then((user) => navigate("/"))
    .catch(error => { console.log(error); });
  };

  return(
    <>
      <Helmet> <title>SignIn | Material Kit</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Typography color="textPrimary" variant="h2" > SMFC Admin Dashboard </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Typography color="textSecondary" gutterBottom variant="body2" >
              Use your email to Sign In Admin Dashboard
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>            
            <form {...props} onSubmit={handleSubmit(login)}>           
              <Card>
                <CardHeader subheader="Email and Password" title="Sign In" />
                <Divider />
                <CardContent>
                  <Controller control={control} name="email" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                      <TextField fullWidth label="Email" margin="normal" onChange={onChange}  type="text" value={value} variant="outlined" />          
                    )}
                  />
                  <Controller control={control} name="password" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                      <TextField fullWidth label="Password" margin="normal" type="password" onChange={onChange} value={value} variant="outlined" />    
                    )}
                  />
                </CardContent>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >            
                  <Button type="submit" fullWidth color="primary" variant="contained" > Submit </Button>
                </Box>
              </Card>
            </form>
          </Box>
        </Container>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop>    
    </>
  );
}

export default SignIn;
