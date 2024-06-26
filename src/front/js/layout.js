import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Menu } from "./pages/menu";
import { OrderSummary } from "./pages/OrderSummary";
import { OrderSuccess } from "./pages/OrderSuccess";
import { KitchenList } from "./pages/KitchenList";
import { GenerateQR } from "./pages/GenerateQR";
import { AboutUs } from "./pages/AboutUs";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import Login from "./pages/login";
import injectContext from "./store/appContext";

import Mesas from "./pages/mesas";

import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";
import { Footer } from "./component/footer";
import Signup from "./pages/signup";

import Dashboard from "./pages/dashboard";
import Caja from "./pages/caja";

import App from "./component/app";
import AdminMenuView from "./pages/adminMenuView";
import EditMenuModal from "./component/EditMenuModal";


import { Invoice } from "./pages/Invoice";

import Navbarglobal from "./component/navbarglobal";




import { RiSideBarFill } from "react-icons/ri";


const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/app/login" />;
  }
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken.roles);
  if (role && decodedToken.roles !== role) {
    return <Navigate to="/app/home" />;
  }
  return children;
};

const Layout = () => {
  const location = useLocation();
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;

  return (
    <div>
      <ScrollToTop>
        {/* Condicionalmente renderiza el Sidebar */}
        {location.pathname !== "/app/login" && location.pathname !== "/app/signup" && <Sidebar />}
        <Routes>
          <Route element={<Login />} path="/app/login" />
          <Route element={<Signup />} path="/app/signup" />
          <Route element={<Dashboard />} path="/app/dashboard" />
          <Route element={<Caja />} path="/app/caja" />
          <Route element={<Mesas />} path="/app/mesas" />
          <Route element={<ProtectedRoute role="user"> <Home /> </ProtectedRoute>} path="app/home" />
          <Route element={<Menu />} path="app/restaurants/:restaurantId/tables/:tableId/menu" />
          <Route element={<OrderSummary />} path="app/restaurants/:restaurantId/tables/:tableId/order-summary" />
          <Route element={<OrderSuccess />} path="app/restaurants/:restaurantId/tables/:tableId/order-success" />
          <Route element={<AboutUs />} path="/app/about-us" />
          <Route element={<AdminMenuView />} path="/app/adminmenu" />
          <Route element={<GenerateQR />} path="/app/generate-qr" />
          <Route element={<KitchenList />} path="app/restaurants/:restaurantId/orders" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
      </ScrollToTop>
    </div>
  );
};


    return (
        <>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <Navbar /> */}
                    <Navbarglobal />
                    <Routes>

                        <Route element ={<Login/>} path="/app/login"/>
                        <Route element={<Signup />} path="/app/signup" />
                        <Route element ={<Home />} path="/app/home"/>
                        <Route element={<ProtectedRoute role="admin"> <Caja />  </ProtectedRoute>} path="app/caja" />
                    <Route element={<ProtectedRoute role="admin"> <Dashboard />  </ProtectedRoute>} path="app/dashboard" />
                    <Route element={<ProtectedRoute role="admin"> <Mesas />  </ProtectedRoute>} path="app/mesas" />
                    <Route element={<ProtectedRoute role="admin"> <AdminMenuView />  </ProtectedRoute>} path="app/adminmenu" />
                    <Route element={<ProtectedRoute role="admin"> <Menu />  </ProtectedRoute>} path="/restaurants/:restaurantId/tables/:tableId/menu" />
                    <Route element={<ProtectedRoute role="admin"> <OrderSummary />  </ProtectedRoute>} path="/restaurants/:restaurantId/tables/:tableId/order-summary" />
                    <Route element={<ProtectedRoute role="admin"> <OrderSuccess />  </ProtectedRoute>} path="/restaurants/:restaurantId/tables/:tableId/order-success"/>
                        <Route element={<AboutUs />} path="/about-us" />



                        <Route element={<GenerateQR />} path="app/generate-qr" />
                        <Route element={<KitchenList />} path="app/restaurants/:restaurantId/orders"  />
                        <Route element={<Invoice />} path="app/restaurants/:restaurantId/tables/:tableId/invoices/:invoiceId"  />


                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
          </>
    );


const AppWrapper = () => {
  const basename = process.env.BASENAME || "";
  return (
    <BrowserRouter basename={basename}>
      <Layout />
    </BrowserRouter>
  );

};

export default injectContext(AppWrapper);

