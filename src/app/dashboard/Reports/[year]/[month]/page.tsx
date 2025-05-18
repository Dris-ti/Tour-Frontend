// WILL BE DONE LATER


"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


interface MonthlyDataItem {
    id: string | number;
    year: string;
    month: number;
    total_transaction: number;
}


export default function Page() {
    const { year } = useParams();
    const [monthlyData, setmonthlyData] = useState<MonthlyDataItem[]>([]);

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
                setmonthlyData(data);
            } catch (error) {
                console.error("Error fetching Monthly information:", error);
            }
        }

        if (year && typeof year === "string") {
            getMonthyData(year);
        }

    }, [year]);

    const getMonthName = (monthNumber: number): string => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1]; // Since array index starts from 0
    };

    return (
        <div>
            <div className="p-4 overflow-hidden z-0 absolute top-16">
                <div className="flex justify-between p-5 text-lg text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 rounded-lg mb-2">
                    <h1>Reports</h1>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-[82vw] text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-primarycolor dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Month
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"

                                >
                                    <td className="px-6 py-2">{getMonthName(item.month)}</td>
                                    <td className="px-6 py-2">{item.total_transaction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="fixed right-5 bottom-5">
                    <button
                        className="w-14 h-12 rounded-full bg-primarycolor text-white m-1"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </div>

    );
}
