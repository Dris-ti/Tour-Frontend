'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { InputField } from '../Login/InputField'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [cnpassword, setCNPassword] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();


    const changePassword = async () =>{        
        if (password !== cnpassword) {
            alert("Passwords do not match.");
            return;
        }

        const token = searchParams.get('token');

        if (!token) {
            alert("Token is missing.");
            return;
        }

        try{
            console.log("TOkEN: " + token)
            console.log("PAss:"  + password);
            const response = await axios.post(`http://localhost:3000/authentication/forgetPassword`, {token, newPassword: password}, {withCredentials: true});

            if(response.status === 201)
            {
                alert("Password changed successfully.");
                router.push('../Login');
            }
        }
        catch(error)
        {
            alert(`Error occured: ${error}`)
        }
        
    }


    return (
        <div className="flex overflow-hidden flex-col font-bold text-black bg-white min-h-screen">
            <div className="flex flex-col justify-center items-center px-16 py-32 w-full bg-teal-300 bg-opacity-20 max-md:px-4 max-md:py-20">
                <form
                    onSubmit={(e) => { e.preventDefault(); changePassword(); }}
                    className="flex flex-col px-10 pt-8 pb-16 mb-0 bg-white rounded-[25px] shadow-[0px_0px_10px_rgba(89,195,195,1)] w-[500px] max-md:w-full max-md:px-4"
                >
                    <h1 className="self-center text-6xl text-center text-teal-300 tracking-[8px] max-md:text-4xl">
                        Reset Password
                    </h1>

                    <InputField
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />

                    <InputField
                        label="Confirm Password"
                        type="password"
                        id="cnpassword"
                        value={cnpassword}
                        onChange={(e: any) => setCNPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 focus:ring-4 focus:ring-green-300 transition-colors duration-200 max-md:px-4 max-md:mt-8"
                    >
                        Save
                    </button>

                </form>
            </div>
        </div>
    )
}
