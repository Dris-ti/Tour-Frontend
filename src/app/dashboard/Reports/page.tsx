'use client';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Reports = () => {
    const { data, error } = useSWR(`http://localhost:3000/admin-dashboard/allYearlyTransaction`, fetcher);
    const router = useRouter();

    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    if (!data) {
        return <h1>Loading...</h1>;
    }

    const yearlyAmount = Array.isArray(data) ? data : data.yearly || [];

    if (!Array.isArray(yearlyAmount)) {
        return <h1>No Data found</h1>;
    }

    const handleRowClick = (year: string) => {
        router.push(`/Dashboard/Reports/${year}`);
    }

    return (
        <div className="p-4">
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
                        {yearlyAmount.map((year: any) => (
                            <tr
                                key={year.year}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                onClick={() => { handleRowClick(year.year) }}
                            >
                                <td className="px-6 py-2">{year.year}</td>
                                <td className="px-6 py-2">{year.total_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="fixed right-5 bottom-5">
                <button
                    className="w-14 h-12 rounded-full bg-primarycolor text-white m-1"
                // onClick={() => setOpen(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>


        </div>
    )
}


export default Reports;