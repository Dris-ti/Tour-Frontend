'use client';
import axios from 'axios';
import { InputField } from './InputField';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [nid, setNID] = useState("");
  const [name, setName] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Controls edit mode

  const route = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/showAdminProfile', { withCredentials: true });
        if (response.status === 200) {
          setNID(response.data.nid_no);
          setName(response.data.name);
          setPhone_no(response.data.phone_no);
          setDate(response.data.dob.split('T')[0]); // Extracts YYYY-MM-DD format
          setAddress(response.data.address);
          setGender(response.data.gender);
        }
      } catch (error) {
        alert("Failed to fetch profile data. Please try again.");
      }
    };

    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.patch('http://localhost:3000/admin/editAdminProfile', {
        name,
        phone_no,
        dob: date,
        address,
        gender,
      }, { withCredentials: true });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false); // Disable editing mode after saving
      }
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <div>
          <img className="w-40 h-40 p-1 m-5 left-20 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="/docs/images/people/profile-picture-5.jpg" alt="Profile" />
        </div>

        <div className='bg-primarycolor p-4 rounded-full w-full h-20 font-bold text-white text-end text-3xl'>
          <p>{name}</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center px-10 pt-8 pb-16 mb-0 bg-white rounded-[25px] shadow-[0px_0px_10px_rgba(89,195,195,1)] w-[70vw] max-md:w-full max-md:px-4 space-x-4">
            <div>
              <InputField label="Name" type="text" id="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
              <InputField label="Phone No" type="text" id="Phone_no" value={phone_no} onChange={(e) => setPhone_no(e.target.value)} disabled={!isEditing} />
              <InputField label="NID" type="text" id="nid_no" value={nid} onChange={(e) => setNID(e.target.value)} disabled={!isEditing} />
            </div>

            <div>
              <InputField label="Date of Birth" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={!isEditing} />
              <InputField label="Gender" type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isEditing} />
              <InputField label="Address" type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} disabled={!isEditing} />
            </div>
          </div>

          <div>
            <button type="button" className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 transition-colors duration-200">
              Change Password
            </button>

            <button
              type="button"
              className="px-14 py-1 mt-10 ml-4 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 transition-colors duration-200"
              onClick={(e) => isEditing ? handleSubmit(e as React.FormEvent) : setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                type="button"
                className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-red-600 rounded-3xl tracking-[2px] hover:bg-red-400 transition-colors duration-200"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
