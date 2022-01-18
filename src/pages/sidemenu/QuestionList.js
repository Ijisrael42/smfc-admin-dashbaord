import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TabToolbar from '../../components/TabToolbar';
import EnhancedTable from '../../components/EnhancedTable';
import { fieldService } from '../../services/fieldService'; 
import { questionService } from '../../services/questionService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

const QuestionList = () => {
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title', },
    { id: 'no_of_hours', numeric: false, disablePadding: false, label: 'No. of Hours', },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category', },
    { id: 'budget', numeric: false, disablePadding: false, label: 'Budget', },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status', },
  ];

  const [tab, setTab] = React.useState("ALL");
  const [ questions, setQuestions ] = useState([]);
  const [ submitted, setSubmitted ] = useState([]);
  const [ responded, setResponded ] = useState([]);
  const [ paid, setPaid ] = useState([]);
  const [ complete, setComplete ] = useState([]);
  const [ length, setLength ] = useState({ "ALL": 0, "SUBMITTED": 0, "RESPONDED": 0, "PAID": 0, "COMPLETE": 0 });
  const statuses = [ "ALL", "SUBMITTED", "RESPONDED", "PAID", "COMPLETE" ];
  const handleChange = (event, newValue) => {  setTab(newValue); };

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();


  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  function createData( id, title, no_of_hours, category, budget, status ) { 
    return { id, title, no_of_hours, category, budget, status }; 
  }

  useEffect( () => { 

    setOpen(true);
    questionService.getAll()
    .then( async (response)  => { 
      const fields = await fieldService.getAll();
      let fieldNames = [], submitted = [],responded = [], paid = [], complete = [];
      fields.forEach( (field) => { fieldNames[field.id] = field.name; });

      setOpen(false); console.log(response);  
      const questions = response.map( el => {
        let category = fieldNames[el.category] ? fieldNames[el.category] : el.category;
        let data = createData( el.id, el.title, el.no_of_hours, category, el.budget,  el.status);

        if( el.status === "Submitted" ) submitted.push(data);
        if( el.status === "Responded" ) responded.push(data);
        else if(  el.status === "Paid" ) paid.push(data);
        else if(  el.status === "Complete" ) complete.push(data);
        return data;
      });
      setLength({ "ALL": questions.length, "SUBMITTED": submitted.length, "RESPONDED": responded.length, 
      "PAID": paid.length, "COMPLETE": complete.length });
      setQuestions(questions); setSubmitted(submitted); setResponded(responded); setPaid(paid); setComplete(complete);
    })
    .catch( error => console.log(error) );

    return () => {setQuestions(null)};
  },[]);

  const deleteSelected = () => {
    console.log(selected);
    setOpen(true);

    questionService.deletemany(selected)
    .then( response => { setOpen(true); navigate(0); })
    .catch( error => console.log(error) );
  }

  return (
    <>
      <Helmet> <title>Questions | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <TabToolbar module="question" tab={tab} length={length} handleChange={handleChange} statuses={statuses} />
          <Box sx={{ pt: 3 }}>            
            { questions && tab === "ALL" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={questions} module="question" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { submitted && tab === "SUBMITTED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={submitted} module="question" 
              deleteSelected={deleteSelected} headCells={headCells}  />) 
            }  

            { responded && tab === "RESPONDED" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={responded} module="question" 
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

export default QuestionList;
