import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FieldListToolbar from '../../components/fields/FieldListToolbar';
import EnhancedTable from '../../components/EnhancedTable';
import { fieldService } from '../../services/fieldService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

const FieldList = () => {

  const headCells1 = [ { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)', },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories', },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)', },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)', },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)', },
  ];
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status', },
  ];

  const [ fields, setFields ] = useState();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const deleteSelected = () => {
    console.log(selected);
    setOpen(true);

    fieldService.deletemany(selected)
    .then( response => { setOpen(true); navigate(0); })
    .catch( error => console.log(error) );
  }

  useEffect( () => { 
    setOpen(true);
    fieldService.getAll()
    .then( response => { setOpen(false);  setFields(response); })
    .catch( error => console.log(error) );

    return () => {setFields(null)};
  },[]);

  return (
    <>
      <Helmet> <title>Fields | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <FieldListToolbar module="field" />
          <Box sx={{ pt: 3 }}>
            { fields && (<EnhancedTable selected={selected} setSelected={setSelected} rows={fields} module="field" 
              deleteSelected={deleteSelected} headCells={headCells} 
            />) }
          </Box>
        </Container>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop>    
    </>
  );
}

export default FieldList;
