import React from "react";
import { useSelector } from 'react-redux';

const UserBasedRoute = ({ component: Component, allowedUser }) => {
  
  const { role } = useSelector((state) => state.users)
  // console.log("user based ->",role);
  const isAuthorized = allowedUser.includes(role);
  return isAuthorized && Component;
};

export default UserBasedRoute;