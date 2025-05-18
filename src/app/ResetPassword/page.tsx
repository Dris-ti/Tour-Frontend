'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { InputField } from '../Login/InputField'

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const sendMail = async () => {
        try {
            const response = await axios.post(`https://tour-backend-e75o.onrender.com/authentication/requestChangePassword/${email}`, {},
                { withCredentials: true });

            if (response.status === 201) {
                alert("An email has been sent to your email address. Please check your email to reset your password.");
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            alert("An unexpected error occurred. Please try again." + error);
        }
    };

    const checkEmailValidity = async () => {
        try {
            const response = await axios.get("https://tour-backend-e75o.onrender.com/authentication/GetAccountInfo", { withCredentials: true });
            if (response.status === 201) {
                sendMail();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex overflow-hidden flex-col font-bold text-black bg-white min-h-screen">
            <div className="flex flex-col justify-center items-center px-16 py-32 w-full bg-teal-300 bg-opacity-20 max-md:px-4 max-md:py-20">
                <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); checkEmailValidity(); }}
                    className="flex flex-col px-10 pt-8 pb-16 mb-0 bg-white rounded-[25px] shadow-[0px_0px_10px_rgba(89,195,195,1)] w-[500px] max-md:w-full max-md:px-4"
                >
                    <h1 className="self-center text-6xl text-center text-teal-300 tracking-[8px] max-md:text-4xl">
                        Enter Email
                    </h1>

                    <InputField
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 focus:ring-4 focus:ring-green-300 transition-colors duration-200 max-md:px-4 max-md:mt-8"
                    >
                        Send Mail
                    </button>
                </form>
            </div>
        </div>
    );
}
