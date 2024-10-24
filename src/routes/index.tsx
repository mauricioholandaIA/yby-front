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

  console.log("user", currentUser);

  return (
    <Routes>
      {/* Public Routes for non-logged-in users */}
      {!currentUser ? (
        <>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signIn-client" element={<SignInClient />} />
        </>
      ) : (
        <>
          {/* Redirect logged-in users if they try to access sign-in routes */}
          <Route path="/signIn" element={<Navigate to="/ponto-coleta" />} />
          <Route
            path="/signIn-client"
            element={<Navigate to="/ponto-coleta" />}
          />
        </>
      )}

      {/* Protected Routes */}
      <Route element={<ResponsiveDrawerLayout />}>
        {currentUser ? (
          <>
            {currentUser.tipo === "admin" && (
              <>
                <Route path="/cadastro" element={<Register />} />
                <Route path="/ponto-coleta" element={<CollectionPoint />} />
              </>
            )}
            {currentUser.tipo === "cliente" && (
              <Route path="/ponto-coleta" element={<CollectionPoint />} />
            )}
            <Route path="*" element={<Navigate to="/ponto-coleta" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signIn" />} />
        )}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
