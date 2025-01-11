'use client'

import React from 'react'
import { InputFieldProps } from './types/AllTypes';

export default function LoginPage() {
    const InputField: React.FC<InputFieldProps> = ({ label, type, id }) => {
        return (
            <>
                <label htmlFor={id} className="self-start mt-5 text-xl max-md:ml-2">
                    {label}:
                </label>
                <input
                    type={type}
                    id={id}
                    name={id}
                    className="flex shrink-0 mt-1.5 rounded-xl bg-teal-300 bg-opacity-10 h-[50px] w-full px-6 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                    aria-label={label}
                    required
                />
            </>
        );
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    }

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
                    />

                    <InputField
                        label="Password"
                        type="password"
                        id="password"
                    />

                    <button
                        type="submit"
                        className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 focus:ring-4 focus:ring-green-300 transition-colors duration-200 max-md:px-4 max-md:mt-8"
                    // style={{ backgroundColor: '#59C3C3' }}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className="self-center mt-5 text-md font-thin hover:text-teal-500 transition-colors duration-200"
                        onClick={() => { }}
                    >
                        Forget Password?
                    </button>
                </form>
            </div>
        </div>
    )
}
