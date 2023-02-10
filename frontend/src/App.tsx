import {
  Route,
  useParams,
  useRoutes,
  Routes
} from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import { ThemeProvider } from '@mui/material/styles';
import Theme from "./ThemeOverrides";
import Banner from "./components/common/Banner";
import ToolBar from "./components/common/ToolBar";
import NavBar from "./components/common/NavBar";

// TODO: move this
function ProductDetailsPage() {
  const { listingId } = useParams();
  console.log(listingId)
  return <div></div>
}

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <LandingPage/> },
    { path: "/listing/:listingId", element: <ProductDetailsPage/> }
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <ThemeProvider theme={Theme}>
      <NavBar/>
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/listing/:listingId" element={<ProductDetailsPage/>} />
      </Routes>
  </ThemeProvider>
  );
};

export default AppWrapper;
