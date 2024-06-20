import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Login from "./pages/login"

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Signup from "./pages/signup";
// import KitchenCard from "./component/kitchenCard";
import Kitchenview from "./pages/kitchenview";
import { KitchenAnhTu } from "./pages/kitchenviewAnhTu";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/app/login" />;
    }
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.roles)
    if (role && decodedToken.roles !== role) {
        return <Navigate to="/app/login" />;
    }
    return children;
};
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <Navbar /> */}
                    <Routes>
                        <Route element={<Login />} path="/app/login" />
                        <Route element={<Signup />} path="/app/signup" />
                        <Route element={<Kitchenview />} path="/app/kitchenview" />
                        <Route element={<KitchenAnhTu />} path="/app/kitchenAnhTu" />



                        <Route element={<ProtectedRoute role="user"> <Home /> </ProtectedRoute>} path="app/home" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
