import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
};

export default App;
