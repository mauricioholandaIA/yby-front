import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { AuthProvider } from "./context/auth-context";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
