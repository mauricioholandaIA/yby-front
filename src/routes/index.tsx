import { Navigate, Route, Routes } from "react-router-dom";
import CollectionPoint from "../collection-point/collection-point";
import SignIn from "../login/signIn-admin";
import ResponsiveDrawerLayout from "../template/drawer";

import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import SignInClient from "../login/singin-client";
import PlanningList from "../plannings";
import Register from "../register";
import Reports from "../reports";

const MainRoutes = () => {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <Routes>
      {!currentUser && (
        <>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signIn-client" element={<SignInClient />} />
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

                <Route path="/planejamento" element={<PlanningList />} />

                <Route path="/relatorios" element={<Reports />} />
              </>
            )}
            {!currentUser.isAdmin && (
              <Route path="/ponto-coleta" element={<CollectionPoint />} />
            )}
            <Route path="*" element={<Navigate to="/cadastro" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
