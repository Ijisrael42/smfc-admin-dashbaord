import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { tutorService } from '../../services/tutorService'; 
import { fieldService } from '../../services/fieldService'; 
import { useForm, Controller } from "react-hook-form";
import useResolver from '../../helpers/resolver';
import { useParams, useNavigate, useLocation } from 'react-router';
import * as Yup from 'yup';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Backdrop, CircularProgress, Select, MenuItem, InputLabel, FormControl, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { config } from "../../helpers/config";

const TutorView = (props) => {
  const [values, setValues] = useState({ password: '', confirm: '' });
  const [field, setField] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const options = [ "Enabled", "Disabled" ];
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const [ tutor, setTutor ] = useState();
  const [ data, setData ] = useState();
  const [files, setFiles] = useState([]);

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const [dense, setDense] = React.useState(false);

  useEffect( () => {

    if( id !== "create" ) {
      handleToggle();
      tutorService.getById(id)
      .then( async (tutor) => { 
        const field = await fieldService.getById(tutor.category);
        setTutor(tutor); setOpen(false); 
        if(tutor.documents) setFiles(tutor.documents.split(','));

        const data = { name: tutor.name, email: tutor.email, account_status: tutor.account_status, 
          category: field.name
        };
        setData(data);
      })    
      .catch( error => console.log(error) );
    }
  },[]);

  const convertToGrid = (data, size) => {
    let count = 0;
    let grid = [], el = [], item, header;

    for( var x in data ) {
      header = x[0].toUpperCase() + x.slice(1);

      if(header.indexOf('_') !== -1) { header = header.replaceAll(/_/g, " "); }
      item = ( <Grid key={x} item md={size} xs={12} >            
        <List dense={dense}>
          <Typography variant="subtitle2" gutterBottom component="div"> {header} </Typography>
          <Typography variant="subtitle1" gutterBottom> {data[x]} </Typography>
        </List>
        <Hidden mdUp> <Divider /> </Hidden> 
      </Grid> 
      );

      el.push(item);
      if( size === 12 ){
        grid.push(<div key={count}><Grid  container spacing={2}>{el}</Grid><Hidden smDown> <Divider /> </Hidden></div>); el = [];
      }
      
      else if( count % 2 !== 0 ) { 
        grid.push(<div key={count}><Grid  container spacing={2}>{el}</Grid><Hidden smDown> <Divider /> </Hidden></div>); el = [];
      }
      count++;
    }
    return grid;
  };
  

  const update = (data) => {
    handleToggle();
    tutorService.update(id, data)
      .then( response => {   navigate(0); })
      .catch( error => console.log(error) );
  };

  const openFile = (str) => { window.location.href = str };

  return (
    <>
      <Card>
        <CardHeader subheader="Tutor Details" title="Tutor" />
        <Divider />
        <CardContent>
          {data && convertToGrid(data, 6) }
          {data && convertToGrid({description: tutor.description, experience: tutor.experience, }, 12) }
          <Grid container spacing={2}>
            <Grid item xs={12} >          
  
              <List dense={dense}>
                <Typography variant="subtitle2" gutterBottom component="div"> Documents</Typography>
                { files && files.map( (file, key) =>  ( 
                  <div  key={key}>
                    <ListItem>
                      <ListItemText id="switch-list-label-wifi" primary={file} />
                      <Button size="small" onClick={() => openFile(`${config.apiUrl}/files/image/${file}`)} variant="contained">VIEW</Button>
                    </ListItem>                
                    <Divider />
                  </div>
                ))}    
              </List>
            </Grid>           
          </Grid>
          
        </CardContent>
      </Card>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={() => handleClose()} >
        <CircularProgress color="inherit" />
      </Backdrop>    

    </>
  );
};

export default TutorView;
