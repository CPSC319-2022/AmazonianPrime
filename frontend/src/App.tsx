import { Route, useParams, Routes } from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./ThemeOverrides";
import store from "./redux/store";
import NavBar from "./components/common/NavBar";
import { Provider } from "react-redux";

// TODO: move this
function ProductDetailsPage() {
  const { listingId } = useParams();
  console.log(listingId);

  return <div></div>;
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listing/:listingId" element={<ProductDetailsPage />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
};

export default AppWrapper;
