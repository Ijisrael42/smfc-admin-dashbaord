import { Link as RouterLink } from 'react-router-dom';
import { Box, Backdrop, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tutorService } from '../../services/tutorService'; 

const ApplicationListToolbar = (props) => {

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [state, setState] = React.useState();
  const handleCloseDialog = (event) => { setOpenDialog(false); };
  const handleOpenDialog = (state) => { setOpenDialog(true); setState(state); };
  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const navigate = useNavigate();
  const { id } = useParams();

  const confirm = () => {
    handleCloseDialog();
    handleToggle();

    tutorService.update(id, { application_status: `${state}d` })
    .then( response => { navigate(0); })
    .catch( error => console.log(error) );
  }

  return (
    <>
      <Box {...props}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
          <Button sx={{ mx: 1 }} onClick={() => handleOpenDialog("Approve")} color="primary" variant="contained" > Approve </Button>
          <Button onClick={() => handleOpenDialog("Decline")} color="primary" variant="contained" > Decline </Button>
        </Box>    
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title"> {state} Application </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to {state} this Application
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()}>No</Button>
          <Button onClick={() => confirm()} autoFocus> Yes </Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={() => handleClose()} >
        <CircularProgress color="inherit" />
      </Backdrop>    
    </>
    
  );
}

export default ApplicationListToolbar;
