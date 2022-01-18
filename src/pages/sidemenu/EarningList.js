import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TabToolbar from '../../components/TabToolbar';
import EnhancedTable from '../../components/EnhancedTable';
import { fieldService } from '../../services/fieldService'; 
import { bidService } from '../../services/bidService'; 
import { questionService } from '../../services/questionService'; 
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

const EarningList = () => {
  
  const headCells = [ { id: 'id', numeric: false, disablePadding: true, label: 'ID', },
    { id: 'no_of_hours', numeric: false, disablePadding: false, label: 'No. of Hours', },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category', },
    { id: 'budget', numeric: false, disablePadding: false, label: 'Budget', },
    { id: 'bid_amount', numeric: false, disablePadding: false, label: 'Bid Amount', },
    { id: 'service_fee', numeric: false, disablePadding: false, label: 'Service Fee', },
  ];

  const [ earnings, setEarnings ] = useState();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("ALL");
  const [ paid, setPaid ] = useState([]);
  const [ complete, setComplete ] = useState([]);
  const [ length, setLength ] = useState({ "ALL": 0, "PAID": 0, "COMPLETE": 0 });
  const statuses = [ "ALL", "PAID", "COMPLETE" ];
  const handleChange = (event, newValue) => {  setTab(newValue); };

  const handleClickOpen = () => {  setOpen(true); };
  const handleClose = () => { setOpen(false); };

  useEffect( () => { 
    setOpen(true);
    questionService.getAll()
    .then( async (response)  => { 
      const fields = await fieldService.getAll(), bids = await bidService.getAll();
      console.log(bids)
      let fieldNames = [], bidAmounts = [], paid = [], complete = [];

      fields.forEach( (field) => { fieldNames[field.id] = field.name; });
      bids.forEach( (bid) => { bidAmounts[bid.id] = bid.price; });

      setOpen(false); 
      let earnings = [], statuses = [ "Paid", "Complete" ];

      response.forEach(el => {
        if( statuses.indexOf(el.status) !== -1 ){
          let category = fieldNames[el.category] ? fieldNames[el.category] : el.category;
          let fee = 0, bid = el.bid_id, feePercentage = .2;

          if( bidAmounts[el.bid_id] ) { bid = bidAmounts[el.bid_id]; fee = bid * feePercentage; }          
          let data = createData( el.id, el.no_of_hours, category, "R " + el.budget, "R " + bid, "R " + fee );

          if( el.status === "Paid" ) paid.push(data);
          else if(  el.status === "Complete" ) complete.push(data);
          earnings.push( data );          
        }        
      });
      setLength({ "ALL": earnings.length, "PAID": paid.length, "COMPLETE": complete.length });
      setEarnings(earnings); setPaid(paid); setComplete(complete);
    })
    .catch( error => console.log(error) );

    return () => {setEarnings(null)};
  },[]);

  function createData( id, no_of_hours, category, budget, bid_amount, service_fee ) { 
    return { id, no_of_hours, category, budget, bid_amount, service_fee }; 
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
      <Helmet> <title>Earnings | SMFC</title> </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={false}>
          <TabToolbar module="question" tab={tab} length={length} handleChange={handleChange} statuses={statuses} />
          <Box sx={{ pt: 3 }}>

            { earnings && tab === "ALL" &&
              (<EnhancedTable selected={selected} setSelected={setSelected} rows={earnings} module="question" 
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

export default EarningList;
