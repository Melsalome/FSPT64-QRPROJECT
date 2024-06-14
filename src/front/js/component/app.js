import React, { Component } from "react";
import { Link } from "react-router-dom";
const App = () => {


    return (
        <>
        <nav>
            <Link to ="/app/login"></Link>
            <Link to ="/app/signup"></Link>
            <Link to ="/app/home"></Link>
            <Link to ="/app/kitchenview"></Link>
        </nav>
        </>
    )
}

export default App