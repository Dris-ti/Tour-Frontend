'use client'
import React from 'react'
import NavBar from '../Navbar/page'
import SideBar from '../Sidebar/page'

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
    return (
        <div>
            <NavBar />
            <div className='flex'>
                <SideBar />
                {props.children}

            </div>


        </div>
    )
}

export default DashboardLayout;
