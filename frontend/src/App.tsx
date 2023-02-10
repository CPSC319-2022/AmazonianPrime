import {
  useRoutes,
} from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import { ThemeProvider } from '@mui/material/styles';
import Theme from "./ThemeOverrides";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <LandingPage/> }
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <ThemeProvider theme={Theme}>
    <App />
  </ThemeProvider>
  );
};

export default AppWrapper;
