import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { questionService } from '../../services/questionService'; 
import { fieldService } from '../../services/fieldService'; 
import { accountService } from '../../services/accountService'; 
import { tutorService } from '../../services/tutorService'; 
import { useParams, useNavigate, useLocation } from 'react-router';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Backdrop, CircularProgress, Select, MenuItem, InputLabel, FormControl, Hidden } from '@mui/material';
import { config } from "../../helpers/config";

const QuestionView = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [ question, setQuestion ] = useState();
  const [ data, setData ] = useState();
  const [files, setFiles] = useState([]);

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const [dense, setDense] = React.useState(false);

  useEffect( () => {

    if( id !== "create" ) {
      handleToggle();
      questionService.getById(id)
      .then( async (question) => { 
        let categoryName = "N/A", userName = "N/A", tutorName = "N/A";

        try { const field = await fieldService.getById(question.category);  categoryName = field.name; }
        catch(error){ console.log(error)};
        try {  const user = await accountService.getById(question.user_id);  userName = user.name; }
        catch(error){ console.log(error)};
        try { const tutor = await tutorService.getById(question.tutor_id); tutorName = tutor.name; }
        catch(error){ console.log(error)};

        setQuestion(question); console.log(question); setOpen(false); 
        if(question.image_name) setFiles(question.image_name.split(','));

        const data = { title: question.title, no_of_hours: question.no_of_hours, category: categoryName, budget: question.budget,
           status: question.status, date_time: question.date_time, student: userName, tutor: tutorName
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
    questionService.update(id, data)
      .then( response => {   navigate(0); })
      .catch( error => console.log(error) );
  };

  const openFile = (str) => { window.location.href = str };

  return (
    <>
      <Card>
        <CardHeader subheader="Question details" title="Question" />
        <Divider />
        <CardContent>
          {data && convertToGrid(data, 6) }
          {data && convertToGrid({description: question.description }, 12) }
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

export default QuestionView;
