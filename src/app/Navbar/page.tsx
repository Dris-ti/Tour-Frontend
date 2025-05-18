'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function NavBar() {
    const [pname, setPname] = useState<string>('');

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('https://tour-backend-e75o.onrender.com/admin/showAdminProfile', {
                    withCredentials: true,
                });

                if (response.status === 201) {
                    setPname(JSON.stringify(response.data.name));
                } else {
                    alert("Error: Profile not found " + response.status);
                }
            } catch (error) {
                alert("An unexpected error occurred. Please try again. " + error);
            }
        };

        getProfile();
    }, []);

    return (
        <div>
            <nav className="bg-primarycolor border-gray-200 dark:bg-gray-900  w-full h-16 flex items-center justify-center fixed top-0 overflow-hidden z-10">
                {/* Page name */}
                <nav className="bg-transparent dark:bg-gray-700 w-[95vw]">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="flex items-center justify-center">
                            <ul className="flex flex-row font-medium justify-between gap-20 rtl:space-x-reverse text-lg">
                                <li><a href="#" className="text-white hover:text-secondarycolor">Home</a></li>
                                <li><a href="#" className="text-white hover:text-secondarycolor">Packages</a></li>
                                <li><a href="#" className="text-white hover:text-secondarycolor">About Us</a></li>
                                <li><a href="#" className="text-white hover:text-secondarycolor">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Profile */}
                <p>{pname}</p>
                <div className="avatar right-5 p-10">
                    <Link className="ring-primarycolor ring-offset-base-100 rounded-full ring ring-offset-2 w-10 h-10" href={'../Dashboard/Profile'}>
                        <img src="imgs/user.png" alt="Cannot show" />
                    </Link>
                </div>
            </nav>
        </div>
    )
}
