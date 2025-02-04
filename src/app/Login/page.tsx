'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { InputField } from './InputField'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/authentication/login', {
                email,
                password,
            }, {
                withCredentials: true, // Required to allow cookies
            });

            if (response.status === 201) {
                route.replace('/Dashboard');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Handle server response errors
                const { status, data } = error.response;
                if (status === 401) {
                    alert(data?.error?.message || "Invalid email or password");
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            } else {
                // Handle unexpected errors
                console.error("Error:", error);
                alert("Network or server error. Please try again." + error);
            }
        }
    };

    return (
        <div className="flex overflow-hidden flex-col font-bold text-black bg-white min-h-screen">
            <div className="flex flex-col justify-center items-center px-16 py-32 w-full bg-teal-300 bg-opacity-20 max-md:px-4 max-md:py-20">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col px-10 pt-8 pb-16 mb-0 bg-white rounded-[25px] shadow-[0px_0px_10px_rgba(89,195,195,1)] w-[500px] max-md:w-full max-md:px-4"
                >
                    <h1 className="self-center text-6xl text-center text-teal-300 tracking-[8px] max-md:text-4xl">
                        LOGIN
                    </h1>

                    <InputField
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />

                    <InputField
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 focus:ring-4 focus:ring-green-300 transition-colors duration-200 max-md:px-4 max-md:mt-8"
                    // style={{ backgroundColor: '#59C3C3' }}
                    >
                        Login
                    </button>

                    <Link className="self-center mt-5 text-md font-thin hover:text-teal-500 transition-colors duration-200" href={'../ResetPassword'}>Forget Password</Link>

                </form>
            </div>
        </div>
    )
}
