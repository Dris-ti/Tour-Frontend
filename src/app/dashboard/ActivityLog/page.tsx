'use client';

import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import '@fontsource/inter';
import { routeModule } from 'next/dist/build/templates/pages';
import { useRouter } from 'next/navigation';




export default function page() {
    const [logs, setLogs] = useState([]);
    const route = useRouter();
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/getProfileActivityLog',
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    setLogs(response.data);
                } else {
                    if (response.status === 401) {
                        alert(response.statusText);
                        route.replace('/Login');
                    }
                    alert('Network or server error. Please try again. ');
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    route.replace('/Login');
                }
                alert('Network or server error. Please try again. ' + error);
            }
        };

        fetchLogs();
    }, []);



    const deleteActivityLog = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/admin/deleteActivityLogByID/${id}`, { withCredentials: true });
            if (response.status === 201) {
                alert('Log deleted successfully!');
            }
            else {
                if (response.status === 401) {
                    alert(response.statusText);
                    route.replace('/Login');
                }
                alert('Network or server error. Please try again. ');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                route.replace('/Login');
            }
            alert('Network or server error. Please try again. ' + error);
        }

    }
    return (
        <div>
            <div className="p-4 overflow-hidden z-0 absolute top-16">
                <div className="flex justify-between p-5 text-lg text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 rounded-lg mb-2">
                    <h1>Activity Log</h1>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-[82vw] text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-primarycolor dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Method</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((user: any) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                >
                                    <td suppressHydrationWarning className="px-6 py-2">{user.url}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.createdAt}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">
                                        <button
                                            className="w-10 h-8 rounded-full bg-primarycolor text-white m-1"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                                deleteActivityLog(user.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
