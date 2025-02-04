'use client';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AgencyInfoPage = () => {
    interface UserInfo {
        name: string;
        email: string;
        phone_no: string;
        address: string;
        company_size: number;
        description: string;
        status: string;
    }

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const { id } = useParams();

    useEffect(() => {
        async function getUserById(id: string) {
            try {
                const response = await axios.get(`http://localhost:3000/admin/showAgencyInfoById/${id}`, { withCredentials: true });

                if (response.status !== 201) {
                    throw new Error('Failed to fetch agency information');
                }

                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching agency information:', error);
            }
        }

        if (id && typeof id === 'string') {
            getUserById(id);
        }
    }, [id]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen w-[85vw] flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-primarycolor">Agency Information</h1>
                {userInfo ? (
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Name:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.name}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Email:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.email}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Phone No:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.phone_no}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Location:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.address}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Company Size:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.company_size}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Description:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.description}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Status:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.status}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AgencyInfoPage;
