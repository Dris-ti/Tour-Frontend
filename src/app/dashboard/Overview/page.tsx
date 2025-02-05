'use client'
import axios from 'axios';
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
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Overview() {
    const [profit, setProfit] = useState(0);
    const [pPercentage, setpPercentage] = useState(0);
    const [estimation, setEstimation] = useState(0);
    const [monthlyData, setmonthlyData] = useState<any[]>([]);
    const [users, setUsers] = useState<any>(null); // Allow objects
    const year = new Date().getFullYear();
    const route = useRouter();
    const [isMountedMonthly, setIsMountedMonthly] = useState(false); // Prevent hydration issue
    useEffect(() => {
        setIsMountedMonthly(true); //  Ensures it only runs on the client
    }, []);


    useEffect(() => {
        async function getMonthyData(year: string) {
            try {
                const response = await axios.get(
                    `http://localhost:3000/admin-dashboard/allMonthlyTransactionByYear/${year}`,
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    setmonthlyData(response.data);
                }
                else {
                    if (response.status === 401) {
                        alert("From monthy Data: " + response.statusText);
                        route.replace('/Login');
                    }
                    alert('Failed to fetch monthly information');
                }

            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    route.replace('/Login');
                }
                console.error("Error fetching Monthly information:", error);
            }
        }

        getMonthyData(year.toString()); // Convert year to string
    }, [isMountedMonthly]);


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
                else {
                    if (response.status === 401) {
                        alert(response.statusText);
                        route.replace('/Login');
                    }
                    alert('Failed to fetch profit information');
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
                const response = await axios.get(
                    'http://localhost:3000/admin-dashboard/userCount',
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setUsers(response.data); // Convert to array if needed
                }
                else {
                    if (response.status === 401) {
                        alert(response.statusText);
                        route.replace('/Login');
                    }
                    alert('Failed to fetch user count information' + response.status);
                }


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
            <div className='w-[82vw] h-[85vh] overflow-hidden z-0 absolute top-16 ml-6'>

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
                                                data: [users.Users, users.Agencies, users.Guides], // Access properties from object
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
