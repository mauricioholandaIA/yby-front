import { Route, Routes } from "react-router-dom";
import CollectionPoint from "../collection-point/collection-point";
import SignIn from "../login/SignIn";
import ResponsiveDrawerLayout from "../template/drawer";

import Register from "../register";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route element={<ResponsiveDrawerLayout />}>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/ponto-coleta" element={<CollectionPoint />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
