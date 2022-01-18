import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TabToolbar from '../../components/TabToolbar';
import EnhancedTable from '../../components/EnhancedTable';
import { fieldService } from '../../services/fieldService'; 
import { questionService } from '../../services/questionService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

const SessionList = () => {
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title', },
    { id: 'no_of_hours', numeric: false, disablePadding: false, label: 'No. of Hours', },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category', },
    { id: 'budget', numeric: false, disablePadding: false, label: 'Budget', },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status', },
  ];

  const [tab, setTab] = React.useState("ALL");
  const [ sessions, setSessions ] = useState();
  const [ paid, setPaid ] = useState([]);
  const [ complete, setComplete ] = useState([]);
  const [ length, setLength ] = useState({ "ALL": 0, "PAID": 0, "COMPLETE": 0 });
  const statuses = [ "ALL", "PAID", "COMPLETE" ];
  const handleChange = (event, newValue) => {  setTab(newValue); };

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  useEffect( () => { 
    setOpen(true);
    questionService.getAll()
    .then( async (response)  => { 
      const fields = await fieldService.getAll();
      let fieldNames = [], paid = [], complete = [];
      fields.forEach( (field) => { fieldNames[field.id] = field.name; });

      setOpen(false); 
      let sessions = [], statuses = [ "Paid", "Complete" ];

      response.forEach(el => {
        if( statuses.indexOf(el.status) !== -1 ){
          let category = fieldNames[el.category] ? fieldNames[el.category] : el.category;
          let data = createData( el.id, el.title, el.no_of_hours, category, el.budget,  el.status);

          if( el.status === "Paid" ) paid.push(data);
          else if(  el.status === "Complete" ) complete.push(data);
          sessions.push( data );
        }        
      });
      setLength({ "ALL": sessions.length, "PAID": paid.length, "COMPLETE": complete.length });
      setSessions(sessions); setPaid(paid); setComplete(complete);
    })
    .catch( error => console.log(error) );

    return () => {setSessions(null)};
  },[]);

  function createData( id, title, no_of_hours, category, budget, status ) { 
    return { id, title, no_of_hours, category, budget, status }; 
  }

  const deleteSelected = () => {
    console.log(selected);
    setOpen(true);

    questionService.deletemany(selected)
    .then( response => { setOpen(true); navigate(0); })
    .catch( error => console.log(error) );
  }

  return (
    <>
      <Helmet> <title>Sessions | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <TabToolbar module="question" tab={tab} length={length} handleChange={handleChange} statuses={statuses} />
          <Box sx={{ pt: 3 }}>

            { sessions && tab === "ALL" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={sessions} module="question" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { paid && tab === "PAID" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={paid} module="question" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }          

            { complete && tab === "COMPLETE" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={complete} module="question" 
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

export default SessionList;
