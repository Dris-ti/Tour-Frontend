'use client'
import React from "react";
import DashboardLayout from "./Dashboard/layout";
import Link from "next/link";
import LoginPage from "./Login/page";

export default function Home() {
  return (
    <div>
      {/* <NavBar /> */}
      < LoginPage />
      {/* <DashboardLayout children={undefined} /> */}
      {/* <Link href={'/login'}>login</Link> */}
    </div>
  );
}
