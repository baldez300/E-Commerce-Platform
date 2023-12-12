import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { signal } from "@preact/signals-react";
import useAuthentication from "./hooks/useAuthentication";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import Sale from "./components/SalePage";
import EVcharges from "./components/EVcharges";
import SolarPanels from "./components/SolarPanels";
import EnergyStorage from "./components/EnergyStorageSolutions/EnergyStorage";
import SubcategoryPage from "./components/SubcategoryPage";
import SubPage from "./components/SubPage";
import EnergyEfficient from "./components/EnergyEfficientAppliances/EnergyEfficient";
import WindTurbines from "./components/WindTurbines/WindTurbines";
import Inverters from "./components/Inverters/Inverters";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import SearchPage from "./components/SearchPage";
import InputEmail from "./components/ForgotPassword/inputEmail";
import RecoverPassword from "./components/ForgotPassword/RecoverPassword";
import "./App.css";
import "./css/style.css";
import "./css/styleguide.css";


export const currentUser = signal(null);
export const isAuthenticated = signal(false);

function App() {
  const { authenticate } = useAuthentication();

  useEffect(() => {
    isAuthenticated.value = false;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      authenticate(accessToken);
    }
  }, [authenticate]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <NavBar />
          <Routes>
            <Route path="/sale" element={<Sale />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/ev-charges" element={<EVcharges />} />
            <Route path="/ev-charges/home-charging" element={<SubPage />} />
            <Route path="/ev-charges/public-charging" element={<SubPage />} />
            <Route path="/ev-charges/super-charging" element={<SubPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/solar-panels" element={<SolarPanels />} />
            <Route path="/solar-panels/mono-crystalline-panels" element={<SubPage />} />
            <Route path="/solar-panels/poly-crystalline-panels" element={<SubPage />} />
            <Route path="/solar-panels/thin-film-panels" element={<SubPage />} />
            <Route path="/most-popular/:subcategoryId" element={<SubcategoryPage />} />
            <Route path="/:productId" element={<ProductPage />} />
            <Route path="/products/search/:query" element={<SearchPage />} />
            <Route path="/energy-storage-solutions" element={<EnergyStorage />}/>
            <Route path="/energy-storage-solutions/storage-batteries" element={<SubPage />}/>
            <Route path="/energy-storage-solutions/flywheels" element={<SubPage />}/>
            <Route path="/energy-storage-solutions/thermal-energy-storage" element={<SubPage />}/>
            <Route path="/energy-efficient-appliances" element={<EnergyEfficient />}/>
            <Route path="/energy-efficient-appliances/energy-saving-light-bulbs" element={<SubPage />}/>
            <Route path="/energy-efficient-appliances/efficient-refrigerators" element={<SubPage />}/>
            <Route path="/energy-efficient-appliances/efficient-washing-machines" element={<SubPage />}/>
            <Route path="/wind-turbines" element={<WindTurbines />} />
            <Route path="/wind-turbines/horizontal-axis-turbines" element={<SubPage />} />
            <Route path="/wind-turbines/vertical-axis-turbines" element={<SubPage />} />
            <Route path="/inverters" element={<Inverters />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/recover-password" element={<InputEmail />} />
            <Route path="/recover-password/:url" element={<RecoverPassword />} />
          </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
