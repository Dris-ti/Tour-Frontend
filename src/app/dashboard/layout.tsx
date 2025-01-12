import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
    return (
        <div>
            <NavBar />
            <div className="flex">
                <SideBar />
                {props.children}
            </div>

        </div>
    )
}

export default DashboardLayout;
