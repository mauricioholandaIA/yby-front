import React from "react";
import { Route, Routes } from "react-router-dom";
import CollectionPoint from "../collection-point/collection-point";
import SignIn from "../login/SignIn";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/ponto-coleta" element={<CollectionPoint />} />
    </Routes>
  );
};

export default MainRoutes;
