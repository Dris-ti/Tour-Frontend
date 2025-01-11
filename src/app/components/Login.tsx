'use client'

import React from 'react'
import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faKey, faUser } from '@fortawesome/free-solid-svg-icons'


export default function Login() {
    return (
        <div>
            <NavBar title="Tour Guide" logo="/imgs/logo.png" />

            <form action="#">

                <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundColor: '#59C3C3', opacity: 0.2 }}>
                    <div className="space-y-5">
                        <div className="relative">
                            {/* <!-- SVG Icon --> */}
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            {/* <!-- Input Field --> */}
                            <input
                                type="text"
                                id="floating_outlined_with_icon"
                                className="block pl-11 pr-2.5 pb-2.5 pt-4 w-96 text-sm text-gray-900 bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            {/* <!-- Floating Label --> */}
                            <label
                                htmlFor="floating_outlined_with_icon"
                                className="absolute ml-10 text-sm text-gray-500 text-background bg-transparent dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
                    peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:-translate-x-4 bg"
                            >
                                Email
                            </label>
                        </div>


                        <div className="relative">
                            {/* <!-- SVG Icon --> */}
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            {/* <!-- Input Field --> */}
                            <input
                                type="password"
                                id="floating_outlined_with_icon"
                                className="block pl-11 pr-2.5 pb-2.5 pt-4 w-96 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            {/* <!-- Floating Label --> */}
                            <label
                                htmlFor="floating_outlined_with_icon"
                                className="absolute ml-10 text-sm text-gray-500 text-background bg-transparent dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
                    peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:-translate-x-4 bg"
                            >
                                Password
                            </label>
                        </div>
                    </div>
                </div>


            </form>




        </div>
    )
}
