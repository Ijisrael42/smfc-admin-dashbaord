import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EnhancedTable from '../../components/EnhancedTable';
import { tutorService } from '../../services/tutorService'; 
import { fieldService } from '../../services/fieldService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';
import TabToolbar from '../../components/TabToolbar';

const TutorList = () => {
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category', },
    { id: 'account_status', numeric: false, disablePadding: false, label: 'Status', },
  ];

  function createData( id, name, email, category, account_status) { 
    return { id, name, email, category, account_status }; 
  }

  const [ tutors, setTutors ] = useState();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("ALL");
  const [ active, setActive ] = useState([]);
  const [ disabled, setDisabled ] = useState([]);
  const [ length, setLength ] = useState({ "ALL": 0, "ACTIVE": 0, "DISABLED": 0 });
  const statuses = [ "ALL", "ACTIVE", "DISABLED" ];
  const handleChange = (event, newValue) => {  setTab(newValue); };

  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  useEffect( () => { 
    setOpen(true);
    tutorService.getByParams({application_status: "Approved"})
    .then( async (response)  => { 
      const fields = await fieldService.getAll();
      let fieldNames = [], active = [], disabled = [];

      fields.forEach( (field) => { fieldNames[field.id] = field.name; });

      setOpen(false);
      const tutors = response.map( el => {
        let category = fieldNames[el.category] ? fieldNames[el.category] : el.category;
        let data = createData( el.id, el.name, el.email, category, el.account_status);

        if( el.account_status === "Active" ) active.push(data);
        if( el.account_status === "Disabled" ) disabled.push(data);
        return data;
      });
      setLength({ "ALL": tutors.length, "ACTIVE": active.length, "DISABLED": disabled.length });
      setTutors(tutors); setActive(active); setDisabled(disabled); 
    })
    .catch( error => console.log(error) );

    return () => {setTutors(null)};
  },[]);

  const deleteSelected = () => {
    console.log(selected);
    setOpen(true);

    tutorService.deletemany(selected)
    .then( response => { setOpen(true); navigate(0); })
    .catch( error => console.log(error) );
  }

  return (
    <>
      <Helmet> <title>Tutors | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <TabToolbar module="tutors" tab={tab} length={length} handleChange={handleChange} statuses={statuses} />
          <Box sx={{ pt: 3 }}>            

            { tutors && tab === "ALL" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={tutors} module="tutor" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { active && tab === "ACTIVE" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={active} module="tutor" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { disabled && tab === "DISABLED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={disabled} module="tutor" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  
          </Box>
        </Container>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop>    
    </>
  );
}

export default TutorList;
