import React from "react";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import DashboardLayout from "./dashboard/layout";

export default function Home() {
  return (
    <div>
      {/* <NavBar /> */}
      < LoginPage />
      {/* <DashboardLayout children={undefined}/> */}
    </div>
  );
}
