import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EnhancedTable from '../../components/EnhancedTable';
import { accountService } from '../../services/accountService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';
import TabToolbar from '../../components/TabToolbar';

const StudentList = () => {
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', },
    { id: 'contact_no', numeric: false, disablePadding: false, label: 'Contact No.', },
  ];

  function createData( id, name, email, contact_no, ) { 
    return { id, name, email, contact_no }; 
  }

  const [ students, setStudents ] = useState();
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
    accountService.getByParams({role: "User"})
    .then( async (response)  => { 
      console.log(response);
      let active = [], disabled = [];

      setOpen(false);
      const students = response.map( el =>  {
        let data = createData( el.id, el.name, el.email, el.contact_no );

        if( el.status === "Active" ) active.push(data);
        if( el.status === "Disabled" ) disabled.push(data);
        return data;
      });
      setLength({ "ALL": students.length, "ACTIVE": active.length, "DISABLED": disabled.length });
      setStudents(students); setActive(active); setDisabled(disabled); 
    })
    .catch( error => console.log(error) );

    return () => {setStudents(null)};
  },[]);

  const deleteSelected = () => {
    console.log(selected);
    setOpen(true);

    accountService.deletemany(selected)
    .then( response => { setOpen(true); navigate(0); })
    .catch( error => console.log(error) );
  }

  return (
    <>
      <Helmet> <title>Students | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <TabToolbar module="students" tab={tab} length={length} handleChange={handleChange} statuses={statuses} />
          <Box sx={{ pt: 3 }}>            

            { students && tab === "ALL" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={students} module="student" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { active && tab === "ACTIVE" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={active} module="student" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { disabled && tab === "DISABLED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={disabled} module="student" 
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

export default StudentList;
