import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { systemvalueService } from '../../services/systemvalueService'; 
import { useForm, Controller } from "react-hook-form";
import useResolver from '../../helpers/resolver';
import { useParams, useNavigate, useLocation } from 'react-router';
import * as Yup from 'yup';
import { Backdrop, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const SystemValueForm = (props) => {
  const [systemvalue, setSystemValue] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const route = location.pathname.split("/")[2];

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const validationSchema = Yup.object().shape({ name: Yup.string().required('Name is required')});

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: useResolver(validationSchema),
    defaultValues: {name: ""}
  });

  useEffect( () => {

    if( id !== "create" ) {
      handleToggle();
      systemvalueService.getById(id)
      .then( response => {  setSystemValue(response); reset(response); setOpen(false); })    
      .catch( error => console.log(error) );
    }
  },[reset]);

  const update = (data) => {
    handleToggle();
    if( id === "create" ) {

      systemvalueService.create(data)
      .then( response => { navigate(`/app/${route}s`); })
      .catch( error => console.log(error) );
    }
    else {
      systemvalueService.update(id, data)
      .then( response => {   navigate(0); })
      .catch( error => console.log(error) );
    }
  };

  return (
    <>
      <form {...props} onSubmit={handleSubmit(update)}>           
        <Card>
          <CardHeader subheader={ id === "create" ? "Create System Value" : "Update System Value" } title="System Value" />
          <Divider />
          <CardContent>
            <Controller control={control} name="name" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                <TextField fullWidth label="Name" margin="normal" name="name"
                onChange={onChange}  type="text" value={value} variant="outlined" />          
              )}
            />
            <Controller control={control} name="value" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                <TextField fullWidth label="Value" margin="normal" name="value"
                onChange={onChange}  type="text" value={value} variant="outlined" />          
              )}
            />
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >            
            <Button type="submit" color="primary" variant="contained" >
               { id === "create" ? "Create" : "Update" }
            </Button>
          </Box>
        </Card>
      </form>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop>    

    </>
  );
};

export default SystemValueForm;
