"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Reports = () => {
    const router = useRouter();
    const [years, setYears] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const generateReports = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/admin-dashboard/allYearlyTransaction",
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    setYears(response.data);
                } else {
                    if (response.status === 401) {
                        alert(response.statusText);
                        router.replace("/Login");
                    }
                    alert("Failed to fetch yearly transaction");
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    router.replace("/Login");
                }
                alert("Network or server error. Please try again. " + error);
            } finally {
                setIsLoading(false);
            }
        };

        generateReports();
    }, []);

    const handleRowClick = (year: string) => {
        router.push(`/Dashboard/Reports/${year}`);
    };

    if (isLoading) return <div className="p-4">Loading reports...</div>;

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
                                <th scope="col" className="px-6 py-3">Year</th>
                                <th scope="col" className="px-6 py-3">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {years.map((year: any) => (
                                <tr
                                    key={year.year}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                    onClick={() => handleRowClick(year.year)}
                                >
                                    <td suppressHydrationWarning className="px-6 py-2">{year.year}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{year.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
