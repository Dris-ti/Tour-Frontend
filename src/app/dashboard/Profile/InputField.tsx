'use client'

import { InputFieldProps } from '../../components/types/AllTypes';

export const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, onChange, disabled }) => {
    return (
        <>
            <label htmlFor={id} className="self-start mt-5 text-xl max-md:ml-2">
                {label}:
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="flex shrink-0 mt-1.5 rounded-xl bg-teal-300 bg-opacity-10 h-[50px] w-[30vw] px-6 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                aria-label={label}
                required
                disabled={disabled}
                
            />
        </>
    );
}