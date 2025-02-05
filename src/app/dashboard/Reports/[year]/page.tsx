"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { year } = useParams();
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function getMonthlyData(year: string) {
      try {
        const response = await axios.get(`http://localhost:3000/admin-dashboard/allMonthlyTransactionByYear/${year}`, { withCredentials: true });

        if (response.status === 201) {
          setYearlyData(response.data);
        } else {
          if (response.status === 401) {
            alert(response.statusText);
            route.replace("/Login");
          }
          alert("Failed to fetch Monthly information");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          route.replace("/Login");
        }
        console.error("Error fetching Monthly information:", error);
      } finally {
        setIsLoading(false); // Set loading to false when request completes
      }
    }

    if (year && typeof year === "string") {
      getMonthlyData(year);
    }
  }, [year]);

  const handleRowClick = (selectedYear: string) => {
    console.log("Clicked Year:", selectedYear);
  };

  const getMonthName = (monthNumber: number): string => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1]; // Since array index starts from 0
  };

  if (!year) return <div>Loading...</div>; // Avoid SSR hydration issues
  if (isLoading) return <div>Loading reports...</div>;

  return (
    <div>
      <div className="p-4 overflow-hidden z-0 absolute top-16">
        <div className="flex justify-between p-5 text-lg text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 rounded-lg mb-2">
          <h1>Reports for {year}</h1>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-[82vw] text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-primarycolor dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Month</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((data: any) => (
                <tr
                  key={`${data.year}-${data.month}`}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleRowClick(data.year)}
                >
                  <td suppressHydrationWarning className="px-6 py-2">{getMonthName(data.month)}</td>
                  <td suppressHydrationWarning className="px-6 py-2">{data.total_transaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fixed right-5 bottom-5">
          <button className="w-14 h-12 rounded-full bg-primarycolor text-white m-1">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
