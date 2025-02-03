"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const { year } = useParams();
  const [yearlyData, setyearlyData] = useState<any[]>([]);

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
        setyearlyData(data);
      } catch (error) {
        console.error("Error fetching Monthly information:", error);
      }
    }

    if (year && typeof year === "string") {
      getMonthyData(year);
    }

  }, [year]);

  const handleRowClick = (year: string) => {

  }

  const getMonthName = (monthNumber: number): string => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1]; // Since array index starts from 0
  };

  return (
    <div className="p-4">
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
            {yearlyData.map((year: any) => (
              <tr
                key={year.year}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => {
                  handleRowClick(year.year);
                }}
              >
                <td className="px-6 py-2">{getMonthName(year.month)}</td>
                <td className="px-6 py-2">{year.total_transaction}</td>
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
  );
}
