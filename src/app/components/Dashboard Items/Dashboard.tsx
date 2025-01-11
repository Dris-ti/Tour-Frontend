'use client'
import * as React from 'react';
import SideBar from './SideBar';
import ProfitEstimation from './ProfitEstimation';


export const Dashboard = () => {


    return (
        <main className='flex'>
            <SideBar />
            <ProfitEstimation />
        </main>
    );
};