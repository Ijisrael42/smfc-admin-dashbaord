import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import React from 'react';

const QuestionListToolbar = (props) => {
  
  const { tab, handleChange, statuses, length } = props;

  return (
    <Box {...props}>
      <Box >
        <Card>
          <CardContent>
            { tab && (<Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example" >
              { statuses && statuses.map( (status,key) => (
                <Tab key={key} label={`${status} (${length[status]})`} value={status} />
              ))}            
            </Tabs>) }      
          </CardContent>
        </Card>
      </Box>    
    </Box>
  );
}

export default QuestionListToolbar;
