'use client'

import React from 'react';
import PropTypes from 'prop-types';


export default function NavBar(props: any) {
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
                <div className="avatar right-5 p-10">
                    <div className="ring-primarycolor ring-offset-base-100  rounded-full ring ring-offset-2 w-10 h-10">
                        <p></p>
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
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

