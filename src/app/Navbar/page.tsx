'use client'

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function NavBar(props: any) {
    const route = useRouter();
    const [pname, setPname] = useState<string>('');

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/showAdminProfile', {
                    withCredentials: true, // Required to allow cookies
                });

                if (response.status === 200) {

                    setPname(JSON.stringify(response.data.name));

                }
                else {
                    alert("Error: Profile not found" + response.status);
                }
            } catch (error) {
                alert("An unexpected error occurred. Please try again." + error);
            }
        };

        getProfile();
    }, []);

    return (
        <div>
            <nav className="bg-primarycolor border-gray-200 dark:bg-gray-900  w-full h-16 flex items-center justify-center">
                {/* Page name */}
                <nav className="bg-transparent dark:bg-gray-700 w-[95vw]">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="flex items-center justify-center">
                            <ul className="flex flex-row font-medium justify-between gap-20 rtl:space-x-reverse text-lg">
                                <li>
                                    <a href="#" className="text-white dark:text-white hover:text-secondarycolor" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="text-white dark:text-white hover:text-secondarycolor">Packages</a>
                                </li>
                                <li>
                                    <a href="#" className="text-white dark:text-white hover:text-secondarycolor">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="text-white dark:text-white hover:text-secondarycolor">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Profile */}
                <p>{pname}</p>
                <div className="avatar right-5 p-10">
                    <Link className="ring-primarycolor ring-offset-base-100  rounded-full ring ring-offset-2 w-10 h-10" href={'../Dashboard/Profile'}>

                        <img src="imgs/user.png" alt="Cannot show" />
                    </Link>
                </div>

            </nav>
        </div>


    )
}

NavBar.proptypes = {
    title: PropTypes.string,
    logo: PropTypes.string
}

NavBar.defaultProps = {
    title: "Tour Guide"
}

