import { useNavigate, Navigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import { accountService } from '../services/accountService'; 

const PrivateRoute = () => {
  
  const navigate = useNavigate();
  const [ user, setUser ] = useState();
  useEffect(() => {
    ( async () => {
      const user = await accountService.userValue;
      if(!user) navigate("/signin");
      else setUser(user);
    })();
  },[])

  return (<> { user && (<Navigate to="/app/dashboard" />) }</>);
};


export default PrivateRoute;
