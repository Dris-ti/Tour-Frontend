'use client'

import React, { useState, Suspense } from 'react'
import { InputField } from '../Login/InputField'
import { useRouter } from 'next/navigation'
import SearchParamHandler from './SearchParamHandler'

export default function LoginPage() {
    const [cnpassword, setCNPassword] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    return (
        <div className="flex overflow-hidden flex-col font-bold text-black bg-white min-h-screen">
            <div className="flex flex-col justify-center items-center px-16 py-32 w-full bg-teal-300 bg-opacity-20 max-md:px-4 max-md:py-20">
                <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        // submission handled inside Suspense wrapper
                    }}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />

                    <InputField
                        label="Confirm Password"
                        type="password"
                        id="cnpassword"
                        value={cnpassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCNPassword(e.target.value)}
                    />

                    <Suspense fallback={<p>Loading token...</p>}>
                        <SearchParamHandler
                            password={password}
                            cnpassword={cnpassword}
                            router={router}
                        />
                    </Suspense>
                </form>
            </div>
        </div>
    )
}
