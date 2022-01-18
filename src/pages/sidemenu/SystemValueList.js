import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SystemValueListToolbar from '../../components/systemvalues/SystemValueListToolbar';
import EnhancedTable from '../../components/EnhancedTable';
import { systemvalueService } from '../../services/systemvalueService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

const SystemValueList = () => {

  const headCells1 = [ { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)', },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories', },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)', },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)', },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)', },
  ];
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
    { id: 'value', numeric: false, disablePadding: false, label: 'Value', },
  ];

  const [ systemvalues, setSystemValues ] = useState();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  useEffect( () => { 
    setOpen(true);
    systemvalueService.getAll()
    .then( response => { setOpen(false); console.log(response); setSystemValues(response); })
    .catch( error => console.log(error) );

    return () => {setSystemValues(null)};
  },[]);

  const deleteSelected = () => {
    console.log(selected);
    setOpen(true);

    systemvalueService.deletemany(selected)
    .then( response => { setOpen(true); navigate(0); })
    .catch( error => console.log(error) );
  }

  return (
    <>
      <Helmet> <title>System Values | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <SystemValueListToolbar module="systemvalue" />
          <Box sx={{ pt: 3 }}>
            { systemvalues && (<EnhancedTable selected={selected} setSelected={setSelected} rows={systemvalues} module="systemvalue" 
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

export default SystemValueList;
