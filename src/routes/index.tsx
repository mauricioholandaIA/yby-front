import { Navigate, Route, Routes } from "react-router-dom";
import CollectionPoint from "../collection-point/collection-point";
import SignIn from "../login/signIn-admin";
import ResponsiveDrawerLayout from "../template/drawer";

import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import SignInClient from "../login/singin-client";
import Register from "../register";

const MainRoutes = () => {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes for non-logged-in users */}
      {!currentUser && (
        <>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signIn-client" element={<SignInClient />} />
          {/*<Route element={<ResponsiveDrawerLayout />}>
            <Route path="/ponto-coleta" element={<CollectionPoint />} />
          </Route>*/}
        </>
      )}

      {/* Protected Routes */}
      <Route element={<ResponsiveDrawerLayout />}>
        {currentUser && (
          <>
            {currentUser.isAdmin && (
              <>
                <Route
                  path="/cadastro"
                  element={<Navigate to="/cadastro/cliente" />}
                />
                <Route
                  path="/cadastro/cliente"
                  element={<Register type="cliente" />}
                />
                <Route
                  path="/cadastro/cooperativa"
                  element={<Register type="cooperativa" />}
                />
                <Route path="/ponto-coleta" element={<CollectionPoint />} />
              </>
            )}
            {!currentUser.isAdmin && (
              <Route path="/ponto-coleta" element={<CollectionPoint />} />
            )}
            <Route path="*" element={<Navigate to="/ponto-coleta" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
