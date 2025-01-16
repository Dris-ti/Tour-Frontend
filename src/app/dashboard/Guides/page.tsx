'use client';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GuidePage = () => {
    const [status, setStatus] = useState('Pending');
    const { data, error } = useSWR(`http://localhost:3000/admin/showTourGuides/${status}`, fetcher);
    const router = useRouter();

    console.log(data);

    if (error) {
        return <h1>Error Happened!</h1>;
    }

    if (!data) {
        return <h1>Loading...</h1>;
    }

    // Ensure `data` is an array
    const guides = Array.isArray(data) ? data : data.guides || [];

    if (!Array.isArray(guides)) {
        return <h1>No guides found</h1>;
    }

    const approve = async (id: string) => {
        try {
            const response = await axios.patch(`http://localhost:3000/admin/acceptTourGuide/${id}`);
            if (response.status === 201) {
                alert("Guide approved");
                mutate(`http://localhost:3000/admin/showTourGuides/${status}`); // Refresh data
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                alert(data?.error?.message || "Guide approval failed!");
            } else {
                console.error("Error:", error);
                alert("Network or server error. Please try again.");
            }
        }
    };

    const reject = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/admin/removeTourGuide/${id}`);
            if (response.status === 201) {
                alert("Guide rejected.");
                mutate('http://localhost:3000/admin/showTourGuides/' + status); // Refresh data
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                alert(data?.error?.message || "Guide rejection failed!");
            } else {
                console.error("Error:", error);
                alert("Network or server error. Please try again.");
            }
        }
    };

    const handleRowClick = (id: string) => {
        router.push(`/Dashboard/Guides/${id}`);
    };

    const handleStatus = (newStatus: string) => {
        setStatus(newStatus);
        mutate(`http://localhost:3000/admin/showTourGuides/${newStatus}`);
    };

    const handleError = (error: unknown, defaultMsg: string) => {
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            alert(data?.error?.message || defaultMsg);
        } else {
            console.error('Error:', error);
            alert('Network or server error. Please try again.');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between p-5 text-lg text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 rounded-lg mb-2">
                <h1>Tour Guides</h1>
                <div className="dropdown dropdown-hover dropdown-left dropdown-start">
                    <div tabIndex={0} role="button" className="btn bg-primarycolor border-none">
                        {status}
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                        <li onClick={() => handleStatus('Active')}>
                            <a>Active</a>
                        </li>
                        <li onClick={() => handleStatus('Pending')}>
                            <a>Pending</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-[82vw] text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-primarycolor dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Guide ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Guide Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {guides.map((user: any) => (
                            <tr
                                key={user.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleRowClick(user.id)}
                            >
                                <td className="px-6 py-2">{user.id}</td>
                                <td className="px-6 py-2">{user.name}</td>
                                <td className="px-6 py-2">{user.email}</td>
                                <td className="px-6 py-2">{user.status}</td>
                                <td className="px-6 py-2 text-center">
                                    {status !== 'Active' && (
                                        <button
                                            className="w-10 h-8 rounded-full bg-red-500 text-white m-1"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                                approve(user.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                    )}
                                    <button
                                        className="w-10 h-8 rounded-full bg-primarycolor text-white m-1"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click
                                            reject(user.id);
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
    );
};

export default GuidePage;
