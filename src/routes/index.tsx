import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../login/SignIn";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
};

export default MainRoutes;
