'use client'
import React from 'react'

export default function ProfitEstimation() {
    return (
        <div className='flex h-44 mt-6 mb-6 ml-10'>
            <div className="profit card bg-neutral text-neutral-content w-96 m-4" >
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Profit</h2>
                    <p>Profit</p>
                </div>
            </div >


            <div className="profitPercentage card bg-neutral text-neutral-content w-96 m-4">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Profit Percentage</h2>
                    <p>Profit Percentage</p>
                </div>
            </div>

            <div className="estimation card bg-neutral text-neutral-content w-96 m-4">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Next month estimation</h2>
                    <p>Next month estimation</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </div >
    )
}
