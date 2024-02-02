import React from "react";
import { Route } from "react-router-dom";

const CreateRoutesFromList = (routes) => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component />} />
  ));
};

export default CreateRoutesFromList;
