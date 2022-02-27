import React, { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar } from '@mui/material';

const Toast = ({ title , body, url }) => {
  
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar> <AccountCircle /> </Avatar>
      </ListItemAvatar>
      <ListItemButton component="a" href={url}>
        <ListItemText primary={title} secondary={body} />
      </ListItemButton>
    </ListItem>

  );
  
};

export default Toast; 