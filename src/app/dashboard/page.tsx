import React from 'react'
import ProfitEstimation from './ProfitEstimation'
import MonthlyChart from './MonthlyChart'

export default function DashboardPage() {
    return (
        <div>
            <ProfitEstimation />
            <MonthlyChart />
        </div>
    )
}
