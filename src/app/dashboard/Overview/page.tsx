'use client'
import axios from 'axios';
import { get } from 'http';
import React, { use, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Overview() {
    const [profit, setProfit] = useState(0);
    const [pPercentage, setpPercentage] = useState(0);
    const [estimation, setEstimation] = useState(0);
    const [monthlyData, setmonthlyData] = useState<any[]>([]);
    const [users, setUsers] = useState<any>(null); // Allow objects
    const year = new Date().getFullYear();

    useEffect(() => {
        async function getMonthyData(year: string) {
            try {
                const response = await fetch(
                    `http://localhost:3000/admin-dashboard/allMonthlyTransactionByYear/${year}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch Monthy information");
                }
                const data = await response.json();
                console.log(year);
                setmonthlyData(data);
            } catch (error) {
                console.error("Error fetching Monthly information:", error);
            }
        }

        getMonthyData(year.toString()); // Convert year to string
    }, [year]);


    useEffect(() => {
        const getProfitInfo = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/admin-dashboard/profit',
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setProfit(response.data.Profit);
                    setpPercentage(response.data.ProfitPercentage);
                    setEstimation(response.data.Prediction);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        getProfitInfo();
    }, []);  // Only run once when component mounts

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(
                    `http://localhost:3000/admin-dashboard/userCount`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch User information");
                }
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : [data]); // Convert to array if needed
                console.log(data);
                console.log(users);
            } catch (error) {
                console.error("Error fetching User information:", error);
            }
        }

        getUsers();
    }, []);

    const getMonthName = (monthNumber: number): string => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1]; // Since array index starts from 0
    };


    return (
        <div>
            <div className='w-[82vw] h-[85vh]'>

                <div className='w-[82vw] h-[40%] flex justify-between items-center'>
                    {/* Profit */}
                    <div className='w-[33%] h-[100%] flex justify-center items-center'>
                        <div className="card bg-[#52489C] w-96 shadow-xl text-white">
                            <div className="card-body flex flex-col justify-center items-center">
                                <h2 className="card-title">Profit</h2>
                                <p>{profit}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profit Percentage */}
                    <div className='w-[33%] h-[100%] flex justify-center items-center'>
                        <div className="card bg-[#59C3C3] w-96 shadow-xl text-white">
                            <div className="card-body flex flex-col justify-center items-center">
                                <h2 className="card-title">Profit %</h2>
                                <p>{pPercentage}</p>
                            </div>
                        </div>
                    </div>

                    {/* Estimation */}
                    <div className='w-[33%] h-[100%] flex justify-center items-center'>
                        <div className="card bg-[#F45B69] w-96 shadow-xl text-white">
                            <div className="card-body flex flex-col justify-center items-center">
                                <h2 className="card-title">Next Month Estimation</h2>
                                <p>{estimation}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='w-[82vw] h-[60%] flex justify-between items-center'>
                    {/* Monthly chart */}
                    <div className='w-[60%] h-[100%] flex items-center justify-center card shadow-xl bg-[#EBEBEB]'>
                        <div className='w-[100%] h-[100%]'>
                            {monthlyData.length > 0 ? (
                                <Bar
                                    data={{
                                        labels: monthlyData.map((data) => getMonthName(data.month)),
                                        datasets: [
                                            {
                                                label: 'Monthly Transaction',
                                                data: monthlyData.map((data) => data.total_transaction),
                                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                                borderColor: 'rgba(75, 192, 192, 1)',
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            ) : (
                                <p className="text-center text-white">No Data to show...</p>
                            )}
                        </div>


                    </div>


                    {/* Total users */}
                    <div className='w-[39%] h-[100%] flex items-center justify-center card shadow-xl bg-[#EBEBEB]'>
                        <div>
                            {users ? (
                                <Doughnut
                                    data={{
                                        labels: ["Users", "Agencies", "Guides"],
                                        datasets: [
                                            {
                                                label: 'User Count',
                                                data: [users[0].Users, users[0].Agencies, users[0].Guides], // Access properties from object
                                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                                borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            ) : (
                                <p className="text-center text-white">No Data to show...</p>
                            )}
                        </div>



                    </div>

                </div>
            </div>

        </div>
    )
}
