import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TabToolbar from '../../components/TabToolbar';
import EnhancedTable from '../../components/EnhancedTable';
import { tutorService } from '../../services/tutorService'; 
import { fieldService } from '../../services/fieldService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

const ApplicationList = () => {
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category', },
    { id: 'application_status', numeric: false, disablePadding: false, label: 'Status', },
  ];

  function createData( id, name, email, category, application_status) { 
    return { id, name, email, category, application_status }; 
  }

  const [ applications, setApplications ] = useState();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("ALL");
  const [ submitted, setSubmitted ] = useState([]);
  const [ approved, setApproved ] = useState([]);
  const [ declined, setDeclined ] = useState([]);
  const [ length, setLength ] = useState({ "ALL": 0, "SUBMITTED": 0, "APPROVED": 0, "DECLINED": 0 });
  const statuses = [ "ALL", "SUBMITTED", "APPROVED", "DECLINED" ];
  const handleChange = (event, newValue) => {  setTab(newValue); };

  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  useEffect( () => { 
    setOpen(true);
    tutorService.getAll()
    .then( async (response)  => { 
      const fields = await fieldService.getAll();
      console.log(fields)
      let fieldNames = [], submitted = [], approved = [], declined = [];
      fields.forEach( (field) => { fieldNames[field.id] = field.name; });

      setOpen(false);
      const applications = response.map( el => {
        let category = fieldNames[el.category] ? fieldNames[el.category] : el.category;
        let data = createData( el.id, el.name, el.email, category, el.application_status);

        if( el.application_status === "Submitted" ) submitted.push(data);
        if( el.application_status === "Approved" ) approved.push(data);
        else if( el.application_status === "Declined" ) declined.push(data);
        return data;
      });
       
      setLength({ "ALL": applications.length, "SUBMITTED": submitted.length, "APPROVED": approved.length, "DECLINED": declined.length });
      setApplications(applications); setSubmitted(submitted); setApproved(approved); setDeclined(declined);
    })
    .catch( error => console.log(error) );

    return () => {setApplications(null)};
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
      <Helmet> <title>Applications | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <TabToolbar module="applications" tab={tab} length={length} handleChange={handleChange} statuses={statuses} />
          <Box sx={{ pt: 3 }}>            

            { applications && tab === "ALL" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={applications} module="application" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { submitted && tab === "SUBMITTED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={submitted} module="application" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { approved && tab === "APPROVED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={approved} module="application" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { declined && tab === "DECLINED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={declined} module="application" 
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

export default ApplicationList;
