import React from "react";
import Login from "./components/Login";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import { Dashboard } from "./components/Dashboard Items/Dashboard";

export default function Home() {
  return (
    <div>
      {/* <NavBar /> */}
      {/* < LoginPage /> */}
      <Dashboard />
    </div>
  );
}
