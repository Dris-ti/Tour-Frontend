'use client';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { mutate } from 'swr';

interface Guide {
    id: string;
    name: string;
    email: string;
    status: string;
}


const GuidePage = () => {
    const [status, setStatus] = useState('Pending');
    const router = useRouter();
    const [guides, setGuides] = useState([]);
    const approve = async (id: string) => {
        try {
            const response = await axios.patch(`http://localhost:3000/admin/acceptTourGuide/${id}`, {}, { withCredentials: true });
            if (response.status === 201) {
                alert("Guide approved");
                setStatus(status); // Refresh data
            }
            else {
                if (response.status === 401) {
                    alert(response.statusText);
                    router.replace('/Login');
                }
                alert('Failed to approve Guide.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                router.replace('/Login');
            }
            alert(error)
        }
    };

    const reject = async (id: string) => {
        try {
            console.log("ID: " + id);
            const response = await axios.delete(`http://localhost:3000/admin/removeTourGuide/${id}`, { withCredentials: true });
            if (response.status === 201) {
                alert("Guide rejected.");
                setStatus(status); // Refresh data
            }
            else {
                if (response.status === 401) {
                    alert(response.statusText);
                    router.replace('/Login');
                }
                alert('Failed to reject Guide.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                router.replace('/Login');
            }
            alert(error)
        }
    };

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/showTourGuides/${status}`,
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    setGuides(response.data);
                    console.log(response.data)
                } else {
                    if (response.status === 401) {
                        alert(response.statusText);
                        router.replace('/Login');
                    }
                    alert('Failed to fetch Guide information');
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    router.replace('/Login');
                }
                alert('Network or server error. Please try again. ' + error);
            }
        };

        fetchGuides();
    }, [status, router]);



    const handleRowClick = (id: string) => {
        router.push(`/Dashboard/Guides/${id}`);
    };

    const handleStatus = (newStatus: string) => {
        setStatus(newStatus);
        mutate(`http://localhost:3000/admin/showTourGuides/${newStatus}`);
    };


    return (
        <div>
            <div className="p-4 overflow-hidden z-0 absolute top-16">
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
                            {guides.map((user: Guide) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                    onClick={() => handleRowClick(user.id)}
                                >
                                    <td suppressHydrationWarning className="px-6 py-2">{user.id}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.name}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.email}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.status}</td>
                                    <td suppressHydrationWarning className="px-6 py-2 text-center">
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
        </div>

    );
};

export default GuidePage;
