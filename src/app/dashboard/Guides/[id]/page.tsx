'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const GuideInfoPage = () => {
    interface UserInfo {
        name: string;
        email: string;
        phone_no: string;
        address: string;
        description: string;
        status: string;
        dob: Date;
        gender: string;
        nid_pic_path: string;
        profile_pic_path: string;
        nid_no: string;
    }

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        async function getUserById(id: string) {
            try {
                const response = await fetch(`http://localhost:3000/admin/showGuideInfoById/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch guide information');
                }
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching guide information:', error);
            }
        }

        if (id && typeof id === 'string') {
            getUserById(id);
        }
    }, [id]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen w-[85vw] flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-primarycolor">Guide Information</h1>
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
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Description:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.description}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Status:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.status}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Date of Birth:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.dob.toString()}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Gender:</td>
                                <td className="border border-gray-300 px-4 py-2">{userInfo.gender}</td>
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

export default GuideInfoPage;
